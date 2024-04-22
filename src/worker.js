
    // return new Response(`Not found: ${req.url}`, { status: 404, statusText: "Not Found"});

import { Hono } from 'hono';
import { sessionMiddleware, CookieStore, Session } from 'hono-sessions';
import { serveStatic } from 'hono/bun';
import { X_SENT_FROM } from '/apps/www/src/html.mts';
import { is_email_valid } from '/apps/www/src/base.mts';
import { Client, fql, FaunaError } from "fauna";
import { send_via_zepto } from "./ZeptoMail.ts";
// import { which } from 'bun';

import { SETTINGS } from '/apps/jaki.club/src/Base.mts';
import { Static } from '/apps/jaki.club/src/Static.mts';

// configure your client
const client = new Client({
  secret: process.env.FAUNA_SECRET
});

const app = new Hono()
const store = new CookieStore();

function new_otp() {
  return crypto.randomUUID().replace(/[^0-9]+/g, '').substring(0,6);
}

app.use('*', sessionMiddleware({
  store,
  encryptionKey: process.env.PSWD_SALT,
  expireAfterSeconds: (60 * 60 * 24 * 14),
  cookieOptions: {
    sameSite: 'Lax',
    path: '/',
    httpOnly: true
  }
})
);

  app.get('/', async (_c) => {
    await Bun.spawn(['bin/__', 'build', 'dev']).exited
    return Static.fetch('/section/home/index.html');
  });

app.get('/session-data', async (c) => {
  const session = c.get('session');
  const screen_name = session.get('screen_name');
  if (screen_name) {
    return c.json({screen_name, logged_in: true});
  }
  return c.json({screen_name: undefined, logged_in: false});
})

// app.get('/', serveStatic({ path: "./build/index.html"}));
app.get('/admin', async (c) => {
  const session = c.get('session');

  return Static.fetch('/section/admin/index.html');
  // return new Response(Bun.file("./build/Public/section/admin/index.html"));
});

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
  const otp = new_otp();
  const otp_human = otp.split('').join(' ');
  console.log(otp_human);
  // const email_response = await send_via_zepto(raw_email, `Log-in Code: ${otp_human}`);
  // console.warn(email_response);

  return new Response(JSON.stringify({X_SENT_FROM: dom_id, success: true, fields: {email: "accepted"}}));
})

if (SETTINGS.IS_DEV) {
  app.get('/*', serveStatic({ root: `./${SETTINGS.build_dir}/${SETTINGS.static_dir}`}));
}

console.log(`Starting server at: ${SETTINGS.dev_port}`)
export default {
  port: SETTINGS.dev_port,
  fetch: app.fetch,
};



