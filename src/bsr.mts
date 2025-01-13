declare let process: any;

import { element as element_f } from '../../www/html.js/build.html.mts';
import SETTINGS from '../build/settings.json';

export function static_url(sPath: string) {
  return `${SETTINGS.STATIC_URL}${sPath}`;
}

//   <head>
//     <meta charset="utf-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1">
//     <title>Loading...</title>
//     <link rel="stylesheet" href="/section/base/pure.css">
//     <link rel="stylesheet" href="/section/home/index.css">
//   </head>
//   <body>
//     <script src="/section/home/index.mjs"></script>
//   </body>
//
export function default_head(section: string, title: string, x: typeof element_f) {
  return x('head', () => {
    x('meta', {charset: "utf-8"})
    x('meta', {name: "viewport", content: "width=device-width, initial-scale=1"})
    x('title', title)
    // <link rel='icon' type='image/png' href='/favicon.png'>
    x('link', {rel: "stylesheet", href: "/section/base/pure.css" })
    x('link', {rel: "stylesheet", href: `/section/${section}/index.css` })
  });
};
