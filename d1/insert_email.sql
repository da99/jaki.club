INSERT INTO email(upcase, downcase, origin) VALUES(?, ?, ?)
  ON CONFLICT(upcase) DO NOTHING
RETURNING *;
