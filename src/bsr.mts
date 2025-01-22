// declare let process: any;

import { meta, title, link } from '../../www/html.js/dom.mts';
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
export function default_head(section: string, str_title: string) {
  // <link rel='icon' type='image/png' href='/favicon.png'>
  meta({charset: "utf-8"})
  meta({name: "viewport", content: "width=device-width, initial-scale=1"})
  title(str_title)
  link({rel: "stylesheet", href: "/section/base/pure.css" })
  link({rel: "stylesheet", href: `/section/${section}/index.css` })
};
