import { html5, element as E } from '/apps/html.js/src/bsr.mts';
import { SITE_NAME } from '/apps/jaki.club/src/site.mts';
import { Static } from '/apps/jaki.club/src/Static.mts';
import { default_head } from '/apps/jaki.club/src/bsr.mts';


const Home = new Static('home');

console.log(
  html5(
    default_head(Home.name, `${SITE_NAME} homepage`),
    E('body',
      E('script', {type: 'module', src: Home.index_mjs})
     )
  )
);
