
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

export interface EmailMessageEvent {
  readonly from: string;
  readonly to: string;
  readonly headers: Headers;
  readonly raw: ReadableStream;
  readonly rawSize: number;

  constructor(from: string, to: string, raw: ReadableStream | string): EmailMessage;

  setReject(reason: string): void;
  forward(rcptTo: string, headers?: Headers): Promise<void>;
  reply(message: EmailMessage): Promise<void>;
}

