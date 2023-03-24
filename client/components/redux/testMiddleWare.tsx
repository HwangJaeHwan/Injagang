import { Middleware } from "redux";
const myLogger: Middleware =
  ({ dispatch, getState }) =>
  next =>
  async action => {
    if(action.type.endsWith('_FAILURE')){
        console.log("MiddleWare53452", action); // 먼저 액션을 출력합니다.
        const { headers, method, url, data } =action.payload.error.response.config
        console.log(headers, method, url, data)
        console.log(next(action))
    }
    try {
    } catch (error: any) {
      console.log("ERROR", action);
    }
    const result = next(action); // 다음 미들웨어 (또는 리듀서) 에게 액션을 전달합니다.
    return result; // 여기서 반환하는 값은 dispatch(action)의 결과물이 됩니다. 기본: undefined
  };

export default myLogger;
