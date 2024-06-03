import React, { useEffect } from "react";

import useQnaManager from "./hooks/useQnaManager";
import usePageNation from "@/hooks/usePageNation";

import { StyleButton } from "@/styles/GlobalStyle";
import userQnaManager from "./hooks/userQnaManager";

const PageNation = () => {
  const { boardInFoList, isUpdated, dispatchGetBoardList } = useQnaManager();
  const { boardSearch, boardType } = userQnaManager();
  const totalPage = boardInFoList.totalPage;
  const {
    curPageNum,
    handlePageClick,
    handlePrevClick,
    handleNextClick,
    visiblePageNumbers,
  } = usePageNation([totalPage, 8]);

  useEffect(() => {
    //API가 오랜순 정렬
    const revercePage = totalPage + 1 - curPageNum;
    dispatchGetBoardList(revercePage, boardType, boardSearch);
  }, [curPageNum, isUpdated, totalPage, boardSearch]);

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
  <StyleButton
    Size={{ width: "40px", font: "15px" }}
    className={isActive ? "active_button" : ""}
    onClick={onClick}
  >
    {text}
  </StyleButton>
);

export default React.memo(PageNation);
