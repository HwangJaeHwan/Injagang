import React, { useEffect, useState } from "react";
import CustomButton from "../UI/CustomButton";
import useQnaManager from "./hooks/useQnaManager";
import usePageNation from "@/hooks/usePageNation";

const PageNation = () => {
  const { boardInFoList, isUpdated, dispatchGetBoardList } = useQnaManager();
  const totalPage = boardInFoList.totalPage;
  const {
    curPageNum,
    handlePageClick,
    handlePrevClick,
    handleNextClick,
    visiblePageNumbers,
  } = usePageNation([totalPage, 8]);

  useEffect(() => {
    dispatchGetBoardList(curPageNum);
  }, [curPageNum, isUpdated]);

  return (
    <div>
      <NavigationButton text="<" onClick={handlePrevClick} />
      {visiblePageNumbers.map(pageNum => (
        <NavigationButton
          key={pageNum}
          text={`${pageNum}`}
          isActive={pageNum === curPageNum}
          onClick={() => handlePageClick(pageNum)}
        />
      ))}
      <NavigationButton text=">" onClick={handleNextClick} />
    </div>
  );
};

//TODO :: 스타일 리팩토링 작업시 정리 할 것!!
interface NavigationButtonProps {
  text: string;
  isActive?: boolean;
  onClick: () => void;
}

const NavigationButton = ({
  text,
  isActive = false,
  onClick,
}: NavigationButtonProps) => (
  <CustomButton
    Size={{ width: "40px", font: "15px" }}
    className={isActive ? "active_button" : ""}
    onClick={onClick}
    text={text}
  />
);

export default React.memo(PageNation);
