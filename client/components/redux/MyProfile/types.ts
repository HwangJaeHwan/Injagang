export const PROFILE_REQUEST = "PROFILE_REQUEST";
export const PROFILE_SUCCESS = "PROFILE_SUCCESS";
export const PROFILE_FAILURE = "PROFILE_FAILURE";
export const PROFILE_INIT = "PROFILE_INIT";

export interface ProfileRequestDispatch {
  type: typeof PROFILE_REQUEST;
}

export interface ProfileSuccessDispatch {
  type: typeof PROFILE_SUCCESS;
  payload: {
    nickname: string;
    role: string;
  };
}

export interface ProfileFailureDispatch {
  type: typeof PROFILE_FAILURE;
  payload: {
    error: any;
  };
}

export interface ProfileInitDisaptch {
  type: typeof PROFILE_INIT;
}

export type profileDispatchType =
  | ProfileRequestDispatch
  | ProfileSuccessDispatch
  | ProfileFailureDispatch
  | ProfileInitDisaptch;
