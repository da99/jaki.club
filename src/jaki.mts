
import { SETTINGS } from '/apps/jaki.club/src/Base.mts';
// import type { Bindings } from '/apps/jaki.club/src/Base.mts';
import type { Context } from 'hono';
import { Session } from 'hono-sessions';

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
      if (c.env['IS_DEV']) {
        const new_url = `http://localhost:${SETTINGS.STATIC_PORT}${sPath}`;
          console.log(`--- Fetching: ${new_url}`);
        return fetch(new_url);
      } else {
        return fetch(`${SETTINGS.STATIC_URL}${sPath}`);
      }
    },

    fetch_copy(ctx: Context, sPath: string) {
      return JAKI.static.fetch(ctx, sPath)
      .then((resp: Response) => new Response(resp.body, { headers: resp.headers }));
    }
  }
};

