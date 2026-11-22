/**
 * buffettkase-food — 겨울 붕세권 제보 API (Cloudflare Worker + D1)
 *
 * GET  /api/food/health                 상태 확인
 * GET  /api/food/reports?cat=           살아있는 제보 목록 (최대 60건, 사진은 URL)
 * POST /api/food/reports                제보 등록 (사진은 클라이언트에서 480px JPEG로 축소)
 * POST /api/food/reports/:id/confirm    +1 확인 (기기당 1회)
 * POST /api/food/reports/:id/flag       신고 (서로 다른 기기 3회 누적 시 숨김)
 * GET  /api/food/photo/:id              제보 사진 (JPEG)
 *
 * 0원 원칙: D1 무료 한도(5GB·500만 읽기/일·10만 쓰기/일) 안에서만 동작한다.
 * 개인정보: 제보자 위치·전화번호·기기 ID는 저장하지 않는다. 중복 확인 판별은
 *           (IP+UA+일자+솔트) 해시로만 하며 원문은 어디에도 남기지 않는다.
 */
const CORS = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET,POST,OPTIONS",
  "access-control-allow-headers": "content-type",
  "access-control-max-age": "86400",
};
const TEMP_MIN = 60;
const PROMOTE_AT = 10;
const KEEP_MS = 7 * 24 * 3600 * 1000;
const LIVE_EXPIRED_MS = 3 * 3600 * 1000;
const MAX_PHOTO_BYTES = 120 * 1024;
const CATS = ["bungeoppang", "hotteok", "sundae", "truck"];

