
import type { Bindings } from '/apps/jaki.club/src/Base.mts';
// import select_email_sql from '../d1/select_email.sql';
// import insert_email_sql from '../d1/insert_email.sql';
// import insert_code_sql from '../d1/insert_code.sql';
// import update_code_sql from '../d1/update_code.sql';
// import update_tries_sql from '../d1/update_tries.sql';
// import { is_email_valid } from '/apps/www/src/base.mts';

export type Invalid_Email = {
  valid: false,
  msg: "empty" | "invalid" | "too_long"
};

export type Valid_Email = {
  valid: true,
  msg: "valid"
};

export type Email_Row = {
  id: number,
  upcase: string,
  downcase: string
}

export class Email {

  static validate(raw_email: string): Invalid_Email | Valid_Email {
    let email = raw_email.trim();
    if (email.length === 0)
      return {valid: false, msg: "empty"}
    if (email.length > 100)
      return {valid: false, msg: "too_long"}
    if (!is_email_valid(email))
      return {valid: false, msg: "invalid"}
    return {valid: true, msg: "valid"}
  } // === export

  readonly raw: string;
  readonly is_valid: boolean;
  readonly upcase: string;
  readonly downcase: string;
  readonly state: string;

  constructor(raw_email: string) {
    this.raw = raw_email.trim();
    const stat = Email.validate(this.raw);
    this.is_valid = stat.valid;
    this.state = stat.msg;
    this.upcase = this.raw.toUpperCase();
    this.downcase = this.raw.toLowerCase();
  }

  async upsert(db: D1Database): Promise<Email_Row | undefined> {
    if (!this.is_valid)
      return undefined;

    const inserted = await db.prepare(insert_email_sql).bind(this.upcase, this.downcase, this.raw).first();
    if (inserted)
      return inserted as Email_Row;

    const selected = await db.prepare(select_email_sql).bind(this.upcase, this.downcase).first();
    if (!selected)
      throw new Error(`Email not inserted: ${this.upcase} ${this.downcase}`)

    if (selected)
      return selected as Email_Row;
  } // === export
}
// === class
//

const THE_CODE_LENGTH = 6;
// const CODE_UNUSED = 0;
// const CODE_USED = 1;
// const CODE_MAX_USE = 4;

export class Login_Code {
  readonly code: string;
  readonly human: string;

  static get_email(db: D1Database, raw_code: string) {
    const code = raw_code.trim().toLocaleUpperCase();
    return db.prepare(`
      SELECT email, code
      FROM sessions INNER JOIN
           login_codes ON sessions.code_id = login_codes.id
           INNER JOIN
           email ON sessions.email_id = email.id
      WHERE code = ?;`).bind(code).first();
  }

  constructor() {
    this.code = crypto.randomUUID().replace(/[^0-9]+/g, '').substring(0,THE_CODE_LENGTH);
    this.human = this.code.split('').join(' ');
  }

  async upsert(db: D1Database, email: Email_Row) {
    /*
      * Find existing code.
      * If not found, create and insert new code.
      * Return code row.
      */
    const code_row = await db.prepare(insert_code_sql).bind(email.id, this.code).first();
    if (!code_row)
      throw new Error(`Code could not be inserted: ${email.upcase}/${email.downcase} -> ${this.code}`);
    return code_row;
  }

  db_save(db: D1Database) {
    return db.prepare(`INSERT INTO login_codes(code) VALUES (?1) RETURNINIG *;`).bind(this.code).first();
  }
}
// === class

