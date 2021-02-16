export enum HTTP_METHODS {
  POST = "post",
  GET = "get",
  PUT = "put",
  PATCH = "patch",
  DELETE = "delete"
}

export const inBody: any = { in: ["body"] };
export const inParam: any = { in: ["params"] };
export const inQuery: any = { in: ["query"] };

export enum VARCHAR_STR {
  MAX_LENGTH = 255,
  MIN_LENGTH = 10,
};

export const saltRounds = 10;
export const SECRET_KEY = 'SAMPLE_SECRET_KEY';

export enum E_CsvJobStatus {
  GENERATING = 0,
  SUCCESS = 1,
  FAILED = 2
}


export enum E_CsvJobStatusMsg {
  GENERATING = 'GENERATING',
  SUCCESS = 'SUCCESS',
}