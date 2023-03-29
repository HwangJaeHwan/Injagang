import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080";
export enum METHOD {
  GET = "get",
  POST = "post",
  PUT = "put",
  PATCH = "patch",
  DELETE = "delete",
}

/**AXIOS를 좀더 오류 없이 사용하기위한 역할, GIT에 서버정보 노출을 방지하기위한역할 */
const fetcher = async (
  method: METHOD,
  url: string,
  ...rest: { [key: string]: any }[]
) => {
  const res = await axios[method](url, ...rest);
  return res;
};

export default fetcher;
