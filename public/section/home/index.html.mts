
import { html5 } from '../../../../www/html.js/build.html.mts';
import { SETTINGS } from '../../../src/Base.mts';
import { default_head } from '../../../src/bsr.mts';

const HTML = html5((x) => {
  default_head('home', `${SETTINGS.SITE_NAME} Homepage`, x);

  x('body', () => {
    x('h1', '.company_logo', SETTINGS.SITE_NAME)
    x('main', () => {
      x('div', '#wait', () => {
        x('div', () => {
          x('p', 'Send an e-mail with the following values:')
          x('div', '#email', () => {
            x('p', '.to', () => {
              x('span', '.field', 'To: ')
              x('span', '.value', x('a', '.login_email', {href: '{MAILTO}'}, '{login_email}'))
            }) // x p
            x('p', '.subject', x('span', '.field', 'Subject: '), x('span', '.value', 'ENTER'))
          }) // x div#email
         }) // x div,

         x('p', 'Then wait a few minutes to receive a reply with further instructions.')
       }) // x div#wait
     }) // x main

     x('footer', x('span', '.copyright', '(c) 2025. All rights reserved.'))
     x('script', {type: 'module', src: '/section/home/index.mjs'}, '')
  });

}); // html5

console.log(HTML);
