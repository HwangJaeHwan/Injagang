import React from "react";
import { RootReducerType } from "@/components/redux/store";
import { useSelector } from "react-redux";

const userInterviewManager = () => {
  const { interViewList } = useSelector(
    (state: RootReducerType) => state.userInterViewList,
  );
  return { interViewList };
};

export default userInterviewManager;
