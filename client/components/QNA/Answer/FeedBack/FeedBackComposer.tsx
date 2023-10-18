import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootReducerType } from "@/components/redux/store";
import { Card, ScrollBar } from "@/styles/GlobalStyle";
import { writeFeedback } from "@/components/redux/FeedBack/action";
import TextArea from "@/components/UI/TextArea";

import CorrectionView from "./CorrectionView";
import useModal from "@/hooks/useModal";
import userQnaManager from "../../hooks/userQnaManager";
import FeedBackFooter from "./FeedBackFooter";

const FeedBackComposer = () => {
  const [correctionText, setCorrectionText] = useState<string>("");
  const [isFeedBackClear, setIsFeedBackClear] = useState<boolean>(false);
  const [isViolation, setIsViolation] = useState<boolean>(false);
  const { setModal, Modal } = useModal();
  const dispatch = useDispatch();
  const { qnaIdList } = useSelector((state: RootReducerType) => state.board);
  const {
    selectedCorrection,
    dispatchInitCorrection,
    targetFeed,
    dispatchChangeFeed,
  } = userQnaManager();

  const handleSubmit = () => {
    alert("작동");
    if (correctionText.length < 30 || selectedCorrection.targetAnswer === "") {
      setModal({
        contents: {
          title: "경고",
          content: `Target질문을 선택해주세요.
          피드백은 30자이상 작성하세요. `,
        },
      });
      setIsViolation(true);
      setTimeout(() => {
        setIsViolation(false);
      }, 30);
      return;
    }
    const data = {
      qnaId: selectedCorrection.targetQuestionIndex,
      feedbackTarget: selectedCorrection.targetAnswer,
      feedbackContent: correctionText,
    };
    dispatch(writeFeedback(data));
    dispatchInitCorrection();
    handleClear();
  };

  const handleClear = () => {
    setIsFeedBackClear(true);
    setTimeout(() => {
      setIsFeedBackClear(false);
    }, 10);
  };

  const handleChangeFeedBack = (feedBackText: string) => {
    setCorrectionText(feedBackText);
  };

  //TODO:: 기본적인 컴포넌트 분리완료, 컴포넌트 모듈화 하고 상태에 대한 로직 분리하기, props에 따라 리덕스 고려하기 !!!!!!!

  //Corection에 대한 상태 떄문에 props 드릴링이 발생한다. 리덕스로 변경
  return (
    <Card size={{ width: "80%", height: "35vh", flex: "col" }}>
      <CorrectionView {...selectedCorrection} />
      <CommentTop>
        <TextArea
          handleChangeText={handleChangeFeedBack}
          violation={isViolation}
          clear={isFeedBackClear}
        ></TextArea>
      </CommentTop>
      <FeedBackFooter
        handleFeedBackIndex={dispatchChangeFeed}
        handleSubmit={handleSubmit}
        handleClear={handleClear}
        qnaIdList={qnaIdList}
        feedBackIndex={targetFeed}
      />
      <Modal />
    </Card>
  );
};

export default FeedBackComposer;

const CommentTop = styled.div`
  height: 50%;
  width: 100%;
  margin: 15px auto;
  textarea {
    ${ScrollBar}
    height: 100%;
    width: 100%;
    border-radius: 15px;
    resize: none;
  }
`;
