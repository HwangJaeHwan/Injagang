import ErrorMessage from "@/components/ErrorMessage";

export const handleStatusError = (status: number = 1) => {
  let errorMessage = "";
  switch (status) {
    case 401:
      errorMessage = "인증에 실패했습니다. 다시 로그인해주세요.";
      break;
    case 500:
      errorMessage = "서버 오류가 발생했습니다. 관리자에게 문의하세요.";
      break;
    default:
      errorMessage = "서버와 연결이 끊겼습니다. 잠시후 다시 시도해주세요."
      break;
  }
  return (
    <ErrorMessage message={errorMessage}></ErrorMessage>
  );
};
