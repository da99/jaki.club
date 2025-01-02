
import { html5, element as x } from '../../../../da/src/www/src/bsr.mts';
import { SETTINGS } from '../../../src/Base.mts';
import { default_head } from '/apps/jaki.club/src/bsr.mts';

console.log(
  html5(
    default_head('home', `${SETTINGS.SITE_NAME} Homepage`),

    x('body',
      x('h1', '.company_logo', SETTINGS.SITE_NAME),
      x('main',
        x('div', '#wait',
          x('div',
            x('p', 'Send an e-mail with the following values:'),
            x('div', '#email',
              x('p', '.to',
                x('span', '.field', 'To: '),
                x('span', 'value',
                  x('a', '.login_email', {href: '{MAILTO}'}, '{login_email}')
                )
               ), // x p
               x('p', '.subject', x('span', '.field', 'Subject: '), x('span', '.value', 'ENTER'))
             ) // x div#email
           ), // x div,
          x('p', 'Then wait a few minutes to receive a reply with further instructions.')
        ) // x div#wait
      ), // x main
      x('footer', x('span', '.copyright', '(c) 2025. All rights reserver.')),
      x('script', {type: 'module', src: '/section/home/index.mjs'}, '')
    ) // x body
  ) // html5
);
