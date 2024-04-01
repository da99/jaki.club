
import { DEV_PORT, IS_DEV, REMOTE_URL, LOCAL_URL } from '/apps/jaki.club/src/site.mts';
import { normalize, join } from "node:path";


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
    return Static.file(join('/section', this.name, sPath));
  }

  static file(sPath: string) {
    return `${THE_SOURCE}${normalize(sPath)}`;
  }

  static fetch(sPath: string) {
    return fetch( this.file(sPath) );
  }
} // class

