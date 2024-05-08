
import settings from "/apps/jaki.club/settings.json";

export interface Env {
  LOGIN_CODE_DB: D1Database
}
export const SETTINGS = settings;

export type Bindings = {
  IS_DEV: | string,
  IS_PROD: | string,
  LOGIN_CODE_DB: D1Database
}
