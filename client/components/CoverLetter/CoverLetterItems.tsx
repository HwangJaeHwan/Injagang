import React from "react";
import { useDispatch } from "react-redux";
import { setCurEssayList } from "../redux/Essay/user/actions";
import { IGetEssayList } from "@/types/essay/EssayType";

interface CoverLetterItemsProps {
  item: IGetEssayList;
}

const CoverLetterItems = ({ item }: CoverLetterItemsProps) => {
  const dispatch = useDispatch();
  const changeSeleted = () => {
    dispatch(setCurEssayList(item));
  };
  return <div onClick={changeSeleted}>{item.title}</div>;
};

export default CoverLetterItems;
