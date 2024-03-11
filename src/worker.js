
    // return new Response(`Not found: ${req.url}`, { status: 404, statusText: "Not Found"});

import { Hono } from 'hono';
import { serveStatic } from 'hono/bun';
import { X_SENT_FROM } from '/apps/html.js/src/index.mts';

const app = new Hono()

app.get('/', async (_c) => {
  await Bun.spawn(['bin/__', 'build']).exited
  return new Response(Bun.file("./build/Public/section/home/index.html"));
});
// app.get('/', serveStatic({ path: "./build/index.html"}));
app.get('/*', serveStatic({ root: "./build/Public"}));

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
