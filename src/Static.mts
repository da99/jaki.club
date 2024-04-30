
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

export function static_fetch(sPath: string, _c?: any) {
  const public_file = SETTINGS.public_files[sPath];
  if (!public_file || !public_file.base64) {
    const new_url = `${SETTINGS.static_url}${sPath}`;
    return {type: 'fetch', value: new_url};
  }

  const mime_type = public_file.mime_type as string;
  if (mime_type.match(/charset=(utf-8|.+-ascii)/))
    return {type: 'text', value: public_file};

  return {type: 'binary', value: public_file, binary: Uint8Array.from(atob(public_file.base64), (x) => x.charCodeAt(0))};
}

export function static_url(sPath: string) {
  const public_file = SETTINGS.public_files[sPath];
  if (!public_file)
    return sPath;

  if (!public_file.base64) {
    return `${SETTINGS.static_url}${sPath}`;
  }

  return sPath;
}

