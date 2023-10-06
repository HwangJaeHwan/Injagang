import { PROFILE_REQUEST, profileDispatchType } from "./types";
import { Dispatch } from "redux";
import { authInfoAPI, nickChangeAPI } from "@/api/AUTH/authAPI";
import { PROFILE_SUCCESS, PROFILE_FAILURE } from "./types";

export const getProfile =
  () =>
  async (dispatch: Dispatch<profileDispatchType>): Promise<void> => {
    try {
      const response = await authInfoAPI();
      if (response) {
        dispatch({
          type: PROFILE_SUCCESS,
          payload: {
            nickname: response.data.nickname,
            role: response.data.role,
          },
        });
      }
    } catch (error: any) {
      dispatch({ type: PROFILE_FAILURE, payload: { error } });
    }
  };

export const nicknameChange =
  (changeNickname: string) =>
  async (dispatch: Dispatch<profileDispatchType>): Promise<void> => {
    try {
      dispatch({ type: PROFILE_REQUEST });
      const response = await nickChangeAPI({ changeNickname });
      if (response) {
        dispatch(getProfile());
      }
    } catch (error: any) {
      dispatch({ type: PROFILE_FAILURE, payload: { error } });
    }
  };
