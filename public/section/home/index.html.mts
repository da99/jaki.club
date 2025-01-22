
import { print_html } from '../../../../www/html.js/html.mts';
import SETTINGS from '../../settings.json';
import { default_head } from '../../../src/bsr.mts';

print_html((x) => {
  default_head('home', `${SETTINGS.SITE_NAME} Homepage`);

  x('h1', '.company_logo', SETTINGS.SITE_NAME)
  x('main', (main) => {
    main('div', '#wait', (d) => {
      d('div', (d2) => {
        d2('p', 'Send an e-mail with the following values:')
        d2('div', '#email', (d3) => {
          d3('p', '.to', (p) => {
            p('span', '.field', 'To: ')
            p('span', '.value', (span) => span('a', '.login_email', {href: '{MAILTO}'}, '{login_email}'))
          }) // x p
          d3('p', '.subject', (p) => {
            p('span', '.field', 'Subject: ')
            p('span', '.value', 'ENTER');
          })
        }) // x div#email
      }) // x div,

      d('p', 'Then wait a few minutes to receive a reply with further instructions.')
    }) // x div#wait
  }) // x main

  x('footer', f => f('span', '.copyright', '(c) 2025. All rights reserved.'))
  x('script', {type: 'module', src: '/section/home/index.mjs'}, '')

}); // html5

