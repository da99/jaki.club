
    // return new Response(`Not found: ${req.url}`, { status: 404, statusText: "Not Found"});

import { Hono } from 'hono';
import { serveStatic } from 'hono/bun';

const app = new Hono()

app.get('/', async (_c) => {
  await Bun.spawn(['bin/__', 'build']).exited
  return new Response(Bun.file("./build/Public/section/home/index.html"));
});
// app.get('/', serveStatic({ path: "./build/index.html"}));
app.get('/*', serveStatic({ root: "./build/Public"}));

const PORT = 4567;
console.log(`Starting server at: ${PORT}`)
export default {
  port: PORT,
  fetch: app.fetch,
};
