import {
  use_default_forms,
  on,
  unhide, hide,
  retry_until_ok,
  reload_in
} from "/apps/www/src/html.mts";
import type { Fields_State } from "/apps/www/src/html.mts";

// import { SETTINGS } from "/apps/jaki.club/src/Base.mts";

// body(
//   e('h1', `${SETTINGS.site_name} home.`),
//   e('main',
//     e('form.login#login',
//       {action: '/login', method: "post"},
//       e('h2', 'Login or Create an account.'),
//       e('fieldset',
//         e('label', {htmlFor: 'email'}, 'Email:'),
//         e('input', {type: 'email', name: 'email'}),
//        ),
//       form_post(e('button', 'Enter'))
//     ) // form
//    ), // main
//   e('footer', e('span.copyright', '(c) 2024. All rights reserved.'))
// );

use_default_forms();

const THE_BODY = document.body;

on('request', function () {
  hide('#network_error', '#server_error');
})

on('login/network_error', function (_f: HTMLElement, _data: Fields_State ) {
  unhide('#network_error');
});

on('login/server_error', function (_f: HTMLElement, _data: Fields_State) {
  unhide('#server_error');
});

on('login/ok', function (f: HTMLElement) { hide(f); unhide('#start_the_wait'); });

on('start_the_wait/ok', function (f: HTMLElement) {
  hide(f);
  unhide('#wait');
  retry_until_ok(5, 'wait');
});

on('wait/ok', function (f: HTMLElement) {
  hide(f);
  unhide('user_is_in');
  reload_in(2);
});

on('#user_is_in', 'wait_to_get_email', function (_f: HTMLElement, _data: Fields_State) {
  // Start a countdown timer.
  // Update the count_down value.
  // Wait 5 seconds.
  //   Keep checking every 5 seconds for receipt of email.
  // When received:
  //   send success of form: #start_the_wait
  // When count_down finished:
  //   Show: email not received. start over.
});


// input_numbers_only('input[name="the_code"]');


/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="dom" />
// window.addEventListener('load', (__event) => {
//   document.body.classList.remove('loading');
// });
