// buffettkase-quote — Cloudflare Worker (무료 플랜) 실시간 시세 중계
// 배포: https://buffettkase-quote.ribelo1311.workers.dev
// 소스: 네이버 금융 폴링 API(지수·국내종목·환율) + 야후 차트 API(미국 10년물·나스닥 야간선물)
//       + 네이버 금융 주요뉴스 API(/news) + 네이버 종목 자동완성 검색(/search)
// 모든 응답에 access-control-allow-origin: * — buffettkase.pages.dev 에서 직접 읽는다.
//
// GET /                -> 지수 6종(코스피·코스닥·코스피200·S&P500·나스닥·VIX) + 환율(원/달러)
//                         + 미국 10년물 + 나스닥 야간선물  => {at, idx, fx, bond, fut, err}
// GET /?s=005930,000660 -> 국내 종목 시세(콤마 목록, 최대 600개, 내부 50개씩 분할)
//                         => {at, stk:{"005930":{p,r,v,t,m,nxt,rp,rr}}, err}
// GET /news             -> 실시간 주요 증시 속보 12건 => {at, news:[{tit,sub,press,dt,iso,oid,aid,url,murl}], err}
//                          (60초 메모리 캐시, cache-control: public max-age=60)
// GET /search?q=삼성     -> 전체 종목(코스피·코스닥·ETF) 자동완성 + 실시간 시세
//                         => {at, q, items:[{c,n,mkt,cat,p,r,v,t,m,nxt,rp,rr,url}], err}
//                          (국내 6자리 코드 최대 15건, 15초 메모리 캐시)
// GET /flow            -> 시장 전체 투자자별 수급(코스피·코스닥, 억원) 장중 잠정치
//                         => {at, fetchedAt, bizdate, t, m, kospi:{bizdate,foreign,institution,personal,rise,fall,upper,lower,t,m}, kosdaq:{...}, err}
//                          m = OPEN(장중 잠정) / CLOSE(당일 마감 확정) / PREOPEN(개장 전 — 값 미집계)
//                          (메모리+Cache API 180초 캐시, cache-control: public max-age=180)
//
// 값 규격: p=현재가(숫자), r=등락률(%), v=거래대금(억원), t=기준 시각(원천 응답), m=장 상태(OPEN/NXT_OPEN/CLOSE)
//          nxt='PRE'|'AFTER'|null (넥스트레이드 프리·애프터마켓 체결가를 쓰고 있을 때)
//          rp·rr = NXT 사용 시 정규장 종가·등락률(참고값)
//
// NXT(넥스트레이드) 시간외: 프리마켓 08:00~08:50, 애프터마켓 15:40~20:00.
// 정규장이 OPEN이 아니고 네이버 응답의 overMarketPriceInfo.overMarketStatus가 OPEN이면 그 체결가를 내려준다.

const NV = 'https://polling.finance.naver.com/api/realtime';
const NEWS_URL = 'https://m.stock.naver.com/api/news/list?category=mainnews&pageSize=12';
// 위 경로가 막힐 때를 위한 같은 원천의 예비 경로(응답 구조 동일)
const NEWS_URL2 = 'https://api.stock.naver.com/news/mainnews?pageSize=12';
const AC_URL = 'https://ac.stock.naver.com/ac';
const FLOW_BASE = 'https://m.stock.naver.com/api/index/';
const FLOW_TTL = 180000; // 시장 수급 캐시 3분(초 단위 180초) — 네이버 부하·무료 플랜 보호
const UA = { 'user-agent': 'Mozilla/5.0', accept: 'application/json,text/plain,*/*' };

const IDX = {
  kospi: '/domestic/index/KOSPI',
  kosdaq: '/domestic/index/KOSDAQ',
  kospi200: '/domestic/index/KPI200',
  sp500: '/worldstock/index/.INX',
  nasdaq: '/worldstock/index/.IXIC',
  vix: '/worldstock/index/.VIX',
};

const num = (v) => {
  if (v === null || v === undefined) return null;
  const n = Number(String(v).replace(/[^0-9.\-]/g, ''));
  return Number.isFinite(n) ? n : null;
};

