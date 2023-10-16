import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootReducerType } from "@/components/redux/store";
import { Card, ColBox, ScrollBar } from "@/styles/GlobalStyle";
import CustomButton from "@/components/UI/CustomButton";
import { writeFeedback } from "@/components/redux/FeedBack/action";
import FeedBackView from "@/components/QNA/Answer/FeedBack/FeedBackView";
import TextArea from "@/components/UI/TextArea";

import AnswerDetailView from "./AnswerDetailView";
import CorrectionView from "./CorrectionView";
import useModal from "@/hooks/useModal";

export type CorrectionItem = {
  targetQuestion: number;
  targetAnswer: string;
  targetQuestionIndex: number;
};

const Answer = () => {
  const [correction, setCorrection] = useState<CorrectionItem>({
    targetQuestion: 0,
    targetAnswer: "",
    targetQuestionIndex: 0,
  });
  const [correctionText, setCorrectionText] = useState<string>("");
  const [feedBackIndex, setFeedBackIndex] = useState<number>(0);
  const [isFeedBackClear, setIsFeedBackClear] = useState<boolean>(false);
  const [isViolation, setIsViolation] = useState<boolean>(false);
  const { setModal, Modal } = useModal();
  const dispatch = useDispatch();
  const { qnaIdList } = useSelector((state: RootReducerType) => state.board);

  const handleSubmit = () => {
    if (correctionText.length < 30 || correction.targetAnswer === "") {
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
      qnaId: correction.targetQuestionIndex,
      feedbackTarget: correction.targetAnswer,
      feedbackContent: correctionText,
    };
    dispatch(writeFeedback(data));
    setCorrection({
      targetAnswer: "",
      targetQuestion: 0,
      targetQuestionIndex: 0,
    });
    handleClear();
  };

  const handleClear = () => {
    setIsFeedBackClear(true);
    setTimeout(() => {
      setIsFeedBackClear(false);
    }, 10);
  };

  const handleFeedBackIndex = (qnaId: number) => {
    setFeedBackIndex(qnaId);
  };

  const handleChangeFeedBack = (feedBackText: string) => {
    setCorrectionText(feedBackText);
  };

  const btnInfo = [
    { text: "비우기", onClick: handleClear },
    { text: "작성", onClick: handleSubmit },
  ];

  const TextActionBtns = () => (
    <ControlRightButtons>
      {btnInfo.map((info, idx) => (
        <CustomButton {...info} Size={{ width: "150px", font: "15px" }} />
      ))}
    </ControlRightButtons>
  );

  const Footer = () => (
    <CommentFooter>
      <FeedBackViewBtns>
        {qnaIdList.map((list, i) => (
          <CustomButton
            className={list === feedBackIndex ? "active_button" : " "}
            Size={{ width: "40px", font: "15px" }}
            text={`${i + 1}`}
            onClick={() => handleFeedBackIndex(list)}
            key={list}
          ></CustomButton>
        ))}
      </FeedBackViewBtns>
      <TextActionBtns />
    </CommentFooter>
  );

  const FeedBackComposer = () => (
    <Card size={{ width: "80%", height: "35vh", flex: "col" }}>
      <CorrectionView {...correction} />
      <CommentTop>
        <TextArea
          handleChangeText={handleChangeFeedBack}
          violation={isViolation}
          clear={isFeedBackClear}
        ></TextArea>
      </CommentTop>
      <Footer />
    </Card>
  );

  //TODO:: 기본적인 컴포넌트 분리완료, 컴포넌트 모듈화 하고 상태에 대한 로직 분리하기, props에 따라 리덕스 고려하기 !!!!!!!

  return (
    <AnswerWirteStyle>
      <AnswerDetailView setCorrection={setCorrection} />
      <FeedBackComposer />
      <FeedBackView targetNumber={feedBackIndex}></FeedBackView>
      <Modal />
    </AnswerWirteStyle>
  );
};

export default Answer;

const AnswerWirteStyle = styled.div`
  ${ColBox}
  width: 100%;
  height: 90%;
  gap: 30px;
`;

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
