import { ADD_INTERVIEWLIST } from "./types";

export const addInterViewList = (userList: string[]) => {
  return {
    type: ADD_INTERVIEWLIST,
    payload: {
      interViewList: userList,
    },
  };
};