const msg = (e) => String(e && e.message ? e.message : e);

async function getJSON(url, ms) {
  const r = await fetch(url, { headers: UA, signal: AbortSignal.timeout(ms || 4500) });
  if (!r.ok) throw new Error('HTTP ' + r.status);
  return r.json();
}

function R(o, cc) {
  return new Response(JSON.stringify(o), {
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'access-control-allow-origin': '*',
      'cache-control': cc || 'no-store',
    },
  });
}

// ---- 짧은 메모리 캐시 (isolate 안에서만. 원천 API 부하를 줄이는 용도) ----
const MEM = new Map();
function memGet(key) {
  const c = MEM.get(key);
  if (c && c.exp > Date.now()) return c.val;
  if (c) MEM.delete(key);
  return null;
}
function memPut(key, val, ttlMs) {
  if (MEM.size > 60) MEM.clear();
  MEM.set(key, { val: val, exp: Date.now() + ttlMs });
  return val;
}

// 네이버 폴링 API 한 건
async function naverOne(path) {
  const j = await getJSON(NV + path);
  const d = (j.datas || [])[0];
  if (!d) throw new Error('empty');
  return {
    n: d.stockName || d.indexName || null,
    p: num(d.closePrice),
    r: num(d.fluctuationsRatio),
    t: d.localTradedAt || null,
    m: d.marketStatus || null,
  };
}

// 야후 차트 API 한 건 (지수/선물)
async function yahooOne(sym) {
  const j = await getJSON('https://query1.finance.yahoo.com/v8/finance/chart/' + encodeURIComponent(sym) + '?range=1d&interval=1m');
  const m = (j.chart && j.chart.result && j.chart.result[0] && j.chart.result[0].meta) || {};
  if (m.regularMarketPrice === undefined) throw new Error('no meta');
  return {
    p: num(m.regularMarketPrice),
    r: num(m.regularMarketChangePercent),
    t: m.regularMarketTime ? new Date(m.regularMarketTime * 1000).toISOString() : null,
    sym: m.symbol || sym,
  };
}

// 원/달러 (네이버 marketindex, 하나은행 고시)
async function naverFx() {
  const j = await getJSON('https://api.stock.naver.com/marketindex/exchange/FX_USDKRW');
  const e = j.exchangeInfo || {};
  return {
    n: e.name || '미국 USD',
    p: num(e.closePrice),
    r: num(e.fluctuationsRatio),
    t: e.localTradedAt || null,
    m: e.marketStatus || null,
  };
}

// 국내 종목 시세 묶음 — ?s= 와 /search 가 같이 쓴다. (50개씩 분할, NXT 포함)
async function quoteMap(codes) {
  const stk = {};
  const errs = [];
  const groups = [];
  for (let i = 0; i < codes.length; i += 50) groups.push(codes.slice(i, i + 50));
  await Promise.all(groups.map(async (g) => {
    try {
      const j = await getJSON(NV + '/domestic/stock/' + g.join(','));
      (j.datas || []).forEach((d) => {
        if (!d || !d.itemCode) return;
        const ov = d.overMarketPriceInfo;
        const ovOpen = !!ov && ov.overMarketStatus === 'OPEN' && num(ov.overPrice) != null;
        // 정규장이 열려 있지 않고 NXT 시간외가 열려 있으면 NXT 체결가를 쓴다.
        if (d.marketStatus !== 'OPEN' && ovOpen) {
          const tst = String(ov.tradingSessionType || '');
          let nxt = tst.indexOf('PRE') >= 0 ? 'PRE' : (tst.indexOf('AFTER') >= 0 ? 'AFTER' : null);
          if (!nxt) {
            // 세션 구분이 비어 있으면 체결 시각(09시 전=프리)으로 판별
            const h = Number(String(ov.localTradedAt || d.localTradedAt || '').slice(11, 13));
            nxt = Number.isFinite(h) && h < 9 ? 'PRE' : 'AFTER';
          }
          const ovRaw = num(ov.accumulatedTradingValueRaw);
          stk[d.itemCode] = {
            p: num(ov.overPrice),
            r: num(ov.fluctuationsRatio),
            v: ovRaw === null ? null : Math.round(ovRaw / 1e8 * 10) / 10,
            t: ov.localTradedAt || d.localTradedAt || null,
            m: 'NXT_OPEN',
            nxt: nxt,
            rp: num(d.closePrice),
            rr: num(d.fluctuationsRatio),
            n: d.stockName || null,
          };
          return;
        }
        const raw = num(d.accumulatedTradingValueRaw);
        stk[d.itemCode] = {
          p: num(d.closePrice),
          r: num(d.fluctuationsRatio),
          v: raw === null ? null : Math.round(raw / 1e8 * 10) / 10,
          t: d.localTradedAt || null,
          m: d.marketStatus || null,
          nxt: null,
          n: d.stockName || null,
        };
      });
    } catch (e) {
      errs.push('stock:' + g[0] + ':' + msg(e));
    }
  }));
  return { stk: stk, errs: errs };
}

