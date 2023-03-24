import Cookies from "js-cookie";
import { Middleware } from "redux";
import fetcher, { METHOD } from "../test/fecher";

export const refreshTokenMiddleWare: Middleware =
  ({ dispatch, getState }) =>
  next =>
  async action => {
    try {
      return await next(action);
    } catch (error: any) {
      if (error.response.message.trim() === "JWT가 만료되었습니다.") {
        const access = Cookies.get("accessToken");
        const refresh = Cookies.get("refreshToken");
        const data = {
          access,
          refresh,
        };
        try {
          const response = await fetcher(METHOD.POST, "/reissue", data);
          if(response){
            Cookies.set('accessToken', response.data.access)
            Cookies.set('refreshToken', response.data.access)
          }
          {}
        } catch (error) {}
      }
    }
  };
