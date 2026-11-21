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
  flagged INTEGER NOT NULL DEFAULT 0
);
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
