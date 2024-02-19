
    // return new Response(`Not found: ${req.url}`, { status: 404, statusText: "Not Found"});

import { Hono } from 'hono';
import { serveStatic } from 'hono/bun';

const app = new Hono()

app.get('/', serveStatic({ path: "./build/index.html"}));
app.get('/*', serveStatic({ root: "./build"}));

export default {
  port: 8787,
  fetch: app.fetch,
};
