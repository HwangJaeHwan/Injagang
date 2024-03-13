import Cookies from "js-cookie";

import { fetcher, METHOD } from "../client";
import { AUTH_APIS } from "../config"; 

import {
  ISignin,
  ISignup,
  ICheckOut,
  ChangeNick,
  IChangePw,
} from "@/types/auth/AuthType";


export const authInfoAPI = async () => {
  return fetcher(METHOD.GET, AUTH_APIS.INFO_API);
};

export const loginAPI = async (loginData: ISignin) => {
  return fetcher(METHOD.POST, AUTH_APIS.SIGNIN_API, loginData);
};

export const checkOutAPI = async (checkOutData: ICheckOut) => {
  return fetcher(METHOD.POST, AUTH_APIS.LOGOUT_API, checkOutData);
};

export const nickChangeAPI = async (changeData: ChangeNick) => {
  return fetcher(METHOD.PATCH, AUTH_APIS.NICK_CHNAGE_API, changeData);
};

export const passwordChangeAPI = async (changePwData: IChangePw) => {
  return fetcher(METHOD.PATCH, AUTH_APIS.PASSWORD_CHAGNE_API, changePwData);
};

export const signupAPI = async (signupData: ISignup) => {
  return fetcher(METHOD.POST, AUTH_APIS.SIGNUP_API, signupData);
};

export const tokenReissueAPI = async () => {
  return fetcher(METHOD.POST, AUTH_APIS.TOKKEN_REISSUE_API, {
    access: Cookies.get("accessToken"),
    refresh: Cookies.get("refreshToken"),
  });
};
