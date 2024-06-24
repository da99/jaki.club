
// import { EmailMessage } from 'cloudflare:email';
// import type { ForwardableEmailMessage } from "cloudflare:email";

import { JAKI } from './jaki.mts';
import { Login_Code } from './LOGIN_CODE_DB.mts';

import PostalMime from 'postal-mime';
import type { Bindings, EmailMessageEvent } from '/apps/jaki.club/src/Base.mts';

export async function email(message: EmailMessageEvent, env: Bindings, _ctx: any) {

  const email = await PostalMime.parse(message.raw);
  const subject = (email.subject || '').trim().toUpperCase();
  const to      = (message.to).trim().toLocaleUpperCase();
  const from = email.from.address;
  const db = env.LOGIN_CODE_DB;

  if (!JAKI.email.is_official(to))
      return message.setReject(`Unknown address: ${to}`);

  if (!from)
    return message.setReject(`Invalid from: address.`);

  // Check if subject confirms to code.
  const code_row = await Login_Code.get(db, subject);
  if (!code_row)
    return message.setReject(`Login code does not exist: ${subject}. Start over.`);

  if (Login_Code.is_expired(code_row['date_created'] as number))
    return message.setReject(`Login code is expired. Start over.`);

  const email_row = await Login_Code.save_email(db, from);
  if (!email_row)
    return message.setReject(`Server error. Try again later.`);

  const session_row = await Login_Code.save_session(db, email_row['id'] as number, code_row['id'] as number);
  if (!session_row)
    return message.setReject(`Server error. Try again later.`);
} // email



// import { createMimeMessage } from 'mimetext/browser';
// Creating a message
  // const x = 'x@jaki.club'
  // const msg = createMimeMessage();
  // const msg_id = message.headers.get("Message-ID") || "unknown";
  // const created_at = message.headers.get("Date") || "unknown";
  //
  // msg.setHeader('In-Reply-To', msg_id);
  // // msg.setSender({ name: (to.split('@')[0] || 'unknown').toUpperCase(), addr: message.to });
  // msg.setSender({ name: "x", addr: x });
  // msg.setRecipient(message.from);
  // msg.setSubject(`Pong: Origin Subject: ${subject}`);
  // const new_body = `You wrote: ${subject} @ ${created_at}   ID: ${msg_id}' }`
  // msg.addMessage({
  //   contentType: 'text/plain',
  //   data: new_body
  // });
  //
  // console.log(`Subject: ${subject} -- From: ${message.from} To: ${message.to} x: ${x} ${created_at}`)
  // await message.reply(new EmailMessage(
  //   x,
  //   message.from,
  //   msg.asRaw()
  // ));
