
import { body_append } from "../../../../www/html.js/dom.mts";
import SETTINGS from "../../settings.json";


body_append((e) => {
  e('h1', `${SETTINGS.SITE_NAME} ADMIN.`)
  e('main', () => {
    e('div', 'placer')
   }), // main
  e('footer', () => e('span', '.copyright', '(c) 2024. All rights reserved.'))
});

// console.log(SITE_NAME);
