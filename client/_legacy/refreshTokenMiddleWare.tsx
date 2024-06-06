import Router from "next/router";

import { Middleware } from "redux";

import axios from "axios";

import Cookies from "js-cookie";

import fetcher, { METHOD } from "@/util/fecher";;

const refreshTokenMiddleWare: Middleware =
  ({ dispatch, getState }) =>
  next =>
  async action => {
    const result = next(action);
    //API를 요청하는 도중 오류가 발생 했을시 캐치
    if (action.type.endsWith("_FAILURE")) {
      const whoisAction = action.type.split("_")[0];
      const message = action.payload.error.response.data.message;
      const { config } = action.payload.error.response;
      //토큰은 존재하나 로그아웃이 처리가 완료되었거나 토큰을 상실한 유저는 다시 login 페이지
      if (message === "해당하는 유저를 찾을 수 없습니다.") {
        Router.replace("/login");
        return result;
      }
      if (message === "권한이 없습니다. ") {
        Router.replace("/login");
        return result;
      }
      // JWT토큰이 만료된 유저는 Refresh토큰을 요청
      if (message === "JWT가 만료되었습니다.") {
        console.log("동작");
        try {
          const data = {
            access: Cookies.get("accessToken"),
            refresh: Cookies.get("refreshToken"),
          };
          const response = await fetcher(METHOD.POST, "/reissue", data);
          if (response) {
            const { access } = response.data;
            Cookies.set("accessToken", access);
            action.payload.error.config.headers.Authorization = access;
            const request = await axios.request(config);
            console.log({ access });
            console.log(Cookies.get("accessToken"));
          }
        } catch (error: any) {
          const message = error.response?.data?.message;
          if (message === "Refresh 토큰이 만료되었습니다.") {
            //리프레시 토큰 로그인 페이지로 보내기
            //로그인 페이지로 보내기
            console.log("리프레시토큰이 만료되었다.");
            Router.replace("/login");
          }
          dispatch({ type: action.type, payload: { error } });
        }
      }
    }
    return result; // 여기서 반환하는 값은 dispatch(action)의 결과물이 됩니다. 기본: undefined
  };

export default refreshTokenMiddleWare;
