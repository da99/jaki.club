
declare let process: any;
import settings from "/apps/jaki.club/settings.json";
settings['IS_DEV'] = ['yes', 'YES', 'IS_DEV'].includes(typeof process === 'object' && process.env.IS_DEV);


export const SETTINGS = settings;
