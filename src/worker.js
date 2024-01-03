
export default {
  fetch(req, __env, __ctx) {
    if (req.url.indexOf("low-supplies") > -1) {
      const newURL = 'https://docs.google.com/document/d/1Xr5EH8pTicLnGFOO_PtPiCfwrX8LR_Wbn7-qTwutsOQ/edit?usp=sharing';
      return Response.redirect(newURL, 302);
    }
    return new Response(`Hello World: ${req.url}`);
  }
}
