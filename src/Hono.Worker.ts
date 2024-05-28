
  // return new Response(`Not found: ${req.url}`, { status: 404, statusText: "Not Found"});


import type { Bindings, Env } from '/apps/jaki.club/src/Base.mts';

import { Hono } from 'hono';
import { X_SENT_FROM, is_email_valid } from '/apps/www/src/base.mts';

// import { send_via_zepto } from "./ZeptoMail.ts";
// import { which } from 'bun';

// import { SETTINGS } from '/apps/jaki.club/src/Base.mts';
import { static_fetch } from '/apps/jaki.club/src/Static.mts';
import { Email, Login_Code } from './LOGIN_CODE_DB.mts';

// import { Client, fql, FaunaError } from "fauna";
// // configure your client
// const client = new Client({
//   secret: process.env.FAUNA_SECRET
// });

const app = new Hono<{ Bindings: Bindings }>()

// const store = new CookieStore();
// import { sessionMiddleware, CookieStore, Session } from 'hono-sessions';
// app.use('*', sessionMiddleware({
//   store,
//   encryptionKey: process.env['PSWD_SALT'],
//   expireAfterSeconds: (60 * 60 * 24 * 14),
//   cookieOptions: {
//     sameSite: 'Lax',
//     path: '/',
//     httpOnly: true
//   }
// })
// );

function err500(msg: string) {
  return new Response(msg, {status: 500, statusText: msg});
}

// app.get('/', serveStatic({ path: "./build/index.html"}));
app.get('/', async function (c) {
  return static_fetch(c, '/section/home/index.html');
  // return new Response(file.value.base64, {headers: {'Content-Type': file.value.mime_type}});
} );

// app.get('/session-data', async (c) => {
//   const session = c.get('session');
//   const screen_name = session.get('screen_name');
//   if (screen_name) {
//     return c.json({screen_name, logged_in: true});
//   }
//   return c.json({screen_name: undefined, logged_in: false});
// })

// app.get('/admin', async (c) => {
//   const session = c.get('session');
//
//   return Static.fetch('/section/admin/index.html');
//   // return new Response(Bun.file("./build/Public/section/admin/index.html"));
// });


app.post('/login', async (c) => {
  const json = await c.req.json();
  const dom_id = c.req.header(X_SENT_FROM);
  if (!dom_id) { return c.notFound(); }

  const email = new Email((json['email'] || '').toString());

  if (!email.is_valid) {
    return Response.json({success: false, fields: {email: email.state}});
  }

  const email_row = await email.upsert(c.env.LOGIN_CODE_DB);
  if (!email_row)
    return err500('Email unabled to be saved.');


  const login_code = new Login_Code();
  console.log(login_code.human);

  const code_row = await login_code.upsert(c.env.LOGIN_CODE_DB, email_row);
  if (!code_row)
    return err500(`Unable to generate code for player.`);

  return Response.json({X_SENT_FROM: dom_id, success: true, fields: {email: "inserted"}});
});

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

app.get('/*', async function (c) {

  if (c.req.method === 'GET') {
    return static_fetch(c as any, c.req.path);
  }

  return new Response(`Method ${c.req.method} not allowed.`, {
    status: 405,
    statusText: 'Only GET alllowed.',
    headers: {
      Allow: "GET",
    },
  });
});

export default app;
// default {
//   port: SETTINGS.dev_port,
//   fetch: app.fetch,
// };



