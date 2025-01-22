declare let process: any;

import { element as e } from '../../www/html.js/dom.mts';
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
export function default_head(section: string, title: string) {
  const head = document.querySelector('head');
    // <link rel='icon' type='image/png' href='/favicon.png'>
  if (head) {
    head.appendChild( e('meta', {charset: "utf-8"}) );
    head.appendChild( e('meta', {name: "viewport", content: "width=device-width, initial-scale=1"}) )
    head.appendChild( e('title', title) )
    head.appendChild( e('link', {rel: "stylesheet", href: "/section/base/pure.css" }) )
    head.appendChild( e('link', {rel: "stylesheet", href: `/section/${section}/index.css` }) )
  }
};
