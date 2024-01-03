
export default {
  fetch(req, __env, __ctx) {
    return new Response(`Hello World: ${req.url}`);
  }
}
