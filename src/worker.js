
    // return new Response(`Not found: ${req.url}`, { status: 404, statusText: "Not Found"});


import { Hono } from 'hono';
import { sessionMiddleware, CookieStore, Session } from 'hono-sessions';
import { serveStatic } from 'hono/bun';
import { X_SENT_FROM } from '/apps/html.js/src/index.mts';
import { Client, fql, FaunaError } from "fauna";
import { which } from 'bun';

// configure your client
const client = new Client({
  secret: process.env.FAUNA_SECRET
});

const app = new Hono()
const store = new CookieStore();

app.use('*', sessionMiddleware({
  store,
  encryptionKey: process.env.COOKIE_KEY,
  expireAfterSeconds: (60 * 60 * 24 * 14),
  cookieOptions: {
    sameSite: 'Lax',
    path: '/',
    httpOnly: true
  }
})
);
app.get('/', async (_c) => {
  await Bun.spawn(['bin/__', 'build']).exited
  return new Response(Bun.file("./build/Public/section/home/index.html"));
});

app.get('/session-data', async (_c) => {
  const session = c.get('session');
  const screen_name = session.get('screen_name');
  if (screen_name) {
    return {screen_name};
  } else {
    return {screen_name: undefined};
  }
})

// app.get('/', serveStatic({ path: "./build/index.html"}));
app.get('/*', serveStatic({ root: "./build/Public"}));
app.get('/admin', async (_c) => {
  const session = c.get('session');

  return new Response(Bun.file("./build/Public/section/admin/index.html"));
});

app.post('/login', async (ctx) => {
  const json = await ctx.req.json();
  const dom_id = ctx.req.header(X_SENT_FROM);
  if (!dom_id) {
    return ctx.notFound();
  }
  console.log(dom_id);
  console.log(json);
  return new Response(JSON.stringify({__target: dom_id, msg: "A-ok."}));
})

const PORT = 4567;
console.log(`Starting server at: ${PORT}`)
export default {
  port: PORT,
  fetch: app.fetch,
};



