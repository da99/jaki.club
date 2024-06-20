
// import type { Bindings } from '/apps/jaki.club/src/Base.mts';

import { LOGIN_CODE_LENGTH } from '../settings.json';


// const CODE_USED = 1;
// const CODE_MAX_USE = 4;

export class Login_Code {
  readonly code: string;
  readonly human: string;

  static async get_email(db: D1Database, raw_code: string) {
    const up_code = raw_code.trim().toLocaleUpperCase();
    return db.prepare(`
      SELECT
        sessions.id as session_id,
        email.origin AS email_origin,
        login_codes.code AS code,
        login_codes.date_created AS code_date
      FROM sessions INNER JOIN
           login_codes ON sessions.code_id = login_codes.id
           INNER JOIN
           email ON sessions.email_id = email.id
      WHERE code = ?;`).bind(up_code).first();
  }

  constructor() {
    this.code = crypto.randomUUID().replace(/[^0-9]+/g, '').substring(0,LOGIN_CODE_LENGTH);
    this.human = this.code.split(/(..)/).filter(x => x !== '').join('-');
  }

  db_save(db: D1Database) {
    return db.prepare(`INSERT INTO login_codes(code) VALUES (?1) RETURNINIG *;`).bind(this.human).first();
  }
}
// === class

