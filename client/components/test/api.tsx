import { METHOD } from "@/components/test/fecher";
import { useRouter } from "next/router";
import fetcher from "@/components/test/fecher";
import Cookies from "js-cookie";
import { METHODS } from "http";

interface getToken {
  loginId: string;
  password: string;
}

interface signUp {
  loginId: string;
  password: string;
  email: string;
  nickname: string;
}

const headers = {
  Authorization: Cookies.get("jwtToken"),
};

export const getToken = async (data: getToken) => {
  try {
    const response = await fetcher(METHOD.POST, "/login", data);
    if (response) {
      const token = response.data.jws;
      Cookies.set("jwtToken", token, { expires: 1 });
    }
  } catch (error) {
    console.error(error);
  }
};

export const joinRequest = async (data: signUp) => {
  try {
    const response = await fetcher(METHOD.POST, "/signup", data);
    if (response) {
      return response;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getTemplateList = async () => {
  try {
    const response = await fetcher(METHOD.GET, "/template", { headers });
    if (response) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};
