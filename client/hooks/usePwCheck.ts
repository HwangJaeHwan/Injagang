import { useState, useEffect } from "react";

interface useCheckProps {
  password: string;
}

const usePwCheck = ({ password }: useCheckProps) => {
  const [isValid, setIsValid] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    const checkPassword = () => {
      const uppercaseRegex = /[A-Z]/;
      const lowercaseRegex = /[a-z]/;
      const numberRegex = /[0-9]/;
      const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;

      if (password.length < 10) {
        setIsValid(false);
        setErrorMessage(`패스워드 최소 10자 이상이어야 합니다.`);
      } else if (!uppercaseRegex.test(password)) {
        setIsValid(false);
        setErrorMessage("패스워드에는 최소 하나의 대문자가 포함되어야 합니다.");
      } else if (!lowercaseRegex.test(password)) {
        setIsValid(false);
        setErrorMessage("패스워드에는 최소 하나의 소문자가 포함되어야 합니다.");
      } else if (!numberRegex.test(password)) {
        setIsValid(false);
        setErrorMessage("패스워드에는 최소 하나의 숫자가 포함되어야 합니다.");
      } else if (!specialCharRegex.test(password)) {
        setIsValid(false);
        setErrorMessage(
          "패스워드에는 최소 하나의 특수문자가 포함되어야 합니다.",
        );
      } else {
        setIsValid(true);
        setErrorMessage("");
      }
    };

    checkPassword();
  }, [password]);
  return { isValid, errorMessage };
};

export default usePwCheck;
