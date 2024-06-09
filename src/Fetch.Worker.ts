
import type { Bindings } from '/apps/jaki.club/src/Base.mts';
import { Hono } from 'hono';
import { static_fetch } from '/apps/jaki.club/src/Static.mts';


const app = new Hono<{ Bindings: Bindings }>()
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

export default app;


