
declare let process: any;
import { SETTINGS } from '/apps/jaki.club/src/Base.mts';
import PUBLIC_FILES from '/apps/jaki.club/public_files.json';

// const THE_SOURCE = (SETTINGS.IS_DEV) ? `http://localhost:${SETTINGS.static_port}` : SETTINGS.static_url;

export function static_fetch(sPath: string, _c?: any) {
  // const new_url = `${SETTINGS.static_url}${sPath}`;
  const new_url = `http://localhost:${SETTINGS.static_port}${sPath}`;
  console.log(new_url);
  return fetch(new_url);
}

