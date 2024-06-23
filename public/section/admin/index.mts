
import { body, element as e } from "/apps/www/src/html.mts";
import { SETTINGS } from "/apps/jaki.club/src/Base.mts";


body(
  e('h1', `${SETTINGS.SITE_NAME} ADMIN.`),
  e('main',
    e('div', 'placer')
   ), // main
  e('footer', e('span', '.copyright', '(c) 2024. All rights reserved.'))
);

// console.log(SITE_NAME);
