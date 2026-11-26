// buffettkase-auto — 버핏카세 공개데이터 무료 자동 수집 Worker (Cron + KV, 고정비 0원)
// 배포: https://buffettkase-auto.ribelo1311.workers.dev
// 원천: 네이버 금융 모바일 공개 API (시가총액 순위·종목별 투자자 수급·리서치 목록/본문·실시간 시세)
//
// 담당 영역 (AI 추론·수동 검수가 필요 없는 공개 수치만)
//   /dual   외인·기관 쌍끌이 TOP10 — 시총 상위 400종목(코스피·코스닥 각 200) 유니버스,
//           종목별 최신 확정 수급(수량×종가, 억원)을 조각내어 모은 뒤 두 주체 동시 순매수 상위 10
//   /themes 테마별 시세·거래대금 — data.js의 69테마 구성 종목 시세를 모아 평균 등락·상승/하락 수·거래대금 재계산
//   /radar  증권사 목표가 레이더 — 당일 발간 리포트 목록 + 리포트 본문의 목표주가·투자의견 파싱
//
// AI 뉴스 감성 태깅 · 오늘의 급등 사유 검증 · 시장 요약 · /hotdeal 엄선은 이 Worker가 건드리지 않는다
// (기존 수동/크레딧 파이프라인 영역, data.js에 그대로 유지).
//
// 무료 한도 보호
//   - 한 번의 실행(요청)당 서브요청 예산 40개 이하 (무료 플랜 상한 50개)
//   - Cron 1개로 5분 간격 슬라이스 실행, 상태는 KV에 누적
//   - KV 읽기/쓰기 하루 1,000회 이내, 외부 API는 공개 엔드포인트만

const API = 'https://m.stock.naver.com/api';
const POLL = 'https://polling.finance.naver.com/api/realtime';
const UA = { 'user-agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)', accept: 'application/json,text/plain,*/*' };
const BUDGET = 40;          // 실행당 서브요청 예산
const SLICE_DUAL = 34;      // 한 번에 훑는 종목 수(수급)
const SLICE_THEME = 50;     // 한 번에 받는 시세 코드 수(폴링 API 1회 = 50개)
const RADAR_MAX_NEW = 14;   // 한 번에 본문까지 읽는 신규 리포트 수

const K = {
  themes: 'cfg:themes',
  universe: 'state:universe',
  dual: 'state:dual',
  themeState: 'state:themes',
  radar: 'state:radar',
  pubDual: 'pub:dual',
  pubThemes: 'pub:themes',
  pubRadar: 'pub:radar',
};

const num = (v) => {
  if (v === null || v === undefined) return null;
  const n = Number(String(v).replace(/[^0-9.\-]/g, ''));
  return Number.isFinite(n) ? n : null;
};
const round = (v, d) => {
  const p = Math.pow(10, d);
  return Math.round(v * p) / p;
};
const msg = (e) => String(e && e.message ? e.message : e);
const kstYmd = (d) => new Date((d ? d.getTime() : Date.now()) + 9 * 3600 * 1000).toISOString().slice(0, 10).replace(/-/g, '');
const kstStamp = () => {
  const s = new Date(Date.now() + 9 * 3600 * 1000).toISOString();
  return s.slice(0, 10) + ' ' + s.slice(11, 16) + ' KST';
};

async function jget(url, ms) {
  const r = await fetch(url, { headers: UA, signal: AbortSignal.timeout(ms || 6000) });
  if (!r.ok) throw new Error('HTTP ' + r.status);
  return r.json();
}

async function kvGet(env, key) {
  try {
    const v = await env.KV.get(key, 'json');
    return v || null;
  } catch (e) {
    return null;
  }
}
async function kvPut(env, key, val) {
  await env.KV.put(key, JSON.stringify(val));
  return val;
}

function jsonOut(o, cc) {
  return new Response(JSON.stringify(o), {
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'access-control-allow-origin': '*',
      'cache-control': cc || 'public, max-age=120',
    },
  });
}

/* ---------------- 공통 수집 ---------------- */

