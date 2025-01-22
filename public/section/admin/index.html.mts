import { print_html } from '../../../../www/html.js/html.mts';
import SETTINGS from '../../settings.json';
import { default_head } from '../../../src/bsr.mts';


print_html((h) => {
  default_head('admin', `Admin: ${SETTINGS.SITE_NAME}`)
  h('script', {type: 'module', src: '/section/admin/index.mjs'})
});
