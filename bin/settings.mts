#!/usr/bin/env bun

export const SETTINGS = {
  "IS_DEV": false,
  "BUILD_TARGET": "prod",
  "DOMAIN": "jaki.club",
  "SITE_NAME": "jAkI.CLUB",
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
      console.log(SETTINGS)
      break;
    default:
      process.exit(2)
  }
}