// 종목별 최신 투자자 수급 (경량 엔드포인트: /trend)
async function trendOne(code) {
  const arr = await jget(`${API}/stock/${code}/trend?pageSize=1`, 6000);
  const row = Array.isArray(arr) ? arr[0] : null;
  if (!row) return null;
  return {
    c: code,
    bizdate: String(row.bizdate || ''),
    fq: num(row.foreignerPureBuyQuant),
    oq: num(row.organPureBuyQuant),
    p: num(row.closePrice),
    diff: num(row.compareToPreviousClosePrice),
  };
}

// 시총 상위 유니버스 (코스피·코스닥 각 200종목 = 400종목)
// ETF·ETN·스팩을 걸러내므로 페이지를 넘겨가며 시장별 200종목을 채운다(최대 4페이지).
async function fetchUniverse() {
  const rows = [];
  for (const m of ['KOSPI', 'KOSDAQ']) {
    let got = 0;
    for (let page = 1; page <= 4 && got < 200; page++) {
      const j = await jget(`${API}/stocks/marketValue/${m}?page=${page}&pageSize=100`, 8000);
      const st = j.stocks || [];
      st.forEach((s) => {
        if (s.stockEndType !== 'stock' || got >= 200) return;
        rows.push({ c: s.itemCode, n: s.stockName, m });
        got += 1;
      });
      if (st.length < 100) break;
    }
  }
  const seen = new Set();
  return rows.filter((r) => r.c && !seen.has(r.c) && seen.add(r.c));
}

// 실시간 시세 묶음 (50개 단위)
async function quoteBatch(codes) {
  const out = {};
  for (let i = 0; i < codes.length; i += 50) {
    const g = codes.slice(i, i + 50);
    try {
      const j = await jget(`${POLL}/domestic/stock/${g.join(',')}`, 8000);
      (j.datas || []).forEach((d) => {
        if (!d || !d.itemCode) return;
        const raw = num(d.accumulatedTradingValueRaw);
        out[d.itemCode] = {
          p: num(d.closePrice),
          pct: num(d.fluctuationsRatio),
          v: raw === null ? null : round(raw / 1e8, 1),
          n: d.stockName || null,
        };
      });
    } catch (e) { /* 한 묶음 실패는 다음 실행에서 다시 채운다 */ }
  }
  return out;
}

/* ---------------- 쌍끌이 ---------------- */

async function ensureDual(env, log) {
  const today = kstYmd();
  let st = await kvGet(env, K.dual);
  if (!st || st.day !== today) {
    st = { day: today, phase: 'universe', idx: 0, acc: {}, done: false };
  }
  if (st.done) return true;

  if (st.phase === 'universe') {
    let uni = await kvGet(env, K.universe);
    if (!uni || uni.day !== today) {
      const codes = await fetchUniverse();
      if (codes.length < 100) throw new Error('universe too small: ' + codes.length);
      uni = { day: today, codes };
      await kvPut(env, K.universe, uni);
      log.push('universe:' + codes.length);
    }
    st.codes = uni.codes;
    st.phase = 'scan';
    await kvPut(env, K.dual, st);
  }

  const codes = st.codes || [];
  const from = st.idx || 0;
  const slice = codes.slice(from, from + SLICE_DUAL);
  const results = await Promise.all(slice.map((c) => trendOne(c.c).catch(() => null)));
  results.forEach((r, i) => {
    const code = slice[i].c;
    if (r && r.bizdate && r.p) st.acc[code] = r;
  });
  st.idx = from + slice.length;
  log.push(`dual-scan:${st.idx}/${codes.length}`);

  if (st.idx < codes.length) {
    await kvPut(env, K.dual, st);
    return false;
  }

  // 업데이트 완료 — 최빈 기준일(확정치)으로 계산
  const dates = {};
  Object.values(st.acc).forEach((r) => { dates[r.bizdate] = (dates[r.bizdate] || 0) + 1; });
  const bizdate = Object.keys(dates).sort((a, b) => dates[b] - dates[a])[0] || '';
  const rows = [];
  Object.values(st.acc).forEach((r) => {
    if (r.bizdate !== bizdate) return;
    const fv = round((r.fq || 0) * r.p / 1e8, 1);
    const ov = round((r.oq || 0) * r.p / 1e8, 1);
    if (fv <= 0 || ov <= 0) return;
    const prev = r.p - (r.diff || 0);
    rows.push({
      c: r.c, n: (st.codes.find((x) => x.c === r.c) || {}).n || r.c,
      p: r.p, pct: prev > 0 ? round((r.diff || 0) / prev * 100, 2) : 0,
      fv, ov, tot: round(fv + ov, 1),
    });
  });
  rows.sort((a, b) => b.tot - a.tot);
  const pub = {
    ok: true,
    bizdate,
    asOf: bizdate ? `${bizdate.slice(0, 4)}-${bizdate.slice(4, 6)}-${bizdate.slice(6, 8)} 확정 수급(순매수 수량×최신 종가 환산)` : '',
    basis: '시총 상위 400종목(코스피·코스닥 각 200) 전수에서 두 주체 동시 순매수 상위 10 · 네이버 금융 공개 수급',
    universe: codes.length,
    scanned: Object.keys(st.acc).length,
    both: rows.length,
    rows: rows.slice(0, 10),
    collectedAt: kstStamp(),
    auto: true,
  };
  await kvPut(env, K.pubDual, pub);
  st.done = true;
  st.result = { bizdate, both: rows.length };
  st.acc = {};
  st.codes = [];
  await kvPut(env, K.dual, st);
  log.push('dual-done:' + bizdate + ':' + rows.length);
  return true;
}

