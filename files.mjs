
const MANIFEST = {
  "/index.less": {
    "public_path": "/index.ecff45.less",
    "etag": "ecff45524"
  },
  "/index.alt.html": {
    "public_path": "/index.alt.69fef5.html",
    "etag": "69fef5839"
  },
  "/android-chrome-512x512.png": {
    "public_path": "/android-chrome-512x512.90754b.png",
    "etag": "90754bd5a"
  },
  "/favicon.ico": {
    "public_path": "/favicon.9bd279.ico",
    "etag": "9bd279dd5"
  },
  "/styles/pure-grids.css": {
    "public_path": "/styles/pure-grids.e980b1.css",
    "etag": "e980b19ca"
  },
  "/styles/reset.css": {
    "public_path": "/styles/reset.ed555a.css",
    "etag": "ed555a279"
  },
  "/styles/mazak/webfont.woff": {
    "public_path": "/styles/mazak/webfont.756a47.woff",
    "etag": "756a47e7d"
  },
  "/styles/mazak/webfont.woff2": {
    "public_path": "/styles/mazak/webfont.cfaf72.woff2",
    "etag": "cfaf729db"
  },
  "/styles/mwe/logo.png": {
    "public_path": "/styles/mwe/logo.558503.png",
    "etag": "5585032ef"
  },
  "/styles/mwe/spotlight.png": {
    "public_path": "/styles/mwe/spotlight.febc43.png",
    "etag": "febc43dab"
  },
  "/styles/mwe/bg_header.gif": {
    "public_path": "/styles/mwe/bg_header.a1f389.gif",
    "etag": "a1f38945d"
  },
  "/styles/mwe/bg.gif": {
    "public_path": "/styles/mwe/bg.f3ac83.gif",
    "etag": "f3ac835c6"
  },
  "/styles/mwe/spotlight_r1_c5.png": {
    "public_path": "/styles/mwe/spotlight_r1_c5.58e82a.png",
    "etag": "58e82a7e0"
  },
  "/styles/pure.css": {
    "public_path": "/styles/pure.ffb9da.css",
    "etag": "ffb9da134"
  },
  "/normalize.css": {
    "public_path": "/normalize.580818.css",
    "etag": "580818700"
  },
  "/index.html": {
    "public_path": "/index.57e80c.html",
    "etag": "57e80c539"
  },
  "/favicon.about.txt": {
    "public_path": "/favicon.about.b01dca.txt",
    "etag": "b01dcab6d"
  },
  "/favicon-16x16.png": {
    "public_path": "/favicon-16x16.c99327.png",
    "etag": "c99327bf2"
  },
  "/pure-grid.css": {
    "public_path": "/pure-grid.e980b1.css",
    "etag": "e980b19ca"
  },
  "/android-chrome-192x192.png": {
    "public_path": "/android-chrome-192x192.93ee74.png",
    "etag": "93ee74ef3"
  },
  "/section/admin/index.css": {
    "public_path": "/section/admin/index.e3b0c4.css",
    "etag": "e3b0c4429"
  },
  "/section/admin/index.mts": {
    "public_path": "/section/admin/index.a1628d.mts",
    "etag": "a1628d558"
  },
  "/section/admin/index.html": {
    "public_path": "/section/admin/index.852451.html",
    "etag": "8524513c7"
  },
  "/section/home/index.css": {
    "public_path": "/section/home/index.e6a60f.css",
    "etag": "e6a60f57d"
  },
  "/section/home/index.mts": {
    "public_path": "/section/home/index.8e58e7.mts",
    "etag": "8e58e7c4c"
  },
  "/section/home/index.html": {
    "public_path": "/section/home/index.4c4791.html",
    "etag": "4c4791a6b"
  },
  "/section/base/reset.css": {
    "public_path": "/section/base/reset.0dfd41.css",
    "etag": "0dfd41340"
  },
  "/section/base/html.mts": {
    "public_path": "/section/base/html.317d8f.mts",
    "etag": "317d8f0bb"
  },
  "/apple-touch-icon.png": {
    "public_path": "/apple-touch-icon.f77486.png",
    "etag": "f77486ab8"
  },
  "/favicon-32x32.png": {
    "public_path": "/favicon-32x32.e4026d.png",
    "etag": "e4026d831"
  }
} ;

export default {

  files: MANIFEST,

  path(key) {
    const file = MANIFEST[key];

    if (typeof IS_DEV === 'boolean')
      return key;

    if (file)
      return MANIFEST[key]["public_path"];

    throw new Error(`File not found: ${key}`);
  },

};
