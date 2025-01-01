import { html5, element as E } from '../../../../da/src/www/src/bsr.mts';
import { SETTINGS } from '../../../src/Base.mts';
import { default_head } from '/apps/jaki.club/src/bsr.mts';


console.log(
  html5(
    default_head('admin', `Admin: ${SETTINGS.SITE_NAME}`),
    E('body',
      E('script', {type: 'module', src: '/section/admin/index.mjs'})
     )
  )
);