/* ---------------- 테마별 시세·거래대금 ---------------- */

async function ensureThemes(env, log, force) {
  const cfg = await kvGet(env, K.themes);
  if (!cfg || !Array.isArray(cfg.themes) || !cfg.themes.length) {
    log.push('themes:no-cfg');
    return true; // 설정이 없으면 건너뛴다(수동 시드 필요)
  }
  let st = await kvGet(env, K.themeState) || null;
  const fresh = st && st.done && st.at && Date.now() - st.at < 45 * 60 * 1000;
  if (fresh && !force) return true;
  if (!st || st.done) {
    // 새 수집 주기 시작
    const codes = [...new Set(cfg.themes.flatMap((t) => t.codes || []))];
    st = { idx: 0, codes, acc: {}, done: false, at: st && st.at };
  }
  const from = st.idx || 0;
  const slice = st.codes.slice(from, from + SLICE_THEME);
  const q = await quoteBatch(slice);
  Object.assign(st.acc, q);
  st.idx = from + slice.length;
  log.push(`themes:${st.idx}/${st.codes.length}`);

  if (st.idx < st.codes.length) {
    st.done = false;
    await kvPut(env, K.themeState, st);
    return false;
  }

  const themes = cfg.themes.map((t) => {
    const rows = (t.codes || []).map((c) => {
      const q = st.acc[c];
      if (!q || q.p == null) return null;
      return { c, n: q.n || c, p: q.p, pct: q.pct == null ? 0 : q.pct, v: q.v == null ? 0 : q.v };
    }).filter(Boolean);
    const up = rows.filter((r) => r.pct > 0).length;
    const down = rows.filter((r) => r.pct < 0).length;
    const avg = rows.length ? round(rows.reduce((a, r) => a + r.pct, 0) / rows.length, 2) : 0;
    const val = round(rows.reduce((a, r) => a + (r.v || 0), 0), 1);
    const lead = rows.slice().sort((a, b) => b.pct - a.pct)[0] || null;
    return {
      name: t.name, count: rows.length, avg, up, down, val,
      rows, lead: lead ? lead.n : null, leadPct: lead ? lead.pct : 0,
    };
  }).filter((t) => t.count);

  const pub = {
    ok: true,
    asOf: kstStamp() + ' 시세 기준',
    basis: '테마 구성 종목 현재가·등락률·거래대금 합산(네이버 금융 실시간, 지연 0~20분) · 45분 주기 자동 갱신',
    themes,
    collectedAt: kstStamp(),
    auto: true,
  };
  await kvPut(env, K.pubThemes, pub);
  st.done = true;
  st.at = Date.now();
  st.acc = {};
  keepIdxZeroAndCodes(st);
  await kvPut(env, K.themeState, st);
  log.push('themes-done:' + themes.length);
  return true;
}
// 완료 상태에서도 codes는 남겨 다음 주기에 그대로 쓴다.
function keepIdxZeroAndCodes(st) {
  st.idx = 0;
  st.acc = {};
  st.done = true;
}

