INSERT INTO email(upcase, downcase) VALUES(?, ?)
  ON CONFLICT(upcase) DO NOTHING
RETURNING *;
