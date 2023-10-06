import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { passWordChange } from "@/components/redux/Auth/actions";
import { nicknameChange } from "@/components/redux/MyProfile/actions";
import { IPassWordInfo } from "./useUserMyProfileManager";
import { runValidationChecks } from "@/util/runValidationChecks";
import { hasEmptyFields } from "@/util/hasEmpty";
import {
  ERROR_MESSAGES,
  MODAL_MESSAGES,
  SUCCESS_MESSAGES,
  TOAST_MODE,
} from "@/constants";
import { useRouter } from "next/router";
import useModal from "@/hooks/useModal";
import useToast from "@/hooks/useToast";
import { useSelector } from "react-redux";
import { RootReducerType } from "@/components/redux/store";

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
  const { success } = useSelector((state: RootReducerType) => state.profile);
  const router = useRouter();
  const { Modal, setModal } = useModal();
  const [showToast, RenderToast] = useToast();
  const [isFirstRender, setIsFirstRender] = useState<boolean>(false);

  useEffect(() => {
    if (!isFirstRender) return;
    success
      ? showToast(TOAST_MODE.SUCCESS, SUCCESS_MESSAGES.CHANGE_NICK)
      : showToast(TOAST_MODE.ERROR, ERROR_MESSAGES.DUPLICATION_NICK);
  }, [success]);

  //PASSWORD DOMAIN
  const dispatchPasswordChange = useCallback(
    ({ nowPassword, changePassword, changePasswordCheck }: IPassWordInfo) => {
      setModal({
        onAction: () =>
          confirmPassWordChange({
            nowPassword,
            changePassword,
            changePasswordCheck,
          }),
        contents: {
          title: MODAL_MESSAGES.MSG,
          content: `비밀번호 : **** 변경하시겠습니까?`,
        },
      });
    },
    [],
  );

  const confirmPassWordChange = ({
    nowPassword,
    changePassword,
    changePasswordCheck,
  }: IPassWordInfo) => {
    const validationErrorMsg = runValidationChecks(
      validation.password({
        nowPassword,
        changePassword,
        changePasswordCheck,
      }),
    );
    validationErrorMsg
      ? commonValidationFailure(validationErrorMsg)
      : passwordValidationSuccess({
          nowPassword,
          changePassword,
          changePasswordCheck,
        });
  };

  const passwordValidationSuccess = ({
    nowPassword,
    changePassword,
    changePasswordCheck,
  }: IPassWordInfo) => {
    dispatch(
      passWordChange({ nowPassword, changePassword, changePasswordCheck }),
    );
  };

  //NICKNAME DOMAIN
  const dispatchNickNameChange = useCallback((nickName: string) => {
    setModal({
      onAction: () => confirmNickNameChange(nickName),
      contents: {
        title: MODAL_MESSAGES.MSG,
        content: `닉네임 : ${nickName} 변경하시겠습니까?`,
      },
    });
  }, []);

  const confirmNickNameChange = useCallback((nickName: string) => {
    const validationErrorMsg = runValidationChecks(validation.nick(nickName));
    validationErrorMsg
      ? commonValidationFailure(validationErrorMsg)
      : nicknameValidationSuccess(nickName);
  }, []);

  const nicknameValidationSuccess = (nickName: string) => {
    dispatch(nicknameChange(nickName));
    setIsFirstRender(true);
  };

  const commonValidationFailure = (errorMsg: string) => {
    setModal({
      contents: {
        title: MODAL_MESSAGES.WARNING,
        content: errorMsg,
      },
    });
  };

  return { dispatchPasswordChange, dispatchNickNameChange, Modal, RenderToast };
};

export default useMyProfileManager;
