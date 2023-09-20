import { useCallback, useState } from "react";
import usePwCheck from "@/hooks/usePwCheck";
import useSignUpManager from "../hooks/useSignUpManager";
import { hasEmptyFields } from "@/util/hasEmpty";
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
  const [userMsg, setUserMsg] = useState<string | null>("");
  const { isValid, errorMessage } = usePwCheck({ password: joinInfo.password });
  const { confirmSignUp } = useSignUpManager();

  const validation = [
    {
      check: () => hasEmptyFields(joinInfo),
      message: ERROR_MESSAGES.FILL_BLANKS,
    },
    {
      check: () => !isValid,
      message: errorMessage,
    },
    {
      check: () => joinInfo.password !== joinInfo.confirmPassword,
      message: ERROR_MESSAGES.CHECK_PASSWORD,
    },
  ];

  const runValidationChecks = () => {
    const isValidation = validation.find(item => item.check());
    if (isValidation) {
      setUserMsg(isValidation.message);
      return false;
    }
    return true;
  };

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (!runValidationChecks()) return;

      const joinData = {
        loginId: joinInfo.loginId,
        password: joinInfo.password,
        passwordCheck: joinInfo.confirmPassword,
        email: joinInfo.email,
        nickname: joinInfo.nickName,
      };
      confirmSignUp(joinData);
    },
    [joinInfo],
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

  return { handleSubmit, handleValueChange, userMsg, joinInfo };
};

export default useSignUpLogic;
