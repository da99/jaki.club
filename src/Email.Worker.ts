
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

  switch (to) {
    case 'ENTER@JAKI.CLUB':
    case 'ENTER@THE-STAGE.JAKI.CLUB':
      true; // Everything is ok. continue.
      break;
    default:
      return message.setReject(`Unknown address: ${to}`);
  } // switch

  if (!from)
    return message.setReject(`Invalid from: address.`);

  // Check if subject confirms to code.
  if (!JAKI.is_valid_code(subject)) {
    return message.setReject(`A valid code must be the subject line.`);
  }

  // Lookup code in database.
  const result = await Login_Code.get_email(env.LOGIN_CODE_DB, from);

  if (!result)
    return message.setReject(`Login code does not exist: ${subject}. Start over.`);

  if (Login_Code.is_expired(result['date_created'] as number)) {
     return message.setReject(`Login code is expired. Start over.`);
  }
 
  await Login_Code.accept(env.LOGIN_CODE_DB, result['session_id'] as number);
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
