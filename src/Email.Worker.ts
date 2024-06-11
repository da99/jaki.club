
import { EmailMessage } from "cloudflare:email";
// import type { ForwardableEmailMessage } from "cloudflare:email";

import { createMimeMessage } from "mimetext/browser";
import PostalMime from 'postal-mime';
import type { Bindings, EmailMessageEvent } from '/apps/jaki.club/src/Base.mts';


export async function email(message: EmailMessageEvent, _env: Bindings, _ctx: any) {

  // TRIM and UPPERCASE subject.
  // trim and UPPERCASE to: address.
  //
  // check if previous code is in queue.
  //   if yes
  //     tell to check SPAM/inbox.
  //       RETURN
  //
  //  Check how many logins in the past 1 hr.
  //    if more than 3,
  //      Send message, timeout for 15 more minutes.
  //      RETURN
  //  Generate new code.
  //  Send code to FROM:
  //    include message: FROM, IP ADDRESS
  //
  // const staging_computer_email = 'enter@the-stage.jaki.club';

  const email = await PostalMime.parse(message.raw);
  const subject = (email.subject || '').trim().toUpperCase();
  // const to      = (message.to).trim().toUpperCase();
  // const from    = (message.from).trim();
  //
  // switch (to) {
  //   case 'ENTER@JAKI.CLUB':
  //   case 'ENTER@THE-STAGE.JAKI.CLUB':
  //     // Everything is ok. continue.
  //     break;
  // } // switch

  const x = 'x@jaki.club'
  const msg = createMimeMessage();
  const msg_id = message.headers.get("Message-ID") || "unknown";
  const created_at = message.headers.get("Date") || "unknown";

  msg.setHeader('In-Reply-To', msg_id);
  // msg.setSender({ name: (to.split('@')[0] || 'unknown').toUpperCase(), addr: message.to });
  msg.setSender({ name: "x", addr: x });
  msg.setRecipient(message.from);
  msg.setSubject(`Pong: Origin Subject: ${subject}`);
  const new_body = `You wrote: ${subject} @ ${created_at}   ID: ${msg_id}' }`
  msg.addMessage({
    contentType: 'text/plain',
    data: new_body
  });

  console.log(`Subject: ${subject} -- From: ${message.from} To: ${message.to} x: ${x} ${created_at}`)
  await message.reply(new EmailMessage(
    x,
    message.from,
    msg.asRaw()
  ));
  } // email
