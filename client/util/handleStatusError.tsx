import { API } from "@/api/client";
import ErrorMessage from "@/components/ErrorMessage";
import { AxiosRequestConfig } from "axios";

export const handleStatusError = (status: number = 1, reTry: () => void) => {
  let errorMessage = "";
  switch (status) {
    case 401:
      errorMessage = "인증이 만료되었습니다. 다시 로그인해주세요.";
      break;
    case 500:
      errorMessage = "서버 오류가 발생했습니다. 관리자에게 문의하세요.";
      break;
    default:
      errorMessage = "서버와 연결이 끊겼습니다. 잠시후 다시 시도해주세요.";
      break;
  }
  return <ErrorMessage message={errorMessage} onAction={reTry}></ErrorMessage>;
};

export const reTryAPI = async (
  originRequest?: AxiosRequestConfig,
): Promise<void> => {
  if (!originRequest) {
    // error.config가 undefined인 경우에 대한 처리를 추가
    throw new Error("재시도를 위한 설정이 없습니다.");
  }
  const updateRequest: AxiosRequestConfig = {
    ...originRequest,
    headers: {
      ...originRequest.headers,
      Retry: "true",
    },
  };
  return await API.request(updateRequest);
};
