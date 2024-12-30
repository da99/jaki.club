#!/usr/bin/env bun

var runtime = 'server';
var site_name = 'jAkI.CLUB';

if (import.meta.main) {
  switch(Bun.argv[2]) {
    case '-h':
    case 'help':
      console.log('settings (server|www) (jaki.club|...)')
      process.exit(0)
      break;
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

export const SETTINGS = {
  "IS_DEV": false,
  "BUILD_TARGET": "prod",
  "DOMAIN": site_name.toLowerCase(),
  "SITE_NAME": site_name,
  "DEV_PORT": 4567,
  "STATIC_PORT": 4568,
  "STATIC_DIR": "public",
  "BUILD_CMD": "bin/__ build",
  "BUILD_CMD_DEV": "bin/__ dev build",
  "BUILD_DIR": "build",
  "STATIC_URL": "https://static.jaki.club",
    "BUCKET_NAME": "jaki",
  "STORAGE_API_URL": "https://9c4dc75e07b3fd04442ceac71a2532be.r2.cloudflarestorage.com/jaki",
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
