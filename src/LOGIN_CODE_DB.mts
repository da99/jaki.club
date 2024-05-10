
import type { Bindings } from '/apps/jaki.club/src/Base.mts';
import select_email_sql from '../d1/select_email.sql';
import insert_email_sql from '../d1/insert_email.sql';
import insert_code_sql from '../d1/insert_code.sql';
import update_code_sql from '../d1/update_code.sql';
import update_tries_sql from '../d1/update_tries.sql';
import { is_email_valid } from '/apps/www/src/base.mts';

export type Invalid_Email = {
  valid: false,
  value: string | {upcase: string, downcase: string},
  msg: "empty" | "invalid" | "too_long"
};

export type Valid_Email = {
  valid: true,
  value: {upcase: string, downcase: string},
  msg: "valid"
};

export type Email_Row = {
  id: number,
  upcase: string,
  downcase: string
}

export function validate_email(raw_email: string): Invalid_Email | Valid_Email {
  let email = raw_email.trim();
  if (email.length === 0)
    return {valid: false, value: email, msg: "empty"}
  if (email.length > 100)
    return {valid: false, value: email, msg: "too_long"}
  if (!is_email_valid(email))
    return {valid: false, value: email, msg: "invalid"}
  return {valid: true, value: {upcase: email.toUpperCase(), downcase: email.toLowerCase()}, msg: "valid"}
} // === export

export async function upsert_email(db: D1Database, email_stat: Valid_Email): Promise<Email_Row | undefined> {
  const {upcase, downcase} = email_stat.value;
  const inserted = await db.prepare(insert_email_sql).bind(upcase, downcase).first();
  if (inserted)
    return inserted as Email_Row;

  const selected = await db.prepare(select_email_sql).bind(upcase, downcase).first();
  if (!selected)
    throw new Error(`Email not inserted: ${upcase} ${downcase}`)

  if (selected)
    return selected as Email_Row;
} // === export

export async function upsert_code(db: D1Database, email: Email_Row, code: string) {
  /*
    * Find existing code.
    * If not found, create and insert new code.
    * Return code row.
    */
  const code_row = await db.prepare(insert_code_sql).bind(email.id, code).first();
  if (!code_row)
    throw new Error(`Code could not be inserted: ${email.upcase}/${email.downcase} -> ${code}`);
  return code_row;
}

