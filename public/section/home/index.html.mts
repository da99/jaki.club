import { html5, element as E, Static } from '/apps/www/src/bsr.mts';
import { SETTINGS } from '/apps/jaki.club/src/Base.mts';
import { default_head } from '/apps/jaki.club/src/bsr.mts';

const Home = new Static('home');


console.log(
  html5(
    default_head(Home.name, `${SETTINGS.SITE_NAME} homepage`),
    E('body',
      E('div', '.hide#network_error', E('span', 'Network error. '), E('span', '.msg', 'Check your Internet connection or try again later.')),
      E('div', '.hide#server_error', E('span', 'Server error. '), E('span', '.msg', 'Server error. Try again later.')),
      E('h1', 'Storage Closet'),
      E('main',
        E('form', '#login', {action: '/login', method: "post"},
          E('div', '.hide.error_msg.session_invalid', 'Your browser is not compatitable with this site.'),
          E('button', '.submit', 'Enter')
        ), // form
        E('div', '.hide#wait',
          E('div',
            'Send an email with the following values:',
            E('div',
              E('span', 'TO:'), E('span', '#login_email', '{ENTER@EMAIL}'),
              E('span', 'SUBJECT:'), E('span', '#login_code', '{CODE_VALUE}')
             ),
           ),
           E('p', "Once the email you sent is received and processed, you can continue"),
           E('div', '#count_down_value', '{COUNT_DOWN_VALUE}')
        ), // form
        E('div', '.hide#user_is_in',
          E('p', 'Is this your email address?',
            E('span', '#user_email', '{{EMAIL}}')
          ),
          E('p',
            E('button', {type: 'button'}, '#yes_and_reload', 'Yes'),
            E('button', {type: 'button'}, '#no_and_logout', 'No!')
          )
        ),
        E('div', '.hide#reloading_now', 'Reloading this page. Please wait a few seconds...')
       ), // main
       E('footer', E('span', '.copyright', '(c) 2024. All rights reserved.')),
      E('script', {type: 'module', src: Home.index_mjs})
     )
  )
);
