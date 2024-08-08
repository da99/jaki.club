
import { Hono } from 'hono';
import { JAKI } from '/apps/jaki.club/src/jaki.mts';
import { Status } from '/apps/jaki.club/src/Base.mts';
import type { Context, Next } from 'hono';

import { sessionMiddleware, CookieStore, Session } from 'hono-sessions';

const app = new Hono<{ Variables: { session: Session } }>()

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


