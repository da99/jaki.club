
/*
SELECT COUNT(id) as COUNT_EMAIL FROM email;
SELECT COUNT(id) as COUNT_CODE FROM codes;
*/

SELECT COUNT(*) as CODE_COUNT FROM email LEFT JOIN codes ON email.id = codes.email_id;
