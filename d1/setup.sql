CREATE TABLE IF NOT EXISTS email (
  id INTEGER PRIMARY KEY,
  upcase TEXT NOT NULL UNIQUE,
  downcase TEXT NOT NULL UNIQUE,
  origin TEXT NOT NULL,
  date_created INTEGER(4) NOT NULL DEFAULT (strftime('%s', 'now'))
);

CREATE TABLE IF NOT EXISTS login_codes (
  id INTEGER PRIMARY KEY,
  code TEXT NOT NULL,
  date_created INTEGER(4) NOT NULL DEFAULT (strftime('%s', 'now'))
);

CREATE TABLE IF NOT EXISTS sessions (
  id INTEGER PRIMARY KEY,
  email_id INTEGER NOT NULL,
  code_id INTEGER NOT NULL,
  date_created INTEGER(4) NOT NULL DEFAULT (strftime('%s', 'now'))
);

DROP TABLE IF EXISTS codes;
