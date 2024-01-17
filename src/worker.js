
export default {
  fetch(req, __env, __ctx) {
    const the_url = new URL(req.url);
    if (the_url.pathname === "/" ) {
      return new Response(`Hello World: ${req.url}`);
    }
    return new Response(`Not found: ${req.url}`, { status: 404, statusText: "Not Found"});
  }
}
