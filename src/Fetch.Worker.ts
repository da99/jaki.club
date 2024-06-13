
import type { Bindings } from '/apps/jaki.club/src/Base.mts';
import { Hono } from 'hono';
import { Login_Code } from './LOGIN_CODE_DB.mts';
import { JAKI } from '/apps/jaki.club/src/jaki.mts';
import type { Context, Next } from 'hono';
function err500(msg: string) { return new Response(msg, {status: 500, statusText: msg}); }

// import { Client, fql, FaunaError } from "fauna";
// // configure your client
// const client = new Client({
//   secret: process.env.FAUNA_SECRET
// });
  // return new Response(`Method ${c.req.method} not allowed.`, {
  //   status: 405,
  //   statusText: 'Only GET alllowed.',
  //   headers: {
  //     Allow: "GET",
  //   },
  // });
//
import { sessionMiddleware, CookieStore, Session } from 'hono-sessions';

const app = new Hono<{ Bindings: Bindings, Variables: { session: Session } }>()

function is_logged_in(s: Session) {
  return s.sessionValid() && s.get('email');
}
const cookieSessionMiddleware = (async (c: Context, next: Next) => {
  const store = new CookieStore();
  const m = sessionMiddleware({
    store,
    encryptionKey: c.env['PSWD_SALT'],
    expireAfterSeconds: (60 * 60 * 24 * 14),
    cookieOptions: {
      sameSite: 'Lax',
      path: '/',
      httpOnly: true
    }
  });
  return m(c, next);
});

app.use('*', cookieSessionMiddleware);

app.get('/', async function (c) {
  return JAKI.static.fetch_copy(c, '/section/home/index.html')
} );

app.get('/*', async function (c) {
  return JAKI.static.fetch_copy(c, c.req.path);
});

app.post('/log-in', async (c) => {
  const session = c.get('session');
  let otp_id = session.get('otp_id');
  let otp_code = null;

  // Generate OTP
  if (!otp_id) {
    const login_code = new Login_Code();
    otp_code = login_code.code;

    // Store it in database.
    // Store id to cookie.
  }

  // Send OK to client.
});

app.post('/session-status', async (c) => {
  const session = c.get('session');
  const otp_id = session.get('otp_id');
  // Check database if otp_id is approved.
  // if true, send OK => fields email
  // else: send 're-try' => fields seconds 10
});

app.get('/log-out', async (c) => {
  const session = c.get('session');
  session.deleteSession();
  return c.redirect('/', 302);
});

app.get('/admin', async (c) => {
  const session = c.get('session');
  if (is_logged_in(session))
    return JAKI.static.fetch_copy(c, '/section/admin/index.html');
  return c.redirect('/', 302);
});


export default app;


