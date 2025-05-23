
import settings from "../build/settings.json";

export const SETTINGS = settings;

export type Bindings = {
  IS_DEV: | string,
  IS_PROD: | string,
  IS_STAGE: | string
}

export interface TryAgain {
  readonly status: 'try_again',
  readonly data : {
    readonly wait: number
  }
}

export interface FieldsData {
    [index: string]: string | number,
}

export interface StatusOKData  {
  status: 'ok_data',
  data: FieldsData
};

export interface StatusNotYet  {
  status: 'not_yet',
  data: {
    seconds: number
  }
};

export const Status = {
  DB: { status: 'db_error' },
  OK: { status: 'ok' },
  Reset: { status: 'reset' },
  not_yet(x: number): StatusNotYet {
    return {status: 'not_yet', data: {seconds: x}};
  },
  ok_data(x: FieldsData): StatusOKData {
    return {status: 'ok_data', data: x};
  },

  invalid(x: FieldsData) {
    return {status: 'invalid', data: x}
  }
};


