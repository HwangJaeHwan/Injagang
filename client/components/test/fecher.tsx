import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080";
export enum METHOD {
  GET = "get",
  POST = "post",
  PUT = "put",
  DELETE = "delete",
}

const fetcher = async (
  method: METHOD,
  url: string,
  ...rest: { [key: string]: any }[]
) => {
  const res = await axios[method](url, ...rest);
  return res;
};

export default fetcher;
