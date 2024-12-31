#!/usr/bin/env bun



function get(key: string, other: string): string {
  if (process.env[key])
    return process.env[key] as string;

  return other;
}

// function get_or_raise(key: string) {
//   if (process.env[key])
//     return process.env[key];
//
//   console.error(`!!! Key not found: ${key}`);
//   process.exit(2);
// }

const SITE_NAME = get('SITE_NAME', 'jAkI.CLUB');

const SETTINGS = {
  "BUILD_TARGET": "production",
  "SITE_NAME": SITE_NAME,
  "DOMAIN": SITE_NAME.toLowerCase(),
  "STATIC_DIR": "public",
  "BUILD_CMD": "bin/__ build",
  "BUILD_DIR": "build",
  "STATIC_URL": get('STATIC_URL', 'https://static.jaki.club'),
  "LOGIN_WAIT_TIME": 5,
  "LOGIN_CODE_LENGTH": 8
};

switch(Bun.argv[2]) {
  case 'client':
    console.log(JSON.stringify(SETTINGS));
    break;
  case 'get':
    const k = Bun.argv[3];
    if (Object.hasOwn(SETTINGS, k)) {
      console.log(SETTINGS[k as keyof typeof SETTINGS]);
      process.exit(0);
    }
    console.error(`!!! Key not found in SETTINGS: ${k}`);
    process.exit(2);
  default:
    console.error(`!!! Unknown arguments for ${import.meta.file}: ${Bun.argv[2]}`);
    process.exit(2);
}