function json(obj, status = 200, extra = {}) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
      ...CORS,
      ...extra,
    },
  });
}
function txt(msg, status = 400) {
  return json({ ok: false, error: msg }, status);
}
function clean(v, max) {
  return String(v == null ? "" : v)
    .replace(/[\u0000-\u001f\u007f]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);
}
function numOrNull(v) {
  if (v === null || v === undefined || v === "") return null;
  const n = typeof v === "number" ? v : parseFloat(v);
  return Number.isFinite(n) ? n : null;
}
function maskPII(s) {
  return s
    .replace(/\b01[016789][-.\s]?\d{3,4}[-.\s]?\d{4}\b/g, "[전화번호]")
    .replace(/\b\d{6}\s?[-]\s?\d{7}\b/g, "[주민번호]");
}
async function sha256hex(str) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(str));
  return [...new Uint8Array(buf)].map((x) => x.toString(16).padStart(2, "0")).join("");
}
async function deviceHash(req, env) {
  const ip = req.headers.get("cf-connecting-ip") || "";
  const ua = req.headers.get("user-agent") || "";
  const day = new Date().toISOString().slice(0, 10);
  return sha256hex(`${ip}|${ua}|${day}|${env.FOOD_SALT || "bk-food"}`);
}
function derive(row, now) {
  if (row.reports >= PROMOTE_AT) return "confirmed";
  if (now - row.created_at < TEMP_MIN * 60000) return "temp";
  return "expired";
}
function newId() {
  return "r" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

async function listReports(req, env, url) {
  const now = Date.now();
  const cat = clean(url.searchParams.get("cat"), 20);
  const st = env.DB.prepare(
    `SELECT id, cat, menu, place, memo, reports, created_at, lat, lng, (photo IS NOT NULL) AS has_photo
       FROM food_reports
      WHERE flagged = 0 AND created_at > ?1 AND (reports >= ?3 OR created_at > ?2)
      ORDER BY (reports >= ?3) DESC, created_at DESC
      LIMIT 60`
  ).bind(now - KEEP_MS, now - LIVE_EXPIRED_MS, PROMOTE_AT);
  const { results } = await st.all();
  const origin = url.origin;
  const reports = (results || [])
    .filter((r) => !cat || r.cat === cat)
    .map((r) => ({
      id: r.id,
      cat: r.cat,
      menu: r.menu,
      place: r.place,
      memo: r.memo || "",
      reports: r.reports,
      createdAt: r.created_at,
      lat: r.lat == null ? null : Number(r.lat),
      lng: r.lng == null ? null : Number(r.lng),
      status: derive(r, now),
      photo: r.has_photo ? `${origin}/api/food/photo/${encodeURIComponent(r.id)}` : null,
    }));
  return json({ ok: true, now, count: reports.length, reports });
}

async function createReport(req, env) {
  const ipHash = await deviceHash(req, env);
  const now = Date.now();
  const sinceHour = now - 3600 * 1000;
  const cnt = await env.DB.prepare(
    "SELECT COUNT(*) AS n FROM food_events WHERE ip_hash = ?1 AND kind = 'create' AND created_at > ?2"
  ).bind(ipHash, sinceHour).first();
  if (cnt && cnt.n >= 5) return txt("제보가 너무 잦습니다. 1시간 뒤에 다시 시도해 주세요.", 429);

  let body;
  try {
    body = await req.json();
  } catch (e) {
    return txt("요청 형식을 읽지 못했습니다.");
  }
  const cat = clean(body.cat, 20);
  if (!CATS.includes(cat)) return txt("제보 종류를 골라 주세요.");
  const menu = maskPII(clean(body.menu, 60));
  const place = maskPII(clean(body.place, 80));
  const memo = maskPII(clean(body.memo, 200));
  if (menu.length < 1) return txt("메뉴를 적어 주세요.");
  if (place.length < 2) return txt("가게 위치를 동네 수준으로 적어 주세요.");
  /* 지도 핀 좌표(선택) — 지도에서 찍은 가게 위치만 받는다. 범위를 벗어나면 버린다. */
  let lat = numOrNull(body.lat);
  let lng = numOrNull(body.lng);
  if (lat === null || lng === null || Math.abs(lat) > 90 || Math.abs(lng) > 180 || (lat === 0 && lng === 0)) {
    lat = null;
    lng = null;
  }

  const photo = typeof body.photo === "string" ? body.photo : "";
  const m = /^data:image\/(jpeg|jpg|png);base64,([A-Za-z0-9+/=\s]+)$/.exec(photo);
  if (!m) return txt("사진을 한 장 첨부해 주세요.");
  let bytes;
  try {
    const bin = atob(m[2].replace(/\s/g, ""));
    if (bin.length > MAX_PHOTO_BYTES) return txt("사진이 너무 큽니다. 다시 시도해 주세요.");
    bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  } catch (e) {
    return txt("사진을 읽지 못했습니다.");
  }

  const id = newId();
  const expiresAt = now + TEMP_MIN * 60000;
  await env.DB.batch([
    env.DB.prepare(
      `INSERT INTO food_reports (id, cat, menu, place, memo, photo, photo_type, reports, created_at, expires_at, status, lat, lng)
       VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, 1, ?8, ?9, 'temp', ?10, ?11)`
    ).bind(id, cat, menu, place, memo, bytes, m[1] === "png" ? "image/png" : "image/jpeg", now, expiresAt, lat, lng),
    env.DB.prepare("INSERT INTO food_events (ip_hash, kind, created_at) VALUES (?1, 'create', ?2)").bind(ipHash, now),
  ]);

  return json(
    {
      ok: true,
      report: {
        id,
        cat,
        menu,
        place,
        memo,
        reports: 1,
        createdAt: now,
        lat,
        lng,
        status: "temp",
        photo: `${new URL(req.url).origin}/api/food/photo/${id}`,
      },
    },
    201
  );
}

async function confirmReport(req, env, id) {
  const now = Date.now();
  const row = await env.DB.prepare(
    "SELECT id, reports, created_at, flagged FROM food_reports WHERE id = ?1"
  ).bind(id).first();
  if (!row) return txt("이미 사라진 제보입니다.", 404);
  if (row.flagged) return txt("숨김 처리된 제보입니다.", 410);
  if (row.reports < PROMOTE_AT && now - row.created_at >= TEMP_MIN * 60000) {
    return json({ ok: false, error: "만료된 제보는 확인할 수 없습니다.", reports: row.reports, status: "expired" }, 409);
  }
  const dh = await deviceHash(req, env);
  const ins = await env.DB.prepare(
    "INSERT OR IGNORE INTO food_confirms (report_id, device_hash, created_at) VALUES (?1, ?2, ?3)"
  ).bind(id, dh, now).run();
  const changed = ins.meta && ins.meta.changes > 0;
  let reports = row.reports;
  if (changed) {
    const next = row.reports + 1;
    const status = next >= PROMOTE_AT ? "confirmed" : "temp";
    await env.DB.prepare("UPDATE food_reports SET reports = ?1, status = ?2 WHERE id = ?3")
      .bind(next, status, id).run();
    reports = next;
  }
  return json({
    ok: true,
    changed,
    reports,
    status: reports >= PROMOTE_AT ? "confirmed" : now - row.created_at < TEMP_MIN * 60000 ? "temp" : "expired",
  });
}

async function flagReport(req, env, id) {
  const now = Date.now();
  const row = await env.DB.prepare("SELECT id, flagged FROM food_reports WHERE id = ?1").bind(id).first();
  if (!row) return txt("이미 사라진 제보입니다.", 404);
  const ipHash = await deviceHash(req, env);
  const kind = "flag:" + id;
  const dup = await env.DB.prepare(
    "SELECT 1 AS n FROM food_events WHERE ip_hash = ?1 AND kind = ?2 LIMIT 1"
  ).bind(ipHash, kind).first();
  if (!dup) {
    await env.DB.prepare("INSERT INTO food_events (ip_hash, kind, created_at) VALUES (?1, ?2, ?3)")
      .bind(ipHash, kind, now).run();
  }
  const c = await env.DB.prepare(
    "SELECT COUNT(DISTINCT ip_hash) AS n FROM food_events WHERE kind = ?1"
  ).bind(kind).first();
  const flags = (c && c.n) || 0;
  await env.DB.prepare("UPDATE food_reports SET flagged = ?1 WHERE id = ?2").bind(flags >= 3 ? 1 : 0, id).run();
  return json({ ok: true, flags, hidden: flags >= 3 });
}

function toBytes(v) {
  if (!v) return null;
  if (v instanceof ArrayBuffer) return new Uint8Array(v);
  if (ArrayBuffer.isView(v)) return new Uint8Array(v.buffer, v.byteOffset, v.byteLength);
  if (Array.isArray(v)) return Uint8Array.from(v);
  if (typeof v === "object" && Array.isArray(v.data)) return Uint8Array.from(v.data);
  return null;
}

async function photo(env, id) {
  const row = await env.DB.prepare(
    "SELECT photo, photo_type, flagged FROM food_reports WHERE id = ?1"
  ).bind(id).first();
  if (!row || !row.photo || row.flagged) return new Response("Not found", { status: 404, headers: CORS });
  const bytes = toBytes(row.photo);
  if (!bytes) return new Response("Not found", { status: 404, headers: CORS });
  return new Response(bytes, {
    headers: {
      "content-type": row.photo_type || "image/jpeg",
      "cache-control": "public, max-age=3600",
      ...CORS,
    },
  });
}

async function health(env) {
  const now = Date.now();
  const r = await env.DB.prepare(
    "SELECT COUNT(*) AS n FROM food_reports WHERE flagged = 0 AND created_at > ?1"
  ).bind(now - LIVE_EXPIRED_MS).first();
  return json({ ok: true, t: now, live: (r && r.n) || 0 });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const p = url.pathname;
    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: CORS });
    try {
      if (p === "/api/food/health" && request.method === "GET") return await health(env);
      if (p === "/api/food/reports" && request.method === "GET") return await listReports(request, env, url);
      if (p === "/api/food/reports" && request.method === "POST") return await createReport(request, env);
      let m = /^\/api\/food\/reports\/([A-Za-z0-9_-]{1,40})\/confirm$/.exec(p);
      if (m && request.method === "POST") return await confirmReport(request, env, m[1]);
      m = /^\/api\/food\/reports\/([A-Za-z0-9_-]{1,40})\/flag$/.exec(p);
      if (m && request.method === "POST") return await flagReport(request, env, m[1]);
      m = /^\/api\/food\/photo\/([A-Za-z0-9_-]{1,40})$/.exec(p);
      if (m && request.method === "GET") return await photo(env, m[1]);
      return txt("없는 경로입니다.", 404);
    } catch (e) {
      return json({ ok: false, error: "server_error", detail: String(e).slice(0, 200) }, 500);
    }
  },

  async scheduled(event, env) {
    const now = Date.now();
    await env.DB.batch([
      env.DB.prepare("DELETE FROM food_reports WHERE created_at < ?1").bind(now - KEEP_MS),
      env.DB.prepare("DELETE FROM food_confirms WHERE created_at < ?1").bind(now - KEEP_MS),
      env.DB.prepare("DELETE FROM food_events WHERE created_at < ?1").bind(now - 2 * 24 * 3600 * 1000),
    ]);
  },
};
