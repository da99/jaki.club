import {
  use_default_forms,
  dom_it, unhide, hide,
  reload_in,
  e_id,
  on,
  retry_until_ok
} from "/apps/www/src/html.mts";

import type { Request_Origin, Response_Origin, Fields_State } from "/apps/www/src/html.mts";

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

on.request('*', function () {
  dom_it(hide, '#network_error', '#server_error');
});

on.network_error('*', function () {
  dom_it(hide, '#network_error');
});

on.server_error('*', function () {
  dom_it(unhide, '#server_error');
});

on.ok('#login', function (_resp, req: Request_Origin) {
  dom_it(hide, `#${req.element_id}`);
  dom_it(unhide, '#start_the_wait');
});

on.ok('#start_the_wait', function (_resp, req: Request_Origin) {
  dom_it(hide, `#${req.element_id}`);
  dom_it(unhide, '#wait');
  retry_until_ok(5, '#wait');
});

on.ok('#wait', function (_resp, req: Request_Origin) {
  dom_it(hide, `#${req.element_id}`);
  dom_it(unhide, 'user_is_in');
  reload_in(2);
});

// on.ok('#user_is_in', function (_f: Element, _data: Fields_State) {
  // Start a countdown timer.
  // Update the count_down value.
  // Wait 5 seconds.
  //   Keep checking every 5 seconds for receipt of email.
  // When received:
  //   send success of form: #start_the_wait
  // When count_down finished:
  //   Show: email not received. start over.
// });


// input_numbers_only('input[name="the_code"]');


/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="dom" />
// window.addEventListener('load', (__event) => {
//   document.body.classList.remove('loading');
// });
