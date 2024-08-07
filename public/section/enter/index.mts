
import {
  css, on
} from "/apps/da/src/www/src/html.mts";
// import { SETTINGS } from "/apps/jaki.club/src/Base.mts";

on.submit('confirm_email', function (_data) {
  css.by_id.hide('confirm_email');
  css.by_id.unhide('code_enter');
});

