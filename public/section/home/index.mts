import {
  use,
  css, dom, page, on, http
} from "/apps/www/src/html.mts";

import type {
  Response_Origin
} from "/apps/www/src/html.mts";

use.default_forms();

on.request('*', function () {
  css.by_id.hide('network_error')
  css.by_id.hide('server_error');
});

on.network_error('*', function () {
  css.by_id.unhide('network_error');
});

on.server_error('*', function () {
  css.by_id.unhide('server_error');
});

function fetch_login_is_ready() {
  return http.fetch('wait', '/login/is_ready', 'POST');
}

on.ok('login', function (_resp, _req) {
  css.by_id.hide('login');
  css.by_id.unhide('wait');
  setTimeout(fetch_login_is_ready, 10000)
});

on.try_again('wait', function (_resp, _req) {
  setTimeout(fetch_login_is_ready, 5000);
});

on.expired('wait', function (_resp, _req) {
  css.by_id.hide('wait');
  css.by_id.unhide('wait_expired');
});

on.ok('wait', function (resp: Response_Origin, _req) {
  css.by_id.hide('wait');
  dom.update_text_by_id(resp.fields);
  css.by_id.unhide('user_is_in');
});

on.by_id.click('yes_and_reload', function(_ev) {
  css.by_id.hide('user_is_in');
  css.by_id.unhide('reloading_now');
  page.reload(2);
});

on.by_id.click('no_and_logout', function(_ev) {
  page.go_to('/logout');
});


/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="dom" />
// window.addEventListener('load', (__event) => {
//   document.body.classList.remove('loading');
// });
