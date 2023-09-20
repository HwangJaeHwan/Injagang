import { useState, useCallback, useRef } from "react";
import { useDispatch } from "react-redux";
import { authenTicate } from "@/components/redux/Auth/actions";
import { hasEmptyFields } from "@/util/hasEmptyFields";
import { ERROR_MESSAGES } from "@/constants";

const useLoginLogic = () => {
  const [loginInfo, setLoginInfo] = useState({
    loginId: "",
    password: "",
  });
  const [userLogicMsg, setUserLogicMsg] = useState("");
  const loginRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (hasEmptyFields(loginInfo)) {
      setUserLogicMsg(ERROR_MESSAGES.FILL_BLANKS);
      return;
    }

    if (loginInfo.loginId.trim() === "") {
      loginRef.current?.focus();
      return;
    }

    if (loginInfo.password.trim() === "") {
      passwordRef.current?.focus();
      return;
    }
    
    const loginData = {
      loginId: loginInfo.loginId,
      password: loginInfo.password,
    };
    dispatch(authenTicate(loginData));
    setUserLogicMsg("");
  };

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setLoginInfo(cur => ({
        ...cur,
        [name]: value,
      }));
    },
    [],
  );
  return {
    loginInfo,
    userLogicMsg,
    handleChange,
    handleSubmit,
    loginRef,
    passwordRef,
  };
};

export default useLoginLogic;
