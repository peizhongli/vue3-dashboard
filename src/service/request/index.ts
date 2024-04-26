import {
  API_PREFIX,
  LOGIN_TIP,
  NETWORK_ERROR_TIP,
  SUCCESS_CODE,
} from "./constant";

interface info {
  token: string;
  vin?: string[];
  mobile?: string;
}

export interface CustomWindow extends Window {
  info?: info;
}

interface errorMessage {
  message: string;
}

export interface getParams {
  [key: string]: string;
}

export interface postParams {
  [key: string]: BodyInit;
}

declare const window: CustomWindow;

const getPath = (api: string) =>
  api.startsWith("/") ? `${API_PREFIX}${api}` : api;

export const $fetch = async (api: string, options: RequestInit = {}) => {
  // 设置超时
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10 * 1000);
  try {
    const response = await fetch(api, {
      headers: {
        ["content-type"]: "application/json",
      },
      signal: controller.signal,
      ...options,
    });
    const { status } = response;
    if (status === SUCCESS_CODE) {
      return response.json();
    }
    // 只有200才算作成功，其它都当作异常
    throw new Error(`${status}`);
  } catch (error) {
    const { message } = error as errorMessage;
    console.log("error", message);
    return {
      // 如果为401则返回登录话术，其他异常返回网络错误
      errorMessage: +message === 401 ? LOGIN_TIP : NETWORK_ERROR_TIP,
    };
  } finally {
    clearTimeout(timeoutId);
  }
};

export const $get = (api: string, params: getParams = {}) => {
  const queryArr = Object.entries(params).map(([k, v]) => `${k}=${v}`);
  const queryStr = queryArr.length ? `?${queryArr.join("&")}` : "";
  return $fetch(`${getPath(api)}${queryStr}`);
};

export const $post = (api: string, params: postParams = {}) => {
  return $fetch(getPath(api), {
    method: "POST",
    body: JSON.stringify(params),
  });
};
