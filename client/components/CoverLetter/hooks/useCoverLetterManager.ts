import React from "react";
import { useDispatch } from "react-redux";
import { setCurEssayList } from "../../redux/Essay/user/actions";

import { useRouter } from "next/router";
import { IGetEssayList } from "@/types/essay/EssayType";

const useCoverLetterManager = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  //CoverLetterItems
  const changeSeleted = (item: IGetEssayList) => {
    dispatch(setCurEssayList(item));
  };

  const moveEditPage = (essayId: number) => {
    router.push({
      pathname: "/edit",
      query: { essayId: JSON.stringify(essayId) },
    });
  };
  

  return { changeSeleted, moveEditPage };
};

export default useCoverLetterManager;
