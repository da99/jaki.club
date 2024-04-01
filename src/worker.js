
    // return new Response(`Not found: ${req.url}`, { status: 404, statusText: "Not Found"});

import { Hono } from 'hono';
import { sessionMiddleware, CookieStore, Session } from 'hono-sessions';
import { serveStatic } from 'hono/bun';
import { X_SENT_FROM } from '/apps/html.js/src/index.mts';
import { Client, fql, FaunaError } from "fauna";
import { which } from 'bun';

import { IS_DEV, DEV_PORT } from '/apps/jaki.club/src/site.mts';
import { Static } from '/apps/jaki.club/src/Static.mts';

// configure your client
const client = new Client({
  secret: process.env.FAUNA_SECRET
});

const app = new Hono()
const store = new CookieStore();

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
// if (IS_DEV) {
// }

app.get('/session-data', async (c) => {
  const session = c.get('session');
  const screen_name = session.get('screen_name');
  if (screen_name) {
    return c.json({screen_name});
  } else {
    return c.json({screen_name: undefined});
  }
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
  const hash = await Bun.password.hash(json.pswd);
  return new Response(JSON.stringify({__target: dom_id, msg: "A-ok."}));
})

if (IS_DEV) {
  app.get('/*', serveStatic({ root: "./build/Public"}));
}

console.log(`Starting server at: ${DEV_PORT}`)
export default {
  port: DEV_PORT,
  fetch: app.fetch,
};