// ---- 시장 전체 투자자별 수급 (네이버 종목통합 API dealTrendInfo) ----
// 값은 "+1,813" / "-954" 같은 문자열(억원)이다. 숫자가 아니면 null.
const eokNum = (v) => {
  const s = String(v === null || v === undefined ? '' : v).replace(/[,\s]/g, '').trim();
  if (!/^[+-]?\d+(?:\.\d+)?$/.test(s)) return null;
  const n = Number(s);
  return Number.isFinite(n) ? Math.round(n * 10) / 10 : null;
};

async function flowOne(name) {
  const j = await getJSON(FLOW_BASE + name + '/integration', 5000);
  const d = j.dealTrendInfo || (Array.isArray(j.dealTrendInfos) ? j.dealTrendInfos[0] : null);
  if (!d) throw new Error('no dealTrend');
  const ud = j.upDownStockInfo || {};
  return {
    bizdate: String(d.bizdate || ''),
    foreign: eokNum(d.foreignValue),
    institution: eokNum(d.institutionalValue != null ? d.institutionalValue : d.institutionValue),
    personal: eokNum(d.personalValue),
    rise: eokNum(ud.riseCount),
    fall: eokNum(ud.fallCount),
    upper: eokNum(ud.upperCount),
    lower: eokNum(ud.lowerCount),
  };
}

// 장 상태·기준 시각은 폴링 API(지수)에서 가져온다. integration 응답에는 시각이 없다.
async function flowClock(name) {
  const o = await naverOne('/domestic/index/' + name);
  return { t: o.t || null, m: o.m || null };
}

async function flowBuild() {
  const out = { at: new Date().toISOString(), err: [] };
  const [k, d, kc, dc] = await Promise.all([
    flowOne('KOSPI').catch((e) => { out.err.push('kospi:' + msg(e)); return null; }),
    flowOne('KOSDAQ').catch((e) => { out.err.push('kosdaq:' + msg(e)); return null; }),
    flowClock('KOSPI').catch((e) => { out.err.push('kospi-clock:' + msg(e)); return null; }),
    flowClock('KOSDAQ').catch((e) => { out.err.push('kosdaq-clock:' + msg(e)); return null; }),
  ]);
  out.kospi = k ? Object.assign({}, k, { t: (kc && kc.t) || null, m: (kc && kc.m) || null }) : null;
  out.kosdaq = d ? Object.assign({}, d, { t: (dc && dc.t) || null, m: (dc && dc.m) || null }) : null;
  out.bizdate = (k && k.bizdate) || (d && d.bizdate) || null;
  out.m = (kc && kc.m) || (dc && dc.m) || null;
  out.t = (kc && kc.t) || (dc && dc.t) || null;
  return out;
}

