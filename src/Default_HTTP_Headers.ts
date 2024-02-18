
function default_http_headers(x : Response) {
  x.headers.set("X-Content-Type-Options", "nosniff");

  /*
   * For the VARY header, check your providers Caching documentation.
   * By default, we will use Cookie, Origin. But, it's dependent on the
   * request and other factors that determine the response from the origin (ie not cache) server
   * to the client.
   */
  x.headers.set("Vary", "Cookie, Origin"); // https://jakearchibald.com/2021/cors/
} // function
