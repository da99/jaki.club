import { html5, element as E, Static } from '/apps/www/src/bsr.mts';
import { SETTINGS } from '/apps/jaki.club/src/Base.mts';
import { default_head } from '/apps/jaki.club/src/bsr.mts';

const Home = new Static('home');

console.log(
  html5(
    default_head(Home.name, `${SETTINGS.SITE_NAME} homepage`),
    E('body', '.init',
      E('div', '.network-error', E('span', 'Network error. '), E('span', '.msg', 'Check your Internet connection or try again later.')),
      E('div', '.server-error', E('span', 'Server error. '), E('span', '.msg', 'Try again later.')),
      E('h1', `Storage Closet`),
      E('main',
        E('form', '#login', {action: '/login', method: "post"},
          E('h2', 'Login or Create an account.'),
          E('fieldset',
            E('label', {htmlFor: 'login-email'}, 'Email:'),
            E('input', {type: 'email', name: 'email', id: "login-email", required: true, autocomplete: 'email'}),
           ),
           E('button', '.submit', 'Enter')
         ), // form
         E('form', '#enter_the_code', {action: '/login-otp', method: 'post'},
           E('div', '.the_code.invalid', 'Incorrent code. Try again.'),
           E('h2', 'Enter the 6 digit code sent to your email:'),
           E('fieldset',
             E('label', {htmlFor: 'the_code'}, '{{EMAIL}}'),
             E('input', {type: 'text', id: 'the_code', name: 'the_code',  required: true, maxLength: 6, minLength: 6}),
            ),
            E('button', '.submit', 'Enter')
         ), // form
         E('div', '#locked_out',
           E('p', 'Too many failed attempts.',),
           E('p', 'Try again in ', E('span', '#try_again_time', '10 minutes.'))
         ),
         E('div', '#user_is_in',
           E('p', 'You are now logged in as: ',
             E('span', '.email', '{{EMAIL}}')
           ),
           E('p', 'Please wait as the page loads...')
         )
       ), // main
       E('footer', E('span', '.copyright', '(c) 2024. All rights reserved.')),
      E('script', {type: 'module', src: Home.index_mjs})
     )
  )
);
