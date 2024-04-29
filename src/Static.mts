
declare let process: any;
import { SETTINGS } from '/apps/jaki.club/src/Base.mts';


// const THE_SOURCE = (SETTINGS.IS_DEV) ? `http://localhost:${SETTINGS.static_port}` : SETTINGS.static_url;

export class Static {
  name: string;
  constructor(raw_name: string) {
    this.name = raw_name;
  }

  get index_mjs() { return  `/section/${this.name}/index.mjs` ; }
  get index_html() { return  `/section/${this.name}/index.html` ; }
  get index_css() { return  `/section/${this.name}/index.css` ; }

  // static fetch(sPath: string) {
  //   const fin = static_url(c, sPath);
  //   console.log(`-- Fetching: ${fin}`)
  //   return fetch( fin );
  // }
} // class

export function static_url(sPath: string, c?: any) {
  if (!c && typeof process === 'object')
    c = process
  const source = (c && c.env.IS_DEV)  ? `http://127.0.0.1:${SETTINGS.static_port}` : SETTINGS.static_url ;
  return `${source}${sPath}`;
}

export async function static_fetch(sPath: string, c?: any) {
  const fin = static_url(sPath, c);
  console.log(`-- Fetching: ${fin}`)
  return fetch(fin);
}

