export const API_PREFIX = "/api";

export const SUCCESS_CODE = 200;
export const SUCCESS_FLAG = "SUCCEED";
export const FAILED_FLAG = "FAILED";

export const LOGIN_TIP = "权限异常，请稍后再试";
export const NETWORK_ERROR_TIP = "网络异常，请稍后再试";

export interface ResponseData {
  errorMessage: string;
  errorCode: number;
  status: string;
}
