
import type { Bindings } from '/apps/jaki.club/src/Base.mts';
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
    encryptionKey: c.env['PSWD_SALT'] || (c.env['development'] && 'abc'.repeat(11) ),
    expireAfterSeconds: (60 * 60 * 24 * 14),
    cookieOptions: {
      sameSite: 'Lax',
      path: '/',
      httpOnly: true
    }
  });
  return m(c, next);
});

const require_post_x_sent_from = (async (c: Context, next: Next) => {
  if (c.req.method !== 'POST')
    return await next();
  const x = c.req.header('X_SENT_FROM');
  if (!x)
    return c.json(Status.invalid({X_SENT_FROM: 'missing'}));
  c.res.headers.set('X_SENT_FROM', x);
  await next();
});

app.use('*', cookieSessionMiddleware);
app.use(require_post_x_sent_from);

app.get('/', async function (c) {
  return JAKI.static.fetch_copy(c, '/section/home/index.html')
} );

app.get('/enter/:email', async function (c) {
  return JAKI.static.fetch_copy(c, '/section/enter/index.html')
} );

app.post('/login', async (c) => {
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

  const login_email = c.env.IS_STAGE ? '@THE-STAGE.' : '@' ;
  return c.json({status: 'ok', data: {login_email: `ENTER${login_email}jaki.club`, login_code: login_code.human}});
});

app.post('/login/is_ready', async (c) => {
  const session = c.get('session');
  const code = session.get('login_code');
  if (typeof code !== 'string') {
    return c.json(Status.Reset);
  }

  const old_email = session.get('email_upcase');
  if (old_email)
    return c.json(Status.ok_data({email: old_email as string}));

  // Check database if user sent in code:
  const email_session = await Login_Code.get_email(c.env.LOGIN_CODE_DB, code);

  if (!email_session)
    return c.json(Status.not_yet(5));

  const session_row = await Login_Code.accept(c.env.LOGIN_CODE_DB, email_session['session_id'] as number)
  if (!session_row)
    return c.json(Status.DB);

  session.set('email_origin', email_session['email_origin']);
  return c.json(Status.ok_data({email: email_session['email_origin'] as string}));
});

app.get('/logout', async (c) => {
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


// ===========================================================================
app.get('/*', async function (c) {
  return JAKI.static.fetch_copy(c, c.req.path);
});
// ===========================================================================

export default app;


