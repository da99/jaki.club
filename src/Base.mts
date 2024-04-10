
declare let process: any;
import settings from "/apps/jaki.club/settings.json";
settings['IS_DEV'] = ['yes', 'YES', 'IS_DEV'].includes(typeof process === 'object' && process.env.IS_DEV);
if (typeof process === 'object' && process.env.BUILD_TARGET === "dev")
  settings['build_target'] = 'dev';


export const SETTINGS = settings;
