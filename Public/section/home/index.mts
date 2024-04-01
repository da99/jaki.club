import { body, element as e, form_post } from "/apps/html.js/src/index.mts";
import { SITE_NAME } from "/apps/jaki.club/src/site.mts";

body(
  e('h1', `${SITE_NAME} home.`),
  e('main',
    e('form.login#login',
      {action: '/login', method: "post"},
      e('h2', 'Login or Create an account.'),
      e('fieldset',
        e('label', {htmlFor: 'email'}, 'Email:'),
        e('input', {type: 'email', name: 'email'}),
       ),
      form_post(e('button', 'Enter'))
    ) // form
   ), // main
  e('footer', e('span.copyright', '(c) 2024. All rights reserved.'))
);

document.getElementById('login')?.addEventListener('formOK', function (ev: Event) {
  const ce = ev as CustomEvent;
  console.warn("Form login received:");
  console.warn(ce.detail);
})

/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="dom" />
// window.addEventListener('load', (__event) => {
//   document.body.classList.remove('loading');
// });
