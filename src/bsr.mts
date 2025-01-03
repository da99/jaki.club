declare let process: any;

import { element as x } from '/apps/da/src/www/src/bsr.mts';
import SETTINGS from '../tmp/settings.json';

export function static_url(sPath: string) {
  return `${SETTINGS.STATIC_URL}${sPath}`;
}

//   <head>
//     <meta charset="utf-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1">
//     <title>Loading...</title>
//     <link rel="stylesheet" href="/styles/reset.css">
//     <link rel="stylesheet" href="/styles/pure.css">
//     <link rel="stylesheet" href="/section/home/index.css">
//   </head>
//   <body>
//     <script src="/section/home/index.mjs"></script>
//   </body>
//
export function default_head(section: string, title: string) {
  return x('head',
           x('meta', {charset: "utf-8"}),
           x('meta', {name: "viewport", content: "width=device-width, initial-scale=1"}),
             x('title', title),
           // <link rel='icon' type='image/png' href='/favicon.png'>
           x('link', {rel: "stylesheet", href: "/styles/reset.css" }),
           x('link', {rel: "stylesheet", href: "/styles/pure.css" }),
           x('link', {rel: "stylesheet", href: `/section/${section}/index.css` }),
          );
};
