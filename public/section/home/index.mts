import {
  use,
  css, on, http,
  template, log
} from "/apps/da/src/www/src/html.mts";

// import type {
//   Response_Origin
// } from "/apps/da/src/www/src/html.mts";

import SETTINGS from '../../../settings.json';

/* ********************************************* */
// let time_ends_at = 0;

function fetch_login_is_ready() { return http.fetch('wait', '/login/is_ready', 'POST'); }

// function wait_another_second() {
//   if (time_ends_at < 1000)
//     return false;
//   const seconds_left = Math.floor((time_ends_at - Date.now()) / 1000);
//   if (seconds_left < 2) {
//     return on_expired();
//   }
//   template.update.by_keys('wait', {'count_down': seconds_left});
//   setTimeout(wait_another_second, 1000);
// }

// function on_expired() {
//   time_ends_at = 0;
//   css.by_id.hide('wait');
//   css.by_id.unhide('expired');
// }
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
  template.update.by_keys('wait', json.data);
  css.by_id.unhide('wait');
  setTimeout(fetch_login_is_ready, 10000)
});

const login_email = 'ENTER' + '@' + SETTINGS.DOMAIN;
document.querySelectorAll('#wait a[data-key="login_email"]').forEach((x) => { x.setAttribute('href', 'mailto:' + login_email); x.textContent = login_email });
log('done');
