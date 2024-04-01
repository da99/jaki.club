import { html5, element as E } from '/apps/html.js/src/bsr.mts';
import { Static, SITE_NAME } from '/apps/jaki.club/src/site.mts';
import { default_head } from '/apps/jaki.club/src/bsr.mts';

const Admin = new Static('admin');

console.log(
  html5(
    default_head(Admin.name, `Admin: ${SITE_NAME}`),
    E('body',
      E('script', {type: 'module', src: Admin.index_mjs})
     )
  )
);
