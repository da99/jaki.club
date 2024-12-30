#!/usr/bin/env bun

var runtime = 'server';

if (import.meta.main) {
  switch(Bun.argv[2]) {
    case '-h':
    case 'help':
      console.log('settings (server|www) (jaki.club|...)')
      process.exit(0)
    case 'server':
      true;
      break;
    case 'www':
      runtime = 'www';
      break;
    default:
      console.error(`!!! Unknown arguments: ${Bun.argv[2]}`);
      process.exit(2);
  }

  switch (Bun.argv[3] || 'ignore') {
    case 'jaki.club':
    case '':
      true;
      break;
    default:
      site_name = Bun.argv[3];
  } // switch
} // if main

function get(key: string, other: string): string {
  if (process.env[key])
    return process.env[key] as string;

  return other;
}

function get_or_raise(key: string) {
  if (process.env[key])
    return process.env[key];

  console.error(`!!! Key not found: ${key}`);
  process.exit(2);
}

var site_name = get('SITE_NAME', 'jAkI.CLUB');
export const SETTINGS = {
  "IS_DEV": false,
  "BUILD_TARGET": "prod",
  "SITE_NAME": site_name,
  "DOMAIN": site_name.toLowerCase(),
  "DEV_PORT": 4567,
  "STATIC_PORT": 4568,
  "STATIC_DIR": "public",
  "BUILD_CMD": "bin/__ build",
  "BUILD_CMD_DEV": "bin/__ dev build",
  "BUILD_DIR": "build",
  "STATIC_URL": get_or_raise('STATIC_URL'),
  "BUCKET_NAME": "jaki",
  "STORAGE_API_URL": get_or_raise('STORAGE_API_URL'),
  "LOGIN_WAIT_TIME": 5,
  "LOGIN_CODE_LENGTH": 8
};

if (import.meta.main) {
  switch(Bun.argv[2]) {
    case 'server':
      console.log(SETTINGS)
      break;
    case 'www':
      console.log({
        "DOMAIN": SETTINGS.DOMAIN,
        "SITE_NAME": SETTINGS.SITE_NAME,
        "STATIC_URL": SETTINGS.STATIC_URL,
        "LOGIN_WAIT_TIME": SETTINGS.LOGIN_WAIT_TIME,
        "LOGIN_CODE_LENGTH": SETTINGS.LOGIN_CODE_LENGTH
      });
      break;
    default:
      process.exit(2)
  }
}
