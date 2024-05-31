import { html5, element as E, Static } from '/apps/www/src/bsr.mts';
import { SETTINGS } from '/apps/jaki.club/src/Base.mts';
import { default_head } from '/apps/jaki.club/src/bsr.mts';

const Home = new Static('home');

/*
* Show ENTER button.
* Click ENTER button.
*   send POST to /login
* Show instructions to person.
* Start countdown: 5 minutes.
* Check every 10 seconds.
* If received:
*   Show message: You are now logged in.
* Refresh page.
* If not received: Expired. Show Login button.
*/

console.log(
  html5(
    default_head(Home.name, `${SETTINGS.SITE_NAME} homepage`),
    E('body',
      E('div', '.hide.error_msg#network_error', E('span', 'Network error. '), E('span', '.msg', 'Check your Internet connection or try again later.')),
      E('div', '.hide.error_msg#server_error', E('span', 'Server error. '), E('span', '.msg', 'Try again later.')),
      E('h1', 'Storage Closet'),
      E('main',
        E('form', '#login', {action: '/login', method: "post"},
          E('div', '.hide.error_msg.session_invalid', 'Your browser is not compatitable with this site.'),
          E('button', '.submit', 'Enter')
         ), // form
         E('form', '.hide#start_the_wait', {action: '#start_the_wait', method: 'post'},
           E('div',
             'Send an email with the following values:',
             E('div',
               E('span', 'TO:'), E('span', '.email_value', '{ENTER@EMAIL}'),
               E('span', 'SUBJECT:'), E('span', '.code_value', '{{CODE_VALUE}}')
              ),
            ),
            E('button', '.submit', 'I have sent the email.')
          ), // form
         E('form', '.hide.#wait', {action: '/login/check_receipt', method: 'post'}, 
           E('p', "Once the email you sent is received and processed, you can continue:"),
           E('div', '.count_down_value', '{COUNT_DOWN_VALUE}')
          ),
         E('div', '.hide.show_on_wait_success#user_is_in',
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
