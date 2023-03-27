import axios from "axios";
import Cookies from "js-cookie";
import { Middleware } from "redux";
import fetcher, { METHOD } from "../test/fecher";
import Router from "next/router";
import {
  clearAuthError
} from "@/components/redux/Auth/actions";
import { CLEAR_ERROR } from "./Auth/types";



const refreshTokenMiddleWare: Middleware =
  ({ dispatch, getState }) =>
  next =>
  async action => {
    const result = next(action); 
    if (action.type.endsWith("_FAILURE")) {
      const whoisAction = action.type.split("_")[0];
      const message = action.payload.error.response.data.message;
      const { config } = action.payload.error.response;
      if (message === "해당하는 유저를 찾을 수 없습니다."){
        Router.replace('/login')
        return result
      }
      if (message.trim() === "JWT가 만료되었습니다.") {
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
            action.payload.error.config.headers.Authorization =
            Cookies.get("accessToken");
            const request = await axios.request(config)
          }
        } catch (error: any) {
          const message = error.response?.data?.message
          console.log("Refresh토큰 만료")
          if(message.trim() === 'Refresh 토큰이 만료되었습니다.'){
            //리프레시 토큰 로그인 페이지로 보내기
            //로그인 페이지로 보내기
            console.log('토큰이 만료되었다.')
            Router.replace('/login')
          }
          dispatch({ type: action.type, payload: { error } });
        }
      }
    }
    return result; // 여기서 반환하는 값은 dispatch(action)의 결과물이 됩니다. 기본: undefined
  };

export default refreshTokenMiddleWare;
