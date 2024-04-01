
import { body, element as e } from "/apps/html.js/src/index.mts";
import {SITE_NAME} from "/apps/jaki.club/src/site.mts";


body(
  e('h1', `${SITE_NAME} ADMIN.`),
  e('main',
    e('div', 'placer')
   ), // main
  e('footer', e('span.copyright', '(c) 2024. All rights reserved.'))
);

// console.log(SITE_NAME);
