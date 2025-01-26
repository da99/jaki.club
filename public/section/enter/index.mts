
import {
  css, on, log
} from "../../../../www/html.js/dom.mts";
// import { SETTINGS } from "/apps/jaki.club/src/Base.mts";

on.submit('confirm_email', function (_data) {
  css.by_id.hide('confirm_email');
  css.by_id.unhide('code_enter');
});


const href_pieces = window.location.href.split('/');
const raw_email = href_pieces[href_pieces.length - 1];
if (raw_email) {
  const email = decodeURIComponent(raw_email);
  document.querySelectorAll('div.confirm_email').forEach(x => (x as HTMLElement).innerText = email)
}
