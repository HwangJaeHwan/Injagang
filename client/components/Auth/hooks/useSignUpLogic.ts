import { useCallback, useState } from "react";
import usePwCheck from "@/hooks/usePwCheck";
import useSignUpManager from "../hooks/useSignUpManager";
import { hasEmptyFields } from "@/util/hasEmptyFields";
import { ERROR_MESSAGES } from "@/constants";

interface joinInfoType {
  [key: string]: string;
  loginId: string;
  password: string;
  confirmPassword: string;
  email: string;
  nickName: string;
}

const useSignUpLogic = () => {
  const [joinInfo, setJoinInfo] = useState<joinInfoType>({
    loginId: "",
    password: "",
    confirmPassword: "",
    email: "",
    nickName: "",
  });
  const [msg, setMsg] = useState<string | null>("");
  const { isValid, errorMessage } = usePwCheck({ password: joinInfo.password });
  const { confirmSignUp } = useSignUpManager();

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (hasEmptyFields(joinInfo)) {
        setMsg(ERROR_MESSAGES.FILL_BLANKS);
        return;
      }

      if (!isValid) {
        setMsg(errorMessage);
        return;
      }

      if (joinInfo.password !== joinInfo.confirmPassword) {
        setMsg(ERROR_MESSAGES.CHECK_PASSWORD);
        return;
      }

      const joinData = {
        loginId: joinInfo.loginId,
        password: joinInfo.password,
        passwordCheck: joinInfo.confirmPassword,
        email: joinInfo.email,
        nickname: joinInfo.nickName,
      };
      confirmSignUp(joinData);
    },
    [],
  );

  const handleValueChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setJoinInfo(cur => ({
        ...cur,
        [name]: value,
      }));
    },
    [],
  );

  return { handleSubmit, handleValueChange, msg, joinInfo };
};

export default useSignUpLogic;
