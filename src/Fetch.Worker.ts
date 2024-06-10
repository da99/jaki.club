
import type { Bindings } from '/apps/jaki.club/src/Base.mts';
import { Hono } from 'hono';
import { static_fetch } from '/apps/jaki.club/src/Static.mts';

function err500(msg: string) { return new Response(msg, {status: 500, statusText: msg}); }

// import { Client, fql, FaunaError } from "fauna";
// // configure your client
// const client = new Client({
//   secret: process.env.FAUNA_SECRET
// });
//
import { sessionMiddleware, CookieStore, Session } from 'hono-sessions';

const app = new Hono<{ Bindings: Bindings }>()
const store = new CookieStore();

app.use('*', sessionMiddleware({
  store,
  encryptionKey: process.env['PSWD_SALT'],
  expireAfterSeconds: (60 * 60 * 24 * 14),
  cookieOptions: {
    sameSite: 'Lax',
    path: '/',
    httpOnly: true
  }
})
);
app.get('/', async function (c) {
  return static_fetch(c, '/section/home/index.html');
  // return new Response(file.value.base64, {headers: {'Content-Type': file.value.mime_type}});
} );

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


app.post('/login', async function (c) {

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

app.get('/session-data', async (c) => {
  const session = c.get('session');
  const screen_name = session.get('screen_name');
  if (screen_name) {
    return c.json({screen_name, logged_in: true});
  }
  return c.json({screen_name: undefined, logged_in: false});
})

app.get('/admin', async (c) => {
  const session = c.get('session');

  return Static.fetch('/section/admin/index.html');
  // return new Response(Bun.file("./build/Public/section/admin/index.html"));
});


export default app;


