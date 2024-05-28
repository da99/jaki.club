
import type { Bindings } from '/apps/jaki.club/src/Base.mts';


export  async function fetch(req: Request, _env: Bindings, _ctx: any) {
  return new Response(`Not found: ${req.url}`, { status: 404, statusText: "Not Found"});
} // fetch


