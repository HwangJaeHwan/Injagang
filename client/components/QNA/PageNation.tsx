import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getBoardList } from "../redux/QnA/actions";
import { InitiaState } from "../redux/QnA/reducer";
import { useSelector } from "react-redux";
import { RootReducerType } from "../redux/store";
import CustomButton from "../UI/CustomButton";

const PageNation = () => {
  const [curPageNumber, setCurPageNumber] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [pageMoveNumberLimit, setPageMoveNumberLimit] = useState(8);
  const [minPageNumLimit, setMinPageNumLimit] = useState(0);
  const [maxPageNumLimit, setMaxPageNumLimit] = useState(8);

  const boardReducer: InitiaState = useSelector(
    (state: RootReducerType) => state.board,
  );
  const dispatch = useDispatch();
  useEffect(() => {
    setTotalPage(boardReducer.boardInFoList[0]?.totalPage);
  }, [boardReducer.boardInFoList]);
  
  // 페이지가 변경될때마다 새로운 페이지리스트 호출
  useEffect(() => {
    dispatch(getBoardList(curPageNumber))
  },[curPageNumber])


  const handleBtnClick = (idx: number) => {
    setCurPageNumber(idx + 1);
  };

  /** 이전페이지 호출와 페이지넘김을 담당*/
  const handlePreBtn = () => {
    if(curPageNumber > 1){
      setCurPageNumber(curPageNumber - 1);
      if (curPageNumber === minPageNumLimit+1) {
        setMinPageNumLimit(minPageNumLimit - pageMoveNumberLimit);
        setMaxPageNumLimit(maxPageNumLimit - pageMoveNumberLimit);
      }
    }
  };

  /** 다음페이지 호출와 페이지넘김을 담당 */
  const handleNextBtn = () => {
    if (totalPage > curPageNumber) {
      setCurPageNumber(curPageNumber + 1);
      if (totalPage >= maxPageNumLimit && curPageNumber === maxPageNumLimit) {
        setMinPageNumLimit(minPageNumLimit + pageMoveNumberLimit);
        setMaxPageNumLimit(maxPageNumLimit + pageMoveNumberLimit);
      }
    }
  };
  return (
    <div>
      <CustomButton
        Size={{ width: "40px", font: "15px" }}
        onClick={() => handlePreBtn()}
        text={"<"}
      />
      {totalPage !== 0 &&
        Array(totalPage)
          .fill(1)
          .map((_, idx) => {
            if (idx+1 > minPageNumLimit && idx + 1 < maxPageNumLimit + 1)
              return (
                <CustomButton
                  className={idx + 1 === curPageNumber ? "active_button" : ""}
                  key={idx}
                  Size={{ width: "40px", font: "15px" }}
                  onClick={() => handleBtnClick(idx)}
                  text={`${idx + 1}`}
                />
              );
          })}
      <CustomButton
        Size={{ width: "40px", font: "15px" }}
        onClick={() => handleNextBtn()}
        text={">"}
      />
    </div>
  );
};

export default React.memo(PageNation);
