import {
  use,
  css, dom, page, on, http,
  dispatch
} from "/apps/www/src/html.mts";

import type {
  Response_Origin
} from "/apps/www/src/html.mts";

import SETTINGS from '../../../settings.json';

/* ********************************************* */
let time_ends_at = 0;

function fetch_login_is_ready() { return http.fetch('wait', '/login/is_ready', 'POST'); }

function wait_another_second() {
  if (time_ends_at < 1000)
    return false;
  const seconds_left = Math.floor((time_ends_at - Date.now()) / 1000);
  if (seconds_left < 2) {
    return on_expired();
  }
  dom.update_values('wait', {'count_down': seconds_left});
  setTimeout(wait_another_second, 1000);
}

function on_expired() {
  time_ends_at = 0;
  css.by_id.hide('wait');
  css.by_id.unhide('expired');
}
/* ********************************************* */

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

on.ok('login', function (json, _req) {
  css.by_id.hide('login');
  dom.update_values('wait', json.data);
  css.by_id.unhide('wait');
  setTimeout(fetch_login_is_ready, 10000)
});

on.not_yet('wait', function (_resp, _req) {
  if (time_ends_at === 0) {
    time_ends_at = Date.now() + (SETTINGS.LOGIN_WAIT_TIME * 60 * 1000);
    setTimeout(wait_another_second, 1000);
  }
  setTimeout(fetch_login_is_ready, 5000);
});

on.expired('wait', on_expired);

on.ok('wait', function (resp: Response_Origin, _req) {
  time_ends_at = 0;
  css.by_id.hide('wait');
  dom.update_values('user_is_in', resp.data);
  css.by_id.unhide('user_is_in');
});

on.by_id.click('start_over', function (_ev) {
  page.go_to('/logout');
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
