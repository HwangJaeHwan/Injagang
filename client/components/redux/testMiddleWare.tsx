import axios from "axios";
import Cookies from "js-cookie";
import { Middleware } from "redux";
import fetcher, { METHOD } from "../test/fecher";
const myLogger: Middleware =
  ({ dispatch, getState }) =>
  next =>
  async action => {
    if (action.type.endsWith("_FAILURE")) {
      const whoisAction = action.type.split('_')[0]
      console.log("MiddleWare", action); // 먼저 액션을 출력합니다.
      const message = action.payload.error.response.data.message;
      const { method, url, data } = action.payload.error.response.config;
      if (message.trim() === "JWT가 만료되었습니다.") {
        console.log("동작");
        try {
          const data = {
            access: Cookies.get("accessToken"),
            refresh: Cookies.get("refreshToken"),
          };
          const response = await fetcher(METHOD.POST, "/reissue", data);
          if (response) {
            console.log("responseDATAresponseDATAresponseDATAresponseDATA",response.data)
            const { access } = response.data;
            console.log(access)
            Cookies.set("accessToken", access);
          }
          console.log(action.payload.error.response.config)
          action.payload.error.config.headers.Authorization = Cookies.get('accessToken')
          const request = await axios.request(action.payload.error.config)
          if(request){
            console.log("asdfasfdasdfsafdasn fkjsavbasdbvjolsadv ljn lk")
          }
        } catch (error: any) {
          dispatch({ type: action.type, payload: { error } });
        }
      }
    }
    const result = next(action); // 다음 미들웨어 (또는 리듀서) 에게 액션을 전달합니다.
    console.log("next 액션", result);
    return result; // 여기서 반환하는 값은 dispatch(action)의 결과물이 됩니다. 기본: undefined
  };

export default myLogger;
