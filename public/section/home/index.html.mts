import { html5, element as E, allow_tags } from '/apps/www/src/bsr.mts';
import { SETTINGS } from '/apps/jaki.club/src/Base.mts';
import { Static } from '/apps/jaki.club/src/Static.mts';
import { default_head } from '/apps/jaki.club/src/bsr.mts';

const Home = new Static('home');

allow_tags('h1', 'h2', 'footer', 'main');

console.log(
  html5(
    default_head(Home.name, `${SETTINGS.site_name} homepage`),
    E('body', '.stranger',
      E('h1', `Storage Closet`),
      E('main',
        E('form', '.login#login', {action: '/login', method: "post"},
          E('h2', 'Login or Create an account.'),
          E('fieldset',
            E('label', {htmlFor: 'email'}, 'Email:'),
            E('input', {type: 'email', name: 'email', required: true}),
           ),
           E('button', '.submit', 'Enter')
         ), // form
         E('form', '#otp_enter', {action: '/otp-login', method: 'post'},
           E('div', '.try_again', 'Incorrent code. Try again.'),
           E('h2', 'Enter the 6 digit code sent to your email:'),
           E('fieldset',
             E('label', {htmlFor: 'otp_code'}, '{{EMAIL}}'),
             E('input', {type: 'text', name: 'otp_code',  required: true, maxLength: 6, minLength: 6}),
            ),
            E('button', '.submit', 'Enter')
         ),
         E('div', '#locked_out',
           E('p',
             'Too many failed attempts.',
           ),
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
