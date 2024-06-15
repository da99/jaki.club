
import settings from "/apps/jaki.club/settings.json";

// export interface Env {
//   LOGIN_CODE_DB: D1Database
// }
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

export interface TryAgain {
  readonly status: 'try_again',
  readonly fields : {
    readonly wait: number
  }
}

export interface FieldsData {
    [index: string]: string | number,
}

export interface StatusOKData  {
  status: 'ok_data',
  fields: FieldsData
};

export interface StatusNotYet  {
  status: 'not_yet',
  fields: {
    seconds: number
  }
};

export const Status = {
  DB: { status: 'db_error' },
  OK: { status: 'ok' },
  Reset: { status: 'reset' },
  not_yet(x: number): StatusNotYet {
    return {status: 'not_yet', fields: {seconds: x}}
  },
  ok_data(x: FieldsData): StatusOKData {
    return {status: 'ok_data', fields: x};
  }
};


