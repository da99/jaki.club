
import { EmailMessage } from 'cloudflare:email';
import { createMimeMessage } from "mimetext/browser";
// import type { ForwardableEmailMessage } from "cloudflare:email";

import { JAKI } from './jaki.mts';
import { Login_Code } from './LOGIN_CODE_DB.mts';

import PostalMime from 'postal-mime';
import type { Bindings, EmailMessageEvent } from '/apps/jaki.club/src/Base.mts';

export async function email(message: EmailMessageEvent, env: Bindings, _ctx: any) {

  const postal = await PostalMime.parse(message.raw);
  const subject = (postal.subject || '').trim().toUpperCase();
  const to      = (message.to).trim().toLocaleUpperCase();
  const from = postal.from.address;
  const db = env.LOGIN_CODE_DB;

  if (!JAKI.email.is_official(to))
    return message.setReject(`Unknown address: ${to}`);

  if (!from)
    return message.setReject(`Invalid from: address.`);

  if (subject != 'ENTER')
    return await reply(message, subject, `I am just a computer. I do not understand this command: ${subject}`);

  try {
    const email_row = await Login_Code.save_email(db, from);
    if (!email_row)
      return await reply(message, subject, `Server error. Please try again later.`);

    const login_code = new Login_Code();
    const code_row = await login_code.db_save(db, email_row['id'] as number);
    if (!code_row)
      return await reply(message, subject, `Server error in creating code. Please try again later.`)

    return await reply(message, subject, `Here are your codes:\nCode 1: ${from}\nCode 2: ${login_code.human}`)
  } catch (e) {
    console.error(e);
    return await reply(message, subject, `Server error in creating code. Please try again later.`)
  }
} // email

export async function old_email(message: EmailMessageEvent, env: Bindings, _ctx: any) {
  const postal = await PostalMime.parse(message.raw);
  const subject = (postal.subject || '').trim().toUpperCase();
  // const to      = (message.to).trim().toLocaleUpperCase();
  const from = postal.from.address;
  const db = env.LOGIN_CODE_DB;

  // Check if subject confirms to code.
  const code_row = await Login_Code.get(db, subject);
  if (!code_row) {
    return await reply(message, subject, `Login code does not exist: ${subject}. Start over.`);
  }

  if (Login_Code.is_expired(code_row['date_created'] as number))
    return await reply(message, subject, `Login code, ${subject}, expired. Start over.`);

  if (!from)
    return message.setReject(`Invalid from: address.`);
  const email_row = await Login_Code.save_email(db, from);
  if (!email_row)
    return await reply(message, subject, `Server error. Try again later.`);

  const session_row = await Login_Code.save_session(db, email_row['id'] as number, code_row['id'] as number);
  if (!session_row)
    return await reply(message, subject, `Server error. Try again later.`);
}

async function reply(message: EmailMessageEvent, subject: string, msg: string) {
  const new_msg = createMimeMessage();
  const jaki_from = message.to.trim();
  new_msg.setHeader('In-Reply-To', message.headers.get('Message-ID') || "0");
  new_msg.setSender({ name: "JAKI.club Computer", addr: jaki_from})
  new_msg.setRecipient(message.from);
  new_msg.setSubject(`Re: ${subject}`);
  new_msg.addMessage({
    contentType: 'text/plain',
    data: msg
  });
  console.log(`Email reply: ${jaki_from} -> ${message.from} : ${subject} : ${msg}`);
  const replyMessage = new EmailMessage( jaki_from, message.from, new_msg.asRaw());
  return message.reply(replyMessage);
}



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
