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
  the_body.addEventListener('login success', function (_ev: Event)  {
    // const ce = ev as CustomEvent;
    document.body.classList.remove('stranger');
    document.body.classList.add('otp_enter');
    document.querySelectorAll("#login input[name='email']").forEach((email) => {
      document.querySelectorAll(`#otp_enter label[for='otp_code']`).forEach((otp_label) => {
        otp_label.textContent = (email as HTMLInputElement).value.trim();
      })
    });
  });

});

document.querySelectorAll('input[name="otp_code"]').forEach( (ele) => {
  ele.addEventListener("keydown", (event: Event) => {
    const ev = event as KeyboardEvent;
    switch (ev.key) {
      case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
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


/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="dom" />
// window.addEventListener('load', (__event) => {
//   document.body.classList.remove('loading');
// });
