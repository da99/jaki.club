
import { Hono } from 'hono'

import app from '../src/Fetch.Worker.ts';

const PORT = 4567;

console.log(`=== Running on: ${PORT}`)
export default {
  port: PORT,
  fetch: app.fetch
}
