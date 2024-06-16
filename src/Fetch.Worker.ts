
import type { Bindings, StatusOKData } from '/apps/jaki.club/src/Base.mts';
import { Status } from '/apps/jaki.club/src/Base.mts';
import { Hono } from 'hono';
import { Login_Code } from './LOGIN_CODE_DB.mts';
import { JAKI } from '/apps/jaki.club/src/jaki.mts';
import type { Context, Next } from 'hono';

// function err500(msg: string) { return new Response(msg, {status: 500, statusText: msg}); }

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

  // Generate OTP:
  const login_code = new Login_Code();
  const code = login_code.code;

  // Save it to session:
  session.set('login_code', code);

  // Store it in database.
  const result = await login_code.db_save(c.env.LOGIN_CODE_DB);
  if (!result)
    return c.json(Status.DB);

  return c.json(Status.OK);
});

app.post('/session-status', async (c) => {
  const session = c.get('session');
  const code = session.get('login_code');
  if (typeof code !== 'string') {
    return c.json(Status.Reset);
  }

  // Check database if otp_id is approved.
  const email = await Login_Code.get_email(c.env.LOGIN_CODE_DB, code);

  if (!email)
    return c.json(Status.not_yet(15));

  return c.json(Status.ok_data({email: email['email'] as string}));
});

app.get('/log-out', async (c) => {
  const session = c.get('session');
  session.deleteSession();
  return c.redirect('/', 302);
});

app.get('/admin', async (c) => {
  const session = c.get('session');
  if (JAKI.is_admin(session))
    return JAKI.static.fetch_copy(c, '/section/admin/index.html');
  return c.redirect('/', 302);
});


export default app;


