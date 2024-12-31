
import { SETTINGS } from './Base.mts';
// import type { Bindings } from '/apps/jaki.club/src/Base.mts';
import type { Context } from 'hono';
import { Session } from 'hono-sessions';
import PUBLIC_FILES from '../tmp/public_files.json';

const DOMAIN = 'JAKI.CLUB';
// const THE_SOURCE = (SETTINGS.IS_DEV) ? `http://localhost:${SETTINGS.static_port}` : SETTINGS.static_url;

// type CTX = { req: Request, env: Bindings };

export const JAKI = {
  is_user(s: Session) {
    return s.sessionValid() && s.get('email');
  },
  is_admin(s: Session) {
    return JAKI.is_user(s) && s.get('is_admin') === 'yes';
  },

  time: {
    mins_ago(n: number) {
      const now = Math.ceil(Date.now() / 1000)
      return now - (n * 60)
    }
  },

  email: {
    addr(x: 'ENTER', e: 'DEV' | 'PROD' | 'STAGE') {
      switch (e) {
        case 'STAGE':
          return `${x}@THE-STAGE.${DOMAIN}`;
        default:
          return `${x}@${DOMAIN}`;
      }
    },
    is_official(x: string) {
      return x === JAKI.email.addr('ENTER', 'PROD') || x === JAKI.email.addr('ENTER', 'STAGE');
    }
  },

  static: {
    fetch(raw_c: Context, sPath: string) {
      const c = raw_c;
      const build_target = c.env['BUILD_TARGET'] || (c.env['development'] && 'dev') || 'production';
      switch (build_target) {
        case 'dev':
          // const new_url = `http://localhost:${SETTINGS.STATIC_PORT}${sPath}`;
          const new_url = sPath;
          console.log(`--- Fetching from localhost: ${new_url}`);
          return fetch(new_url);
        default: // prod
          const pf = PUBLIC_FILES[sPath as keyof typeof PUBLIC_FILES];
          if (!pf) {
            console.log(`--- Not found in public_files: ${sPath}`);
            return fetch(`${SETTINGS.STATIC_URL}/404`);
          }
          const fin_url = `${SETTINGS.STATIC_URL}/${pf['Key']}`;
          console.log(`--- Fetching: ${fin_url}`);
          return fetch(fin_url);
      } // switch
    },

    fetch_copy(ctx: Context, sPath: string) {
      return JAKI.static.fetch(ctx, sPath)
      .then((resp: Response) => new Response(resp.body, { headers: resp.headers }));
    }
  }
};

