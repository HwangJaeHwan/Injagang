import { useSelector } from "react-redux";

import { RootReducerType } from "@/components/redux/store";


const userInterviewManager = () => {
  const { interViewList } = useSelector(
    (state: RootReducerType) => state.userInterViewList,
  );
  return { interViewList };
};

export default userInterviewManager;
