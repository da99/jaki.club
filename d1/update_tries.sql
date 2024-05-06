UPDATE codes
SET tries = tries + 1
WHERE
  email_id IN
  (SELECT id FROM EMAIL WHERE email = ?)
RETURNING tries;
