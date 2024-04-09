import { html5, element as E } from '/apps/html.js/src/bsr.mts';
import { SETTINGS } from '/apps/jaki.club/src/Base.mts';
import { Static } from '/apps/jaki.club/src/Static.mts';
import { default_head } from '/apps/jaki.club/src/bsr.mts';

const Admin = new Static('admin');

console.log(
  html5(
    default_head(Admin.name, `Admin: ${SETTINGS.site_name}`),
    E('body',
      E('script', {type: 'module', src: Admin.index_mjs})
     )
  )
);
