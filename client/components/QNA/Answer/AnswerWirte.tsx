import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { getBoardDetail } from "@/components/redux/QnA/actions";
import { useSelector } from "react-redux";
import { RootReducerType } from "@/components/redux/store";
import { Card, ColBox, FlexBox, ScrollBar } from "@/styles/GlobalStyle";
import AnswerDragView from "@/components/QNA/Answer/AnswerDragView";
import CustomButton from "@/components/UI/CustomButton";
import BoardItem from "@/components/QNA/Answer/BoardItem";
import { writeFeedback } from "@/components/redux/FeedBack/action";
import FeedBackView from "@/components/QNA/Answer/FeedBack/FeedBackView";
import EditMenuBar from "@/components/QNA/Answer/EditMenuBar";
import TextArea from "@/components/UI/TextArea";
import Modal from "@/components/UI/Modal";
import { v } from "@/styles/variables";
import useQnaManager from "../hooks/useQnaManager";

export type CorrectionItem = {
  targetQuestion: number;
  targetAnswer: string;
  targetQuestionIndex: number;
};

const AnswerWirte = () => {
  const [correction, setCorrection] = useState<CorrectionItem>({
    targetQuestion: 0,
    targetAnswer: "",
    targetQuestionIndex: 0,
  });
  const [correctionText, setCorrectionText] = useState<string>("");
  const [feedBackIndex, setFeedBackIndex] = useState<number>(0);
  const [isFeedBackClear, setIsFeedBackClear] = useState<boolean>(false);
  const [isViolation, setIsViolation] = useState<boolean>(false);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const dispatch = useDispatch();

  const { boardList, isUpdated } = useSelector(
    (state: RootReducerType) => state.board,
  );
  const { qnaIdList } = useSelector((state: RootReducerType) => state.board);
  const { selectedCorrection, dispatchChangeCorrection } = useQnaManager();

  const handleSubmit = () => {
    if (correctionText.length < 30 || correction.targetAnswer === "") {
      setIsOpenModal(true);
      setIsViolation(true);
      setTimeout(() => {
        setIsViolation(false);
      }, 10);
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

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };
  if (isUpdated) return <p>보드의 정보를 가져오는중입니다. </p>;
  useEffect(() => {
    console.log(isUpdated);
  }, [isUpdated]);
  return (
    <AnswerWirteStyle>
      <Card size={{ width: "80%", height: "45vh", flex: "row" }}>
        <SwitchContainer>
          <LeftContainer>
            <BoardItem {...boardList} />
          </LeftContainer>
          <RigthContainer>
            <AnswerDragView onChange={setCorrection} />
          </RigthContainer>
        </SwitchContainer>
        {boardList.owner && <EditMenuBar boardID={boardList.boardId} />}
      </Card>

      <Card size={{ width: "80%", height: "35vh", flex: "col" }}>
        <CorrectionContainer>
          <span className="correction_title">
            현재 선택된 문장:{" "}
            {correction.targetQuestion !== 0 ? correction.targetQuestion : ""}
          </span>
          <h4 className="correction_sentence">{correction.targetAnswer}</h4>
        </CorrectionContainer>

        <CommentTop>
          <TextArea
            handleChangeText={handleChangeFeedBack}
            violation={isViolation}
            clear={isFeedBackClear}
          ></TextArea>
        </CommentTop>

        <CommentFooter>
          <ControlLeftButtons>
            {qnaIdList.map((list, i) => (
              <CustomButton
                className={list === feedBackIndex ? "active_button" : " "}
                Size={{ width: "40px", font: "15px" }}
                text={`${i + 1}`}
                onClick={() => handleFeedBackIndex(list)}
                key={list}
              ></CustomButton>
            ))}
          </ControlLeftButtons>

          <ControlRightButtons>
            <CustomButton
              text="비우기"
              onClick={handleClear}
              Size={{ width: "150px", font: "15px" }}
            ></CustomButton>
            <CustomButton
              text="작성"
              onClick={handleSubmit}
              Size={{ width: "150px", font: "15px" }}
            ></CustomButton>
          </ControlRightButtons>
        </CommentFooter>
      </Card>

      <FeedBackView targetNumber={feedBackIndex}></FeedBackView>
      {isOpenModal && (
        <Modal
          isOpen={isOpenModal}
          onClose={handleCloseModal}
          contents={{
            title: "경고",
            content: `Target질문을 선택해주세요.
              피드백은 30자이상 작성하세요. `,
          }}
        ></Modal>
      )}
    </AnswerWirteStyle>
  );
};

export default AnswerWirte;

const AnswerWirteStyle = styled.div`
  ${ColBox}
  width: 100%;
  height: 90%;
  gap: 30px;
`;

const LeftContainer = styled.div`
  ${ColBox}
  ${ScrollBar}
  overflow-x: hidden;
  width: 50%;
  height: 100%;
  word-break: break-all;
  @media screen and (max-width: 1200px) {
    width: 100%;
    height: 45%;
  }
`;

const RigthContainer = styled.div`
  ${ColBox}
  height: 100%;
  width: 50%;
  @media screen and (max-width: 1200px) {
    width: 100%;
    height: 45%;
  }
`;

const SwitchContainer = styled.div`
  display: flex;
  width: 100%;
  height: 95%;
  gap: 30px;
  padding: 8px;

  @media screen and (max-width: 1200px) {
    flex-direction: column;
  }
`;

const CorrectionContainer = styled.div`
  ${ScrollBar}
  width: 98%;
  height: 30%;
  color: red;
  overflow-x: hidden;

  .correction_title {
    font-weight: bold;
  }

  .correction_sentence {
    font-weight: normal;
    margin-top: 8px;
    color: white;
    word-break: break-all;
  }
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

const ControlLeftButtons = styled.div`
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
