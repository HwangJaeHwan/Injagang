import {
  PROFILE_FAILURE,
  PROFILE_REQUEST,
  PROFILE_SUCCESS,
  PROFILE_INIT,
  profileDispatchType,
} from "./types";

export interface InitiaState {
  loading: boolean;
  success: boolean;
  error: any;
  role: string | null;
  nickname: string | null;
}

const InitiaState: InitiaState = {
  loading: false,
  error: null,
  success: false,
  role: null,
  nickname: null,
};

const profileReducer = (state = InitiaState, action: profileDispatchType) => {
  switch (action.type) {
    case PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
        success: false,
      };
    case PROFILE_SUCCESS:
      const { role, nickname } = action.payload;
      return {
        ...state,
        loading: false,
        success: true,
        role,
        nickname,
      };
    case PROFILE_FAILURE:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload.error,
      };
    case PROFILE_INIT:
      return {
        ...state,
        loading: false,
        error: null,
        success: false,
        role: null,
        nickname: null,
      };
    default:
      return state;
  }
};
export default profileReducer;
