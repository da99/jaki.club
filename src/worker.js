
    // return new Response(`Not found: ${req.url}`, { status: 404, statusText: "Not Found"});

import { Hono } from 'hono'
const app = new Hono()

app.get('/', (c) => c.text('Hono!'))

export default app
