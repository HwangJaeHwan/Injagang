import React from "react";
import styled from "styled-components";
import { StyleButton } from "@/styles/GlobalStyle";

interface FeedBackFooterProps {
  handleClear: () => void;
  handleSubmit: () => void;
  qnaIdList: number[];
  feedBackIndex: number;
  handleFeedBackIndex: (qnaId: number) => void;
}

const FeedBackFooter = ({
  handleClear,
  handleFeedBackIndex,
  handleSubmit,
  qnaIdList,
  feedBackIndex,
}: FeedBackFooterProps) => {
  const btnInfo = [
    { text: "비우기", onClick: handleClear },
    { text: "작성", onClick: handleSubmit },
  ];

  const TextActionBtns = () => (
    <ControlRightButtons>
      {btnInfo.map((info, idx) => (
        <StyleButton
          key={idx}
          onClick={info.onClick}
          Size={{ width: "150px", font: "15px" }}
        >
          {info.text}
        </StyleButton>
      ))}
    </ControlRightButtons>
  );

  return (
    <CommentFooter>
      <FeedBackViewBtns>
        {qnaIdList.map((list, i) => (
          <StyleButton
            className={list === feedBackIndex ? "active_button" : " "}
            Size={{ width: "40px", font: "15px" }}
            onClick={() => handleFeedBackIndex(list)}
            key={list}
          >{`${i + 1}`}</StyleButton>
        ))}
      </FeedBackViewBtns>
      <TextActionBtns />
    </CommentFooter>
  );
};

export default FeedBackFooter;

const CommentFooter = styled.div`
  margin-top: 15px;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const FeedBackViewBtns = styled.div`
  button {
    margin-right: 3px;
  }
`;

const ControlRightButtons = styled.div`
  button:first-child {
    margin-right: 5px;
  }

  @media screen and (max-width: 756px) {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
`;
