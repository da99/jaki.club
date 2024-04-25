import { Classy_Events } from "/apps/www/src/html.mts";
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

Classy_Events();

const THE_BODY = document.body;

THE_BODY.addEventListener('login success', function (ev: Event)  {
  const ce = ev as CustomEvent;
  document.body.classList.remove('stranger');
  THE_BODY.dispatchEvent(new CustomEvent('waiting_for_code', {detail: ce.detail }));
});

THE_BODY.addEventListener('waiting_for_code', function (_ev: Event) {
  document.body.classList.add('waiting_for_code');
  document.querySelectorAll("#login input[name='email']").forEach((email) => {
    document.querySelectorAll(`#enter_the_code label[for='the_code']`).forEach((otp_label) => {
      otp_label.textContent = (email as HTMLInputElement).value.trim();
    })
  });
});

THE_BODY.addEventListener('enter_the_code success', function (_ev: Event) {
  setTimeout(() => { window.location.reload(); }, 1000);
});

function input_numbers_only(selector: string) {
  return document.querySelectorAll(selector).forEach( (ele) => {
    ele.addEventListener("keydown", (event: Event) => {
      const ev = event as KeyboardEvent;
      switch (ev.key) {
        case '0':
          case '1': case '2': case '3': case '4': case '5':
          case '6': case '7': case '8': case '9':
          true;
        break;
        default:
          ev.stopPropagation();
        ev.preventDefault();
        console.log(ev.key);
      }
      // do something
    })
  })
} // === function

input_numbers_only('input[name="the_code"]');


/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="dom" />
// window.addEventListener('load', (__event) => {
//   document.body.classList.remove('loading');
// });
