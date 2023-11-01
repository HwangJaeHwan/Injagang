import axios, { AxiosRequestConfig } from "axios";
import { SERVER } from "./config";
import Cookies from "js-cookie";
import { error } from "console";
import { ERROR_MESSAGES } from "@/constants";
import Router from "next/router";
import { tokenReissueAPI } from "./AUTH/authAPI";
export const API = axios.create({
  baseURL: SERVER,
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use(
  config => {
    if (Cookies.get("accessToken")) {
      config.headers.Authorization = Cookies.get("accessToken");
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

API.interceptors.response.use(
  response => response,
  async error => {
    if (!error.response) {
      console.log("내가 만든 오류",serverDisconnected(error.message))
      throw serverDisconnected(error.message);
    }
    const originRequest = error.response;
    const errorMessage = originRequest.data.message;
    if (originRequest.status === 401) {
      handleErrorMessage(errorMessage, originRequest.config);
    }
    return Promise.reject(error);
  },
);

const handleErrorMessage = (
  message: string,
  originRequest: AxiosRequestConfig,
) => {
  message === ERROR_MESSAGES.JWT_EXPIRED
    ? jwtExpired(message, originRequest)
    : unauthorized();
};

const unauthorized = () => {
  // Router.replace("/login");
  return;
};

const serverDisconnected = (message: string) => {
  return message === "Network Error"
    ? new Error("서버와 연결이 끊겼습니다. 잠시후 다시시도해주세요.")
    : new Error("원인 파악이 불명한 에러가 발생했습니다.");
};


const jwtExpired = async (
  message: string,
  originRequest: AxiosRequestConfig,
) => {
  try {
    const response = await tokenReissueAPI();
    if (response) {
      const { access } = response.data;
      Cookies.set("accessToken", access);
      reRequest(originRequest);
    }
    return;
  } catch (error: any) {
    const errorMessage = error.response?.data?.message;
    errorMessage && unauthorized();
  }
};

const reRequest = async (originRequest: AxiosRequestConfig) => {
  return await API.request(originRequest);
};

export enum METHOD {
  GET = "get",
  POST = "post",
  PUT = "put",
  PATCH = "patch",
  DELETE = "delete",
}

/**AXIOS를 좀더 오류 없이 사용하기위한 역할, GIT에 서버정보 노출을 방지하기위한역할 */
export const fetcher = async (
  method: METHOD,
  url: string,
  ...rest: { [key: string]: any }[]
) => {
  const res = await API[method](url, ...rest);
  return res;
};
