import { setup_events } from "/apps/www/src/html.mts";
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

setup_events();
document.querySelectorAll('body').forEach((the_body) => {
  the_body.addEventListener('before-request', function (ev: Event) {
    const ce = ev as CustomEvent;
    console.warn("Before request listener running.");
    console.warn(ce.detail);
  });

  the_body.addEventListener('success', function (ev: Event)  {
    const ce = ev as CustomEvent;
    const form_id = ce.detail.response['X_SENT_FROM'];
    console.log(`Received: success dispatch: ${form_id}`)
    if (!form_id)
      return false;
    const form = document.getElementById(form_id);
    if (!form)
      return false;
    switch (form_id) {
      case 'login':
        document.body.classList.remove('stranger');
        document.body.classList.add('otp_user');
        document.querySelectorAll("#login input[name='email']").forEach((email) => {
          document.querySelectorAll(`#otp_enter label[for='otp_code']`).forEach((otp_label) => {
            otp_label.textContent = (email as HTMLInputElement).value;
          })
        })
        break;
    }
  });
});


/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="dom" />
// window.addEventListener('load', (__event) => {
//   document.body.classList.remove('loading');
// });
