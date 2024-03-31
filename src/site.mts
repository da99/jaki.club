
declare let process: any;
export const SITE_NAME = "jAki.CLUB";
import { element as E } from '/apps/html.js/src/bsr.mts';


// let IS_DEV = typeof process === 'object' && ['YES', 'IS_DEV'].includes(process?.env?.IS_DEV);
let IS_DEV = ['yes', 'YES', 'IS_DEV'].includes(process?.env?.IS_DEV);
let REMOTE_URL = 'https://not.yet.ready/static';
let LOCAL_URL = 'http://localhost:4568';

const THE_SOURCE = (IS_DEV) ? LOCAL_URL : REMOTE_URL;

export class Static {
  name: string;
  constructor(raw_name: string) {
    this.name = raw_name;
  }

  get index_mjs() { return this.file(`/index.mjs`); }
  get index_html() { return this.file(`/index.html`); }
  get index_css() { return this.file(`/index.css`); }

  file(sPath: string) {
    return `${THE_SOURCE}/section/${this.name}${sPath}`;
  }

  static file(sPath: string) {
    return `${THE_SOURCE}${sPath}`;
  }
} // class

export function default_head(section: string, title: string) {
  return E('head',
           E('meta', {charset: "utf-8"}),
           E('meta', {name: "viewport", content: "width=device-width, initial-scale=1"}),
           E('title', title),
           E('link', {rel: "stylesheet", href: Static.file("/styles/reset.css") }),
           E('link', {rel: "stylesheet", href: Static.file("/styles/pure.css") }),
           E('link', {rel: "stylesheet", href: Static.file(`/section/${section}/index.css`) }),
          );
};
