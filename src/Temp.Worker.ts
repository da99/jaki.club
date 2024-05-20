
import { EmailMessage } from "cloudflare:email";
// import type { ForwardableEmailMessage } from "cloudflare:email";

import { createMimeMessage } from "mimetext/browser";
import PostalMime from 'postal-mime';
import type { Bindings, EmailMessageEvent } from '/apps/jaki.club/src/Base.mts';

export default {

  async fetch(req: Request, _env: Bindings, _ctx: any) {
    return new Response(`Not found: ${req.url}`, { status: 404, statusText: "Not Found"});
  }, // fetch

  async email(message: EmailMessageEvent, _env: Bindings, _ctx: any) {

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
    const staging_computer_email = 'computer@the-stage.jaki.club';

    const email = await PostalMime.parse(message.raw);
    const subject = (email.subject || '').trim().toUpperCase();
    const to      = (message.to).trim().toUpperCase();
    const from    = (message.from).trim();

    switch (to) {
      case 'enter@jaki.club':
      case 'enter@the-stage.jaki.club':
        // Everything is ok. continue.
        break;

      default:
        // FORWARD this message to errors @ jaki.club
        return;
    } // switch

    const msg = createMimeMessage();
    const msg_id = message.headers.get("Message-ID") || "unknown";
    msg.setHeader('In-Reply-To', msg_id);
    msg.setSender({ name: (to.split('@')[0] || 'unknown').toUpperCase(), addr: to });
    msg.setRecipient(message.from);
    msg.setSubject(`Pong: Origin Subject: ${email.subject}`);
    msg.addMessage({
      contentType: 'text/plain',
      data: `You wrote: ${ email.text || '[NOTHING]' }`
    });

    await message.reply(new EmailMessage(
      message.to,
      message.from,
      msg.asRaw()
    ));
  } // email

} // export
