
// import { EmailMessage } from 'cloudflare:email';
// import type { ForwardableEmailMessage } from "cloudflare:email";

import PostalMime from 'postal-mime';
import type { Bindings, EmailMessageEvent } from '/apps/jaki.club/src/Base.mts';

export async function email(message: EmailMessageEvent, _env: Bindings, _ctx: any) {

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

  // Check if subject confirms to code.
  // if not
  //    return reject: Only code subjects allowed.
  // Lookup code in database.
  // if not found:
  //    return reject: Code not found.
  // if expired:
  //    return reject: Code has expired.
  // Update code: accepted
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
