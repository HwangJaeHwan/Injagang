import React, { useState } from "react";

export interface IPassWordInfo {
  nowPassword: string;
  changePassword: string;
  changePasswordCheck: string;
}

const useUserMyProfileManager = () => {
  const [passWordInfo, setPassWordInfo] = useState<IPassWordInfo>({
    nowPassword: "",
    changePassword: "",
    changePasswordCheck: "",
  });
  const [nickName, setNickName] = useState<string>("");

  const handleInfoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setPassWordInfo(cur => ({
      ...cur,
      [name]: value,
    }));
  };

  return { passWordInfo, handleInfoChange, setNickName, nickName };
};

export default useUserMyProfileManager;
