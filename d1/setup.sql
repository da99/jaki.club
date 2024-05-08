CREATE TABLE IF NOT EXISTS email (
  id INTEGER PRIMARY KEY,
  upcase TEXT NOT NULL UNIQUE,
  downcase TEXT NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS codes (
  id INTEGER PRIMARY KEY,
  email_id INTEGER NOT NULL,
  code INTEGER NOT NULL UNIQUE,
  date_created INTEGER(4) NOT NULL DEFAULT (strftime('%s', 'now')) ,
  tries INTEGER(1) NOT NULL DEFAULT 0,
  status INTEGER DEFAULT '0' NOT NULL
);
