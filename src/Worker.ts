
  // return new Response(`Not found: ${req.url}`, { status: 404, statusText: "Not Found"});


import type { Bindings } from '/apps/jaki.club/src/Base.mts';

import { Hono } from 'hono';
import { X_SENT_FROM, is_email_valid } from '/apps/www/src/base.mts';

// import { send_via_zepto } from "./ZeptoMail.ts";
// import { which } from 'bun';

// import { SETTINGS } from '/apps/jaki.club/src/Base.mts';
import { static_fetch } from '/apps/jaki.club/src/Static.mts';

// import { Client, fql, FaunaError } from "fauna";
// // configure your client
// const client = new Client({
//   secret: process.env.FAUNA_SECRET
// });

const app = new Hono<{ Bindings: Bindings}>()


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

const THE_CODE_LENGTH = 6;

app.post('/login', async (c) => {
  const json = await c.req.json();
  const dom_id = c.req.header(X_SENT_FROM);
  if (!dom_id) {
    return c.notFound();
  }
  // const hash = await Bun.password.hash(json.pswd);
  const raw_email = (json['email'] || '').toString().trim();

  if (raw_email.length === 0)
    return new Response(JSON.stringify({X_SENT_FROM: dom_id, success: false, fields: {email: "empty"}}));

  if (!is_email_valid(raw_email))
    return new Response(JSON.stringify({X_SENT_FROM: dom_id, success: false, fields: {email: "invalid"}}));

  const otp = crypto.randomUUID().replace(/[^0-9]+/g, '').substring(0,THE_CODE_LENGTH);
  const otp_human = otp.split('').join(' ');
  console.log(otp_human);
  // const email_response = await send_via_zepto(raw_email, `Log-in Code: ${otp_human}`);
  // console.warn(email_response);

  return new Response(JSON.stringify({X_SENT_FROM: dom_id, success: true, fields: {email: "accepted"}}));
});

app.post('/otp-login', async (c) => {
  const json = await c.req.json();
  const dom_id = c.req.header(X_SENT_FROM);
  if (!dom_id) {
    return c.notFound();
  }

  const raw_email = (json['email'] || '').toString().trim();
  const raw_code = (json['the_code'] || '').toString().trim();

  if (raw_code.length !== THE_CODE_LENGTH)
    return new Response(JSON.stringify({X_SENT_FROM: dom_id, success: false, fields: {the_code: "invalid"}}));

  if (!is_email_valid(raw_email))
    return new Response(JSON.stringify({X_SENT_FROM: dom_id, success: false, fields: {email: "invalid"}}));

  const result = await get_email_code(raw_email, raw_code);

  if (result.success)
    return new Response(JSON.stringify({X_SENT_FROM: dom_id, success: true, fields: {the_code: "valid"}}));

  switch (result.reason) {
    case 'email':
      return new Response(JSON.stringify({X_SENT_FROM: dom_id, success: false, fields: {email: "email"}}));
    case 'the_code':
      return new Response(JSON.stringify({X_SENT_FROM: dom_id, success: false, fields: {the_code: "invalid"}}));
    case 'too_many_tries':
      return new Response(JSON.stringify({X_SENT_FROM: dom_id, success: false, fields: {the_code: "too_many_tries"}}));
  }

  return new Response(JSON.stringify({X_SENT_FROM: dom_id, success: false, fields: {the_code: "unknown"}}));
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



