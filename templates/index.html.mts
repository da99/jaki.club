import { html5, element as x } from '../../../../da/src/www/src/bsr.mts';
import { SETTINGS } from '../../../src/Base.mts';
import { default_head } from '../../../src/bsr.mts';

const HTML = html5(
  default_head('{NAME}', `{NAME}`),

  x('body',
    x('h1', '{NAME} Page'),
    x('main',
      x('p', 'some content')
    ), // main

    x('footer', x('span', '.copyright', '(c) {YEAR}. All rights reserved.')),
    x('script', {type: 'module', src: '/section/{NAME}/index.mjs'}, '')
  ) // body

); // html5

