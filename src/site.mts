
declare let process: any;
export const SITE_NAME = "jAki.CLUB";
export const DEV_PORT = 4567;

// let IS_DEV = typeof process === 'object' && ['YES', 'IS_DEV'].includes(process?.env?.IS_DEV);
export const IS_DEV = ['yes', 'YES', 'IS_DEV'].includes(typeof process != 'undefined' && process.env.IS_DEV);
let REMOTE_URL = 'https://not.yet.ready/static';
let LOCAL_URL = '';

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

  static fetch(sPath: string) {
    return fetch(`http://localhost:${DEV_PORT}${this.file(sPath)}`);
  }
} // class

