import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getEssayList, readEssayList } from "./redux/Essay/actions";
import { RootReducerType } from "./redux/store";

interface EssayProps {
  essayId: number;
}

const EssayDetailView = ({ essayId }: EssayProps) => {
  const dispatch = useDispatch();
  const essayReducer = useSelector((state: RootReducerType) => state.essay);
  useEffect(() => {
    dispatch(readEssayList(essayId));
  }, [essayId]);
  return (
    <div>
      {essayReducer.readEssayList &&
        essayReducer.readEssayList.map((essayList, i) => (
          <div key={i}>
            <h2>{essayList.title}</h2>
            <div>
              {essayList.qnaList.map((a, i) => (
                <div>
                  <h5>{a.question}</h5>
                  <h5>{a.answer}</h5>
                </div>
              ))}
            </div>
          </div>
        ))}
    </div>
  );
};

export default EssayDetailView;
