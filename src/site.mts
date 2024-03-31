
export const SITE_NAME = "jAki.CLUB";
import { element as E } from '/apps/html.js/src/bsr.mts';


export function default_head(section: string, title: string) {
  return E('head',
           E('meta', {charset: "utf-8"}),
           E('meta', {name: "viewport", content: "width=device-width, initial-scale=1"}),
           E('title', title),
           E('link', {rel: "stylesheet", href:"/styles/reset.css" }),
           E('link', {rel: "stylesheet", href:"/styles/pure.css" }),
           E('link', {rel: "stylesheet", href:`/section/${section}/index.css` }),
          );
};
