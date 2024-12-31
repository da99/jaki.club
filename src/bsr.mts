declare let process: any;

import { element as E } from '/apps/da/src/www/src/bsr.mts';
import SETTINGS from '../tmp/settings.json';

export function static_url(sPath: string) {
  return `${SETTINGS.static_url}${sPath}`;
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
  return E('head',
           E('meta', {charset: "utf-8"}),
           E('meta', {name: "viewport", content: "width=device-width, initial-scale=1"}),
           E('title', title),
            // <link rel='icon' type='image/png' href='/favicon.png'>
           E('link', {rel: "stylesheet", href: static_url("/styles/reset.css") }),
           E('link', {rel: "stylesheet", href: static_url("/styles/pure.css") }),
           E('link', {rel: "stylesheet", href: static_url(`/section/${section}/index.css`) }),
          );
};
