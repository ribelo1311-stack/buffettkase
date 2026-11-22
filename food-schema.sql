-- 버핏카세 /food 붕세권 제보 저장소 (D1)
CREATE TABLE IF NOT EXISTS food_reports (
  id TEXT PRIMARY KEY,
  cat TEXT NOT NULL,
  menu TEXT NOT NULL,
  place TEXT NOT NULL,
  memo TEXT,
  photo BLOB,
  photo_type TEXT,
  reports INTEGER NOT NULL DEFAULT 1,
  created_at INTEGER NOT NULL,
  expires_at INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'temp',
  flagged INTEGER NOT NULL DEFAULT 0,
  lat REAL,
  lng REAL,
  pinned INTEGER NOT NULL DEFAULT 0
);
-- 2026-11-23: 운영자 상시 고정(pinned=1) — 60분 만료·3시간 미노출·7일 삭제 무시.
--   기존 DB 마이그레이션: ALTER TABLE food_reports ADD COLUMN pinned INTEGER NOT NULL DEFAULT 0;
-- 2026-11-22: 지도 핀 좌표(선택). 기존 DB에는 아래 마이그레이션을 먼저 적용한다.
--   ALTER TABLE food_reports ADD COLUMN lat REAL;
--   ALTER TABLE food_reports ADD COLUMN lng REAL;
CREATE TABLE IF NOT EXISTS food_confirms (
  report_id TEXT NOT NULL,
  device_hash TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  PRIMARY KEY (report_id, device_hash)
);
CREATE TABLE IF NOT EXISTS food_events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  ip_hash TEXT NOT NULL,
  kind TEXT NOT NULL,
  created_at INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_food_status ON food_reports(status, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_food_events ON food_events(ip_hash, kind, created_at);
