
import { EmailMessage } from "cloudflare:email";
// import type { ForwardableEmailMessage } from "cloudflare:email";
import { createMimeMessage } from "mimetext/browser";
import PostalMime from 'postal-mime';
import type { Bindings, EmailMessageEvent } from '/apps/jaki.club/src/Base.mts';

export default {
  async fetch(req: Request, _env: Bindings, _ctx: any) {
    return new Response(`Not found: ${req.url}`, { status: 404, statusText: "Not Found"});
  },

  async email(message: EmailMessageEvent, _env: Bindings, _ctx: any) {

    const computer_email = 'computer@jaki.club';
    const email = await PostalMime.parse(message.raw);

    const msg = createMimeMessage();
    const msg_id = message.headers.get("Message-ID") || "unknown";
    msg.setHeader("In-Reply-To", msg_id);
    msg.setSender({ name: "The Computer", addr: computer_email });
    msg.setRecipient(message.from);
    msg.setSubject(`Pong: Origin Subject: ${email.subject}`);
    msg.addMessage({
      contentType: 'text/plain',
      data: `You wrote: ${ email.text || "unknown" }`
    });

    const replyMessage = new EmailMessage(
      computer_email,
      message.from,
      msg.asRaw()
    );

    await message.reply(replyMessage);
  }
}
