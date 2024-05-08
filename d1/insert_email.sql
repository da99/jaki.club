INSERT INTO email(email, display) VALUES(?, ?)
  ON CONFLICT(email) DO NOTHING
RETURNING *;
