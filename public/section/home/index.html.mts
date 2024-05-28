import { html5, element as E, Static } from '/apps/www/src/bsr.mts';
import { SETTINGS } from '/apps/jaki.club/src/Base.mts';
import { default_head } from '/apps/jaki.club/src/bsr.mts';

const Home = new Static('home');

console.log(
  html5(
    default_head(Home.name, `${SETTINGS.SITE_NAME} homepage`),
    E('body',
      E('div', '.hidden#network_error', E('span', 'Network error. '), E('span', '.msg', 'Check your Internet connection or try again later.')),
      E('div', '.hidden#server_error', E('span', 'Server error. '), E('span', '.msg', 'Try again later.')),
      E('h1', `Storage Closet`),
      E('main',
        E('form', '.#login', {action: '/login', method: "post"},
          E('button', '.submit', 'Enter')
         ), // form
         E('form', '.hidden#start_the_wait', {action: '#start_the_wait', method: 'post'},
           E('div',
             'Send an email with the following values:',
             E('div',
               E('span', 'TO:'), E('span', '.email_value', '{ENTER@EMAIL}'),
               E('span', 'SUBJECT:'), E('span', '.code_value', '{{CODE_VALUE}}')
              ),
            ),
            E('button', '.submit', 'I have sent the email.')
          ), // form
         E('div', '.hidden.#wait',
           E('p', "Once the email you sent is received and processed, you can continue:"),
           E('div', '.count_down_value', '{COUNT_DOWN_VALUE}')
          ),
         E('div', '.hidden.show_on_wait_success#user_is_in',
           E('p', 'You are now logged in as: ',
             E('span', '.user_email', '{{EMAIL}}')
           ),
           E('p', 'Please wait as the page loads...')
         )
       ), // main
       E('footer', E('span', '.copyright', '(c) 2024. All rights reserved.')),
      E('script', {type: 'module', src: Home.index_mjs})
     )
  )
);