/* ---------------- 증권사 목표가 레이더 ---------------- */

function stripTags(html) {
  return String(html || '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\s+/g, ' ')
    .trim();
}

function parseTarget(text) {
  const t = String(text || '');
  const m = t.match(/목표\s*주가[^0-9]{0,12}([0-9][0-9,]{2,})\s*원/) || t.match(/목표가[^0-9]{0,12}([0-9][0-9,]{2,})\s*원/);
  if (!m) return null;
  const n = num(m[1]);
  return n && n >= 100 ? n : null;
}
function parseRec(text) {
  const t = String(text || '');
  const m = t.match(/투자의견[^가-힣A-Za-z]{0,8}(매수|강력매수|중립|매도|시장수익률|비중확대|Buy|Hold|Sell)/i);
  if (!m) return null;
  const v = m[1];
  if (/매수|Buy|비중확대/i.test(v)) return '매수';
  if (/중립|Hold|시장수익률/i.test(v)) return '중립';
  return '매도';
}

// 컨센서스 목표주가·투자의견 평균 (종목 통합정보)
function recLabelOf(mean) {
  const n = mean == null ? null : Number(mean);
  if (n === null || !Number.isFinite(n)) return '매수';
  if (n >= 4.5) return '강력매수';
  if (n >= 3.5) return '매수';
  if (n >= 2.5) return '중립';
  return '매도';
}

async function radarOne(r) {
  const j = await jget(`${API}/stock/${r.itemCode}/integration`, 8000);
  const ci = j.consensusInfo || null;
  const tot = (j.totalInfos || []).find((x) => x.code === 'lastClosePrice') || null;
  const price = ci ? num((tot && tot.value) || '') : null;
  const target = ci ? num(ci.priceTargetMean) : null;
  if (!target) return null;
  const recMean = ci.recommMean == null ? null : Number(ci.recommMean);
  return {
    code: String(r.itemCode || ''),
    name: r.itemName || '',
    target,
    recMean,
    recLabel: recLabelOf(recMean),
    date: kstYmd(),
    broker: r.brokerName || '',
    title: r.title || '',
    url: r.endUrl || '',
    price,
    pct: null,
    gap: price ? round((target / price - 1) * 100, 1) : 0,
    sig: 'keep',
    n: 1,
  };
}

async function ensureRadar(env, log, force) {
  const today = kstYmd();
  let st = await kvGet(env, K.radar) || { items: [], seen: {}, day: null, scannedDay: null };
  st.items = st.items || [];
  st.seen = st.seen || {};
  if (st.day !== today) { st.day = today; st.scannedDay = null; }
  // 하루 1회로 끝내지 않고 55분마다 목록을 다시 훑어 장중에 나온 신규 리포트도 줍는다(seen으로 중복 방지).
  const scannedRecently = st.lastScan && Date.now() - st.lastScan < 55 * 60 * 1000;
  if (scannedRecently && !force) return true;

  const lists = [];
  for (const page of [1, 2, 3]) {
    try {
      const arr = await jget(`${API}/research/company?pageSize=20&page=${page}`, 8000);
      if (Array.isArray(arr)) lists.push(...arr);
    } catch (e) { /* 목록 일부 실패는 다음 실행에서 보완 */ }
  }
  const todayDash = today.slice(0, 4) + '-' + today.slice(4, 6) + '-' + today.slice(6, 8);
  const fresh = lists.filter((r) => r && r.writeDate === todayDash && r.itemCode && !st.seen[String(r.researchId)]);
  const pick = fresh.slice(0, RADAR_MAX_NEW);
  log.push(`radar:list=${lists.length},new=${fresh.length}`);

  const items = [];
  for (const r of pick) {
    try {
      const it = await radarOne(r);
      st.seen[String(r.researchId)] = 1;
      if (it) items.push(it);
    } catch (e) { /* 실패한 리포트는 다음 실행에서 다시 */ }
  }

  if (items.length) {
    // 시세 배치 1회로 등락률 보완(가격이 통합정보에 없을 때도 여기서 채운다)
    const codes = [...new Set(items.map((i) => i.code).filter(Boolean))].slice(0, 50);
    const q = codes.length ? await quoteBatch(codes) : {};
    items.forEach((it) => {
      const s = q[it.code] || {};
      if (s.p != null) it.price = s.p;   // 실시간(지연) 시세를 우선 사용
      it.pct = s.pct == null ? 0 : s.pct;
      if (it.price) it.gap = round((it.target / it.price - 1) * 100, 1);
    });
    const good = items.filter((i) => i.price);
    const key = (x) => x.code + '|' + String(x.date) + '|' + x.broker;
    const have = new Set(st.items.map(key));
    const merged = good.filter((x) => !have.has(key(x))).concat(st.items);
    merged.sort((a, b) => String(b.date).localeCompare(String(a.date)));
    st.items = merged.slice(0, 400);
    log.push('radar:added=' + good.length);
  }

  st.scannedDay = today;
  st.lastScan = Date.now();
  await kvPut(env, K.radar, st);
  const pub = {
    ok: true,
    asOf: kstStamp() + ' 수집',
    basis: '당일 발간 증권사 리포트 목록 + 종목 컨센서스 목표주가·투자의견 평균(네이버 금융). 무료 자동 갱신',
    items: st.items.slice(0, 60),
    collectedAt: kstStamp(),
    auto: true,
  };
  await kvPut(env, K.pubRadar, pub);
  return true;
}

/* ---------------- 실행 ---------------- */

async function runOnce(env, opts) {
  const log = [];
  const force = !!(opts && opts.force);
  try {
    const dualOk = await ensureDual(env, log);
    if (!dualOk) return { at: kstStamp(), log, next: 'dual' };
    const themesOk = await ensureThemes(env, log, force);
    if (!themesOk) return { at: kstStamp(), log, next: 'themes' };
    await ensureRadar(env, log, force);
    return { at: kstStamp(), log, next: 'idle' };
  } catch (e) {
    return { at: kstStamp(), log, error: msg(e) };
  }
}

export default {
  async scheduled(event, env, ctx) {
    ctx.waitUntil(runOnce(env, { force: false }));
  },
  async fetch(req, env) {
    const u = new URL(req.url);
    const p = u.pathname.replace(/\/+$/, '') || '/';
    if (req.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'access-control-allow-origin': '*',
          'access-control-allow-methods': 'GET,OPTIONS',
          'access-control-max-age': '86400',
        },
      });
    }
    if (p === '/dual') {
      const v = await kvGet(env, K.pubDual);
      return jsonOut(v || { ok: false, reason: '아직 수집 전입니다. 첫 수집 후 표시됩니다.' });
    }
    if (p === '/themes') {
      const v = await kvGet(env, K.pubThemes);
      return jsonOut(v || { ok: false, reason: '아직 수집 전입니다. 첫 수집 후 표시됩니다.' });
    }
    if (p === '/radar') {
      const v = await kvGet(env, K.pubRadar);
      return jsonOut(v || { ok: false, reason: '아직 수집 전입니다. 첫 수집 후 표시됩니다.' });
    }
    if (p === '/run') {
      const r = await runOnce(env, { force: u.searchParams.get('force') === '1' });
      return jsonOut(Object.assign({ ok: !r.error }, r), 'no-store');
    }
    const [d, th, ra, ds, ts] = await Promise.all([
      kvGet(env, K.pubDual), kvGet(env, K.pubThemes), kvGet(env, K.pubRadar),
      kvGet(env, K.dual), kvGet(env, K.themeState),
    ]);
    return jsonOut({
      ok: true,
      worker: 'buffettkase-auto',
      now: kstStamp(),
      dual: d ? { bizdate: d.bizdate, rows: (d.rows || []).length, collectedAt: d.collectedAt } : null,
      themes: th ? { themes: (th.themes || []).length, collectedAt: th.collectedAt } : null,
      radar: ra ? { items: (ra.items || []).length, collectedAt: ra.collectedAt } : null,
      progress: {
        dual: ds ? { day: ds.day, idx: ds.idx, total: (ds.codes || []).length, done: !!ds.done } : null,
        themes: ts ? { idx: ts.idx, total: (ts.codes || []).length, done: !!ts.done } : null,
      },
    }, 'no-store');
  },
};