// 메모리(격리 인스턴스) + Cache API(콜로 전역) 이중 캐시 — 원천 요청을 3분에 1번으로 줄인다.
async function flowCached() {
  const hit = memGet('flow:v1');
  if (hit) return hit;
  const key = new Request('https://buffettkase-quote.ribelo1311.workers.dev/__flow_cache_v1');
  try {
    const cr = await caches.default.match(key);
    if (cr) {
      const j = await cr.json();
      if (j && j.kospi && j.kosdaq) return memPut('flow:v1', j, 30000);
    }
  } catch (e) { /* Cache API 미지원/장애 시 메모리만 쓴다 */ }
  const j = await flowBuild();
  if (j.kospi && j.kosdaq && !j.err.length) {
    memPut('flow:v1', j, FLOW_TTL);
    try {
      await caches.default.put(key, new Response(JSON.stringify(j), {
        headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'public, max-age=180' },
      }));
    } catch (e) { /* 캐시 저장 실패는 응답에 영향 없음 */ }
  }
  return j;
}

// 네이버 뉴스 dt("20261116082612") -> KST ISO
function isoKst(dt) {
  const s = String(dt || '');
  if (!/^\d{12,14}$/.test(s)) return null;
  const y = s.slice(0, 4), mo = s.slice(4, 6), d = s.slice(6, 8);
  const h = s.slice(8, 10), mi = s.slice(10, 12), se = s.length >= 14 ? s.slice(12, 14) : '00';
  return y + '-' + mo + '-' + d + 'T' + h + ':' + mi + ':' + se + '+09:00';
}

// 주요 증시 속보 목록
async function newsList() {
  let j;
  try {
    j = await getJSON(NEWS_URL, 5000);
  } catch (e1) {
    try {
      j = await getJSON(NEWS_URL2, 5000);
    } catch (e2) {
      throw new Error(msg(e1) + ' / ' + msg(e2));
    }
  }
  const arr = Array.isArray(j) ? j : ((j && (j.list || j.items)) || []);
  return arr.map((n) => {
    const oid = String(n.oid || '').trim();
    const aid = String(n.aid || '').trim();
    const ok = /^\d{3}$/.test(oid) && /^\d{6,}$/.test(aid);
    return {
      tit: String(n.tit || '').replace(/\s+/g, ' ').trim(),
      sub: String(n.subcontent || '').replace(/\s+/g, ' ').trim(),
      press: String(n.ohnm || '').trim(),
      dt: String(n.dt || ''),
      iso: isoKst(n.dt),
      oid: oid,
      aid: aid,
      url: ok ? 'https://n.news.naver.com/mnews/article/' + oid + '/' + aid : '',
      murl: ok ? 'https://m.stock.naver.com/domestic/news/view/' + oid + '/' + aid : '',
    };
  }).filter((n) => n.tit).slice(0, 20);
}

// 종목 자동완성 -> 국내 코드 목록 (코스피·코스닥·ETF)
async function acSearch(q) {
  const j = await getJSON(AC_URL + '?q=' + encodeURIComponent(q) + '&target=stock,etf', 4000);
  const items = (j && Array.isArray(j.items)) ? j.items : [];
  const seen = new Set();
  const out = [];
  for (const it of items) {
    if (!it || it.nationCode !== 'KOR') continue;
    const code = String(it.code || '').trim().toUpperCase();
    if (!/^[0-9A-Z]{6}$/.test(code) || seen.has(code)) continue;
    seen.add(code);
    out.push({
      c: code,
      n: String(it.name || '').replace(/\s+/g, ' ').trim(),
      mkt: String(it.typeName || it.typeCode || '').trim(),
      cat: String(it.category || '').trim(),
    });
    if (out.length >= 15) break;
  }
  return out;
}

