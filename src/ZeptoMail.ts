
import { domain, site_name } from "../tmp/settings.json";

export async function send_via_zepto(to_email: string, body: string) {
  return fetch(
    "https://api.zeptomail.com/v1.1/email", {
    "method": "POST",
    "cache": "no-cache",
    "headers": {
      "Accept": "application/json",
      "Authorization":  process.env['ZEPTO_KEY'] || '[none]',
    },
    "body": JSON.stringify({
      from: {"address": `do-not-reply@${domain}`, name: `The ${site_name} Computer`},
      to: [{"email_address": {"address": to_email}}],
      subject: "OTP log-in",
      htmlbody: body
    })
    }
  );
} // === export async function
