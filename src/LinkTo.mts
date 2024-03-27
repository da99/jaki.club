// import {
//   env,
// } from 'node:process';
declare let process: any;

let remote_href = "https://something/wrong";
const E = (process as object);
let IS_DEV = typeof process === 'object' && process.env.IS_DEV === 'YES';
let PUBLIC_URL = '4567';
if (IS_DEV) {
  PUBLIC_PORT = process.env.PUBLIC_PORT || '4567';
}

function local_link(sPath: string) {
  return `${PUBLIC_PORT || '4567'}${sPath}`;
}

function remote_link(sPath: string) {
  return `${remote_href}${sPath}`;
}


export function set_remote(sURL: string) {
  remote_href = sURL;
  return remote_href;
}

export const link_to = (IS_DEV) ? local_link : remote_link;

