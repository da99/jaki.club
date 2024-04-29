
import { SETTINGS } from '/apps/jaki.club/src/Base.mts';
import { normalize, join } from "node:path";


const THE_SOURCE = (SETTINGS.IS_DEV) ? SETTINGS.local_url : SETTINGS.static_url;

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

  static fetch(c: string, sPath: string) {
    const fin = this.file(c, sPath);
    console.log(`-- Fetching: ${fin}`)
    return fetch( fin );
  }
} // class


export function static_fetch(c: any, sPath: string) {
  const source = (c.env.IS_DEV)  ? SETTINGS.local_url : SETTINGS.static_url ;
  const fin = `${source}${normalize(sPath)}`;
    console.log(`-- Fetching: ${fin}`)
  return fetch(fin);
}

