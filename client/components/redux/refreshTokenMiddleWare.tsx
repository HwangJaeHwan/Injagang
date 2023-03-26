import axios from "axios";
import Cookies from "js-cookie";
import { Middleware } from "redux";
import fetcher, { METHOD } from "../test/fecher";
import Router from "next/router";
import Modal from "../UI/Modal";



const refreshTokenMiddleWare: Middleware =
  ({ dispatch, getState }) =>
  next =>
  async action => {
    if (action.type.endsWith("_FAILURE")) {
      const whoisAction = action.type.split("_")[0];
      const message = action.payload.error.response.data.message;
      const { config } = action.payload.error.response;
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
          }
          action.payload.error.config.headers.Authorization =
          Cookies.get("accessToken");
          const request = await axios.request(config)
        } catch (error: any) {
          const message = error.response?.data?.message
          if(message === 'Refresh 토큰이 만료되었습니다.'){
            //리프레시 토큰 로그인 페이지로 보내기
            //로그인 페이지로 보내기
            Router.replace('/login')
          }
          dispatch({ type: action.type, payload: { error } });
        }
      }
    }
    const result = next(action); 
    return result; // 여기서 반환하는 값은 dispatch(action)의 결과물이 됩니다. 기본: undefined
  };

export default refreshTokenMiddleWare;
