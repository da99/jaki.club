UPDATE codes
SET status = ?
WHERE
  code = ? AND
  email_id IN
  (SELECT id FROM EMAIL WHERE email = ?)
RETURNING code, status, tries;
