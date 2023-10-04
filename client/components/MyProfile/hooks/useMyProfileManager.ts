import React from "react";
import { useDispatch } from "react-redux";
import {
  passWordChange,
  nicknameChange,
} from "@/components/redux/Auth/actions";
import { IPassWordInfo } from "./useUserMyProfileManager";
import { runValidationChecks } from "@/util/runValidationChecks";
import { hasEmptyFields } from "@/util/hasEmpty";
import { ERROR_MESSAGES } from "@/constants";
import { useRouter } from "next/router";
import useModal from "@/hooks/useModal";

const validation = {
  password: ({
    nowPassword,
    changePassword,
    changePasswordCheck,
  }: IPassWordInfo) => [
    {
      check: () =>
        hasEmptyFields({ nowPassword, changePassword, changePasswordCheck }),
      message: ERROR_MESSAGES.FILL_BLANKS,
    },
    {
      check: () => changePassword !== changePasswordCheck,
      message: ERROR_MESSAGES.CHECK_PASSWORD,
    },
  ],
  nick: (nickName: string) => [
    {
      check: () => nickName === "",
      message: ERROR_MESSAGES.EMPTY_NICK,
    },
  ],
};

const useMyProfileManager = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { Modal, setModal } = useModal();

  const dispatchPasswordChange = ({
    nowPassword,
    changePassword,
    changePasswordCheck,
  }: IPassWordInfo) => {
    const validationErrorMsg = runValidationChecks(
      validation.password({ nowPassword, changePassword, changePasswordCheck }),
    );
    if (validationErrorMsg) {
      setModal({
        contents: {
          title: "Warring",
          content: validationErrorMsg,
        },
      });
      return;
    }
    dispatch(
      passWordChange({ nowPassword, changePassword, changePasswordCheck }),
    );
    router.push("/myProfile");
  };

  const dispatchNickNameChange = (nickName: string) => {
    const validationErrorMsg = runValidationChecks(validation.nick(nickName));
    if (validationErrorMsg) {
      setModal({
        contents: {
          title: "Warring",
          content: validationErrorMsg,
        },
      });
      return;
    }
    dispatch(nicknameChange(nickName));
  };

  return { dispatchPasswordChange, dispatchNickNameChange, Modal };
};

export default useMyProfileManager;
