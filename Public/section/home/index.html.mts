import { html5, element as E } from '/apps/html.js/src/bsr.mts';
import { SITE_NAME, default_head } from '/apps/jaki.club/src/site.mts';


console.log(
  html5(
    default_head('home', `${SITE_NAME} homepage`),
    E('body',
      E('script', {type: 'module', src: "/section/home/index.mjs"})
     )
  )
);

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
