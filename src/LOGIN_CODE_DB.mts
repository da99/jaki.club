
// import type { Bindings } from '/apps/jaki.club/src/Base.mts';

import { LOGIN_CODE_LENGTH, LOGIN_WAIT_TIME } from '../settings.json';

const HUMAN_CODE_PATTERN = /^([a-z0-9\-]{8,})$/i;

// const CODE_USED = 1;
// const CODE_MAX_USE = 4;

export class Login_Code {
  readonly code: string;
  readonly human: string;

  static is_expired(i: number) {
    const limit = i + (LOGIN_WAIT_TIME * 60)
    return Math.ceil(Date.now() / 1000) <= limit;
  }

  static async get(db: D1Database, s: string) {
    const len = LOGIN_CODE_LENGTH + ((LOGIN_CODE_LENGTH / 2) - 1)
    if (s.length != len)
      return false;
    if (!!s.match(HUMAN_CODE_PATTERN))
      return false;
    return await db.prepare(`SELECT * FROM login_codes WHERE code = ?;`).bind(s).first();
  }

  static async save_email(db: D1Database, raw_email: string) {
    const email = raw_email.trim();
    const up = email.toLocaleUpperCase();
    const down = email.toLocaleLowerCase();
    const result = await db.prepare(`
       INSERT INTO email (upcase, downcase, origin)
       VALUES (?, ?, ?)
       ON CONFLICT (upcase, downcase) DO NOTHING
       RETURNING *;
    `).bind(up, down, email).first();

    if (result)
      return result;

    return await db.prepare(`SELECT * FROM email WHERE upcase = ? AND downcase = ?;`).bind(up, down).first();
  }

  static async save_session(db: D1Database, email_id: number, code_id: number) {
    const row = await db.prepare(`
      INSERT INTO sessions (email_id, code_id)
      VALUES (?, ?)
      ON CONFLICT (email_id, code_id) DO NOTHING
      RETURNING *;
    `).bind(email_id, code_id).first();

    if (row)
      return row;
    return await db.prepare(`
      SELECT * FROM sessions
      WHERE email_id = ? AND code_id = ?;
    `).bind(email_id, code_id).first();
  }

  static async get_email(db: D1Database, raw_code: string) {
    const up_code = raw_code.trim().toLocaleUpperCase();
    return db.prepare(`
      SELECT
        sessions.id as session_id,
        email.upcase AS email_upcase,
        email.origin AS email_origin,
        login_codes.code AS code,
        login_codes.date_created AS code_date
      FROM sessions
           INNER JOIN
           login_codes ON sessions.code_id = login_codes.id
           INNER JOIN
           email ON sessions.email_id = email.id
      WHERE code = ?;`).bind(up_code).first();
  }

  static accept(db: D1Database, session_id: number) {
    return db.prepare(`
      UPDATE sessions
      SET accepted = true
      WHERE sessions.id = ?
      RETURNING *;
    `).bind(session_id).first();
  }

  constructor() {
    this.code = crypto.randomUUID().replace(/[^0-9]+/g, '').substring(0,LOGIN_CODE_LENGTH);
    this.human = this.code.split(/(..)/).filter(x => x !== '').join('-');
  }

  db_save(db: D1Database, raw_id: number) {
    return db.prepare(`
      INSERT INTO login_codes(code, email_id)
      VALUES (?)
      RETURNING *;`).bind(this.human, raw_id).first();
  }
}
// === class

