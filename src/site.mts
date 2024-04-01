
declare let process: any;
export const SITE_NAME = "jAki.CLUB";
export const DEV_PORT = 4567;
export const IS_DEV = ['yes', 'YES', 'IS_DEV'].includes(typeof process === 'object' && process.env.IS_DEV);
export const REMOTE_URL = 'https://not.yet.ready/static';
export const LOCAL_URL = `http://localhost:${DEV_PORT}`;
