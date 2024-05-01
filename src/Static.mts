
declare let process: any;
import { SETTINGS } from '/apps/jaki.club/src/Base.mts';
import PUBLIC_FILES from '/apps/jaki.club/public_files.json';

// const THE_SOURCE = (SETTINGS.IS_DEV) ? `http://localhost:${SETTINGS.static_port}` : SETTINGS.static_url;

export function static_fetch(sPath: string, _c?: any) {
  const public_file = PUBLIC_FILES[sPath];
  if (!public_file || !public_file.base64) {
    const new_url = `${SETTINGS.static_url}${sPath}`;
    return {type: 'fetch', value: new_url};
  }

  const mime_type = public_file.mime_type as string;
  if (mime_type.match(/charset=(utf-8|.+-ascii)/))
    return {type: 'text', value: public_file};

  return {type: 'binary', value: public_file, binary: Uint8Array.from(atob(public_file.base64), (x) => x.charCodeAt(0))};
}

