import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { getBoardDetail } from "@/components/redux/QnA/actions";
import { InitiaState } from "@/components/redux/QnA/reducer";
import { useSelector } from "react-redux";
import { RootReducerType } from "@/components/redux/store";
import { Card, ColBox, ScrollBar } from "@/styles/GlobalStyle";
import EssayDetailView from "@/components/EssayDetailView";
import AnswerDragView from "@/components/AnswerDragView";
import CustomButton from "@/components/UI/CustomButton";
import BoardItem from "@/components/BoardItem";

const ViewStyle = styled.div`
  ${ColBox}
  height: 100vh;
  width: 80vw;
`;

const LeftContainer = styled.div`
  ${ColBox}
  ${ScrollBar}
  overflow-x: hidden;
  margin: 30px auto;
  width: 45%;
  height: 100%;
  word-break: break-all;
`;

const RigthContainer = styled.div`
  ${ColBox}
  margin: 30px auto;
  height: 100%;
  width: 45%;
`;

const CommentTop = styled.div`
  height: 50%;
  width: 100%;
  margin: 10px auto;
  textarea {
    ${ScrollBar}
    padding: 15px;
    line-height: 1.5;
    height: 100%;
    width: 100%;
    border-radius: 15px;
    resize: none;
  }
`;
const CommentFooter = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
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

const answer = () => {
  const router = useRouter();
  const [correction, setCorrection] = useState<string>("");
  const dispatch = useDispatch();
  const boardId = router.query;
  const boardReducer: InitiaState = useSelector(
    (state: RootReducerType) => state.board,
  );

  useEffect(() => {
    if (!isNaN(Number(boardId.id))) {
      dispatch(getBoardDetail(Number(boardId.id)));
    }
  }, [router.query]);

  console.log(boardId);
  return (
    <ViewStyle>
      <Card size={{ width: "80%", height: "45vh", flex: "row" }}>
        <LeftContainer>
          {boardReducer.boardList &&
            boardReducer.boardList.map((a, i) => (
              <BoardItem key={a.boardId} {...a} />
            ))}
        </LeftContainer>
        <RigthContainer>
          <AnswerDragView onChange={setCorrection} />
        </RigthContainer>
      </Card>
      <Card size={{ width: "80%", height: "35vh", flex: "col" }}>
        <CorrectionContainer>
          <span className="correction_title">현재 선택된 문장:</span>
          <h4 className="correction_sentence">{correction}</h4>
        </CorrectionContainer>
        <CommentTop>
          <textarea></textarea>
        </CommentTop>
        <CommentFooter>
          <CustomButton
            text="작성"
            onClick={() => setCorrection("")}
            Size={{ width: "150px", font: "15px" }}
          ></CustomButton>
        </CommentFooter>
      </Card>
    </ViewStyle>
  );
};

export default answer;
