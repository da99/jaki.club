UPDATE codes
SET status = ?
WHERE
  code = ?
  AND email_id IN (SELECT id FROM EMAIL WHERE email = ?)
  AND status = ?
RETURNING code, status, tries;
