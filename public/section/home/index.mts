import {
  use,
  css, dom, page, on,
  log
} from "/apps/www/src/html.mts";

import type {
  Response_Origin
} from "/apps/www/src/html.mts";

use.default_forms();

on.request('*', function () {
  css.by_id.hide('network_error', 'server_error');
});

on.network_error('*', function () {
  css.by_id.unhide('network_error');
});

on.server_error('*', function () {
  css.by_id.unhide('server_error');
});

on.ok('login', function (_resp, _req) {
  css.by_id.hide('login');
  css.by_id.unhide('start_the_wait');
});

on.ok('start_the_wait', function (resp: Response_Origin, _req) {
  css.by_id.hide('start_the_wait');
  dom.update_text_by_id(resp.fields);
  css.by_id.unhide('wait');
  setTimeout(() => dom.fetch('#wait'), 7000);
});

on.ok('wait', function (resp: Response_Origin, _req) {
  css.by_id.hide('wait');
  dom.update_text_by_id(resp.fields);
  css.by_id.unhide('user_is_in');
  page.reload(2);
});


/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="dom" />
// window.addEventListener('load', (__event) => {
//   document.body.classList.remove('loading');
// });
