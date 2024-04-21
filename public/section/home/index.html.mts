import { html5, element as E, allow_tags } from '/apps/www/src/bsr.mts';
import { SETTINGS } from '/apps/jaki.club/src/Base.mts';
import { Static } from '/apps/jaki.club/src/Static.mts';
import { default_head } from '/apps/jaki.club/src/bsr.mts';

const Home = new Static('home');

allow_tags('h1', 'h2', 'footer', 'main');

console.log(
  html5(
    default_head(Home.name, `${SETTINGS.site_name} homepage`),
    E('body',
      E('h1', `Storage Closet`),
      E('main',
        E('form', '.login#login', {action: '/login', method: "post"},
          E('h2', 'Login or Create an account.'),
          E('fieldset',
            E('label', {htmlFor: 'email'}, 'Email:'),
            E('input', {type: 'email', name: 'email'}),
           ),
           E('button', '.submit', 'Enter')
         ) // form
       ), // main
       E('footer', E('span', '.copyright', '(c) 2024. All rights reserved.')),
      E('script', {type: 'module', src: Home.index_mjs})
     )
  )
);
