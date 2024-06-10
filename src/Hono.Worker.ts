

import type { Bindings } from '/apps/jaki.club/src/Base.mts';



async function validate_email_code(c: any, raw_email: string, raw_code: string) {
  const results = await c.env
  .LOGIN_CODE_DB
  .prepare(update_code_sql as string)
  .bind(CODE_USED, raw_code, raw_email, CODE_UNUSED)
  .first();

  console.warn(results);

  if (results) {
    const data = results as {status: number, tries: number};
    if (data.tries > CODE_MAX_USE)
      return {success: false, fields: {the_code: 'max_use'}};
    return {success: true, fields: {the_code: 'valid'}};
  }

  const tries = await c.env
  .LOGIN_CODE_DB
  .prepare(update_tries_sql)
  .bind(raw_email)
  .first();

  console.warn(tries);

  if ( tries ) {
    const t = tries as { tries: number };
    if (t['tries'] > CODE_MAX_USE) {
      return {success: false, fields: {the_code: 'max_use', tries: t['tries']}};
    }
  }
  return {success: false, fields: {the_code: 'invalid', tries}};
}

app.post('/login-otp', async (c) => {
  const json = await c.req.json();
  const dom_id = c.req.header(X_SENT_FROM);
  if (!dom_id) {
    return c.notFound();
  }

  const raw_email = (json['email'] || '').toString().trim();
  const raw_code = (json['the_code'] || '').toString().trim();

  const result = await validate_email_code(c as any, raw_email, raw_code);

  return Response.json(Object.assign({X_SENT_FROM: dom_id}, result));
});

export default app;
// default {
//   port: SETTINGS.dev_port,
//   fetch: app.fetch,
// };



