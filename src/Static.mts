
import { SETTINGS } from '/apps/jaki.club/src/Base.mts';
import type { Bindings } from '/apps/jaki.club/src/Base.mts';

// const THE_SOURCE = (SETTINGS.IS_DEV) ? `http://localhost:${SETTINGS.static_port}` : SETTINGS.static_url;

export function static_fetch(c: { req: Request, env: Bindings }, sPath: string) {
  if (c.env['IS_DEV']) {
    const new_url = `http://localhost:${SETTINGS.STATIC_PORT}${sPath}`;
    console.log(`--- Fetching: ${new_url}`);
    return fetch(new_url);
  } else {
    return fetch(`${SETTINGS.STATIC_URL}${sPath}`);
  }
}

