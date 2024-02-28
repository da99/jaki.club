// /apps/dom.ts/src/dom.ts
// import { body, element as e } from "../base/html.mts";
import { body, element as e } from "/apps/html.js/src/index.mts";


body(
  e('main', e('div', 'hello'))
);

/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="dom" />
// window.addEventListener('load', (__event) => {
//   document.body.classList.remove('loading');
// });
