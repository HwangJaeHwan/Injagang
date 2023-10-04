import React from "react";
import { useDispatch } from "react-redux";
import { passWordChange } from "@/components/redux/Auth/actions";
import { IPassWordInfo } from "./useUserMyProfileManager";
import { runValidationChecks } from "@/util/runValidationChecks";
import { hasEmptyFields } from "@/util/hasEmpty";
import { ERROR_MESSAGES } from "@/constants";
import { useRouter } from "next/router";

const validation = ({
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
];

const useMyProfileManager = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const dispatchPasswordChange = ({
    nowPassword,
    changePassword,
    changePasswordCheck,
  }: IPassWordInfo) => {
    const validationErrorMsg = runValidationChecks(
      validation({ nowPassword, changePassword, changePasswordCheck }),
    );
    if (validationErrorMsg) {
      return;
    }
    dispatch(
      passWordChange({ nowPassword, changePassword, changePasswordCheck }),
    );
    router.push("/myProfile");
  };

  return { dispatchPasswordChange };
};

export default useMyProfileManager;