export default {
  async fetch(r) {
    const u = new URL(r.url);
    const t0 = Date.now();
    const out = { at: new Date().toISOString(), edge: (r.cf && r.cf.colo) || null, err: [] };

    if (r.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'access-control-allow-origin': '*',
          'access-control-allow-methods': 'GET,OPTIONS',
          'access-control-max-age': '86400',
        },
      });
    }

    const path = u.pathname.replace(/\/+$/, '') || '/';

    // ---- 실시간 속보: /news (또는 /?news=1) ----
    if (path === '/news' || u.searchParams.get('news') === '1') {
      const ck = 'news:v1';
      const hit = memGet(ck);
      if (hit) {
        out.news = hit;
      } else {
        try {
          out.news = memPut(ck, await newsList(), 60000);
        } catch (e) {
          out.news = [];
          out.err.push('news:' + msg(e));
        }
      }
      out.ms = Date.now() - t0;
      return R(out, 'public, max-age=60');
    }

    // ---- 전체 종목 검색: /search?q=... ----
    if (path === '/search') {
      const qq = String(u.searchParams.get('q') || '').replace(/[\u0000-\u001f]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 40);
      out.q = qq;
      out.items = [];
      if (!qq) {
        out.err.push('q:empty');
        out.ms = Date.now() - t0;
        return R(out, 'public, max-age=5');
      }
      const ck = 'search:' + qq.toLowerCase();
      const hit = memGet(ck);
      if (hit) {
        out.items = hit;
      } else {
        try {
          const hits = await acSearch(qq);
          if (hits.length) {
            const qm = await quoteMap(hits.map((h) => h.c));
            qm.errs.forEach((e) => out.err.push(e));
            out.items = memPut(ck, hits.map((h) => {
              const s = qm.stk[h.c] || {};
              return {
                c: h.c,
                n: h.n || s.n || '',
                mkt: h.mkt,
                cat: h.cat,
                p: s.p != null ? s.p : null,
                r: s.r != null ? s.r : null,
                v: s.v != null ? s.v : null,
                t: s.t || null,
                m: s.m || null,
                nxt: s.nxt || null,
                rp: s.rp != null ? s.rp : null,
                rr: s.rr != null ? s.rr : null,
                url: 'https://m.stock.naver.com/domestic/stock/' + h.c + '/total',
              };
            }), 15000);
          }
        } catch (e) {
          out.err.push('search:' + msg(e));
        }
      }
      out.ms = Date.now() - t0;
      return R(out, 'public, max-age=10');
    }

    // ---- 시장 전체 수급: /flow (또는 /?flow=1) ----
    if (path === '/flow' || u.searchParams.get('flow') === '1') {
      try {
        const f = await flowCached();
        (f.err || []).forEach((e) => out.err.push(e));
        out.fetchedAt = f.at || null;
        out.bizdate = f.bizdate || null;
        out.t = f.t || null;
        out.m = f.m || null;
        out.kospi = f.kospi || null;
        out.kosdaq = f.kosdaq || null;
      } catch (e) {
        out.err.push('flow:' + msg(e));
      }
      out.ms = Date.now() - t0;
      return R(out, 'public, max-age=180');
    }

    const q = (u.searchParams.get('s') || u.searchParams.get('codes') || '').trim();

    // ---- 종목 모드: /?s=005930,000660,... ----
    if (q) {
      const codes = [...new Set(q.split(',').map((c) => c.trim()).filter((c) => /^[0-9A-Za-z]{6}$/.test(c)))].slice(0, 600);
      const qm = await quoteMap(codes);
      qm.errs.forEach((e) => out.err.push(e));
      out.stk = qm.stk;
      out.ms = Date.now() - t0;
      return R(out);
    }

    // ---- 지수·환율·금리·선물 모드: / ----
    const idx = {};
    await Promise.all(Object.keys(IDX).map(async (k) => {
      try {
        idx[k] = await naverOne(IDX[k]);
      } catch (e) {
        out.err.push(k + ':' + msg(e));
      }
    }));
    out.idx = idx;

    const [fx, bond, fut] = await Promise.all([
      naverFx().catch((e) => { out.err.push('fx:' + msg(e)); return null; }),
      yahooOne('^TNX').catch((e) => { out.err.push('us10y:' + msg(e)); return null; }),
      yahooOne('NQ=F').catch((e) => { out.err.push('nq:' + msg(e)); return null; }),
    ]);
    out.fx = fx;
    out.bond = bond;
    out.fut = fut;
    out.ms = Date.now() - t0;
    return R(out);
  },
};
