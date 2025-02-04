import { print_html } from '../../../../www/html.js/html.mts';
import SETTINGS from '../../settings.json';
import { default_head } from '../../../src/bsr.mts';

print_html((x) => {
  default_head('{{NAME}}', `{{NAME}}`),

  x('h1', '{{NAME}} Page'),
  x('main', () => {
    x('p', 'some content')
  }) // main

  x('footer', () => x('span', '.copyright', '(c) {{YEAR}}. All rights reserved.'))
  x('script', {type: 'module', src: '/section/{{NAME}}/index.mjs'}, '')

}); // html5

