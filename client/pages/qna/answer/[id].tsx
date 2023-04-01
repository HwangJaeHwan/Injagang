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
  height: 70%;
  width: 100%;
  margin: 10px auto;
  textarea {
    height: 100%;
    width: 100%;
    border-radius: 15px;
  }
`;
const CommentFooter = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

const CorrectionContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 98%;
  height: 15%;
  text-align: center;
  color: red;
  h4 {
    color: white;
    margin-left: 15px;
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
    dispatch(getBoardDetail(4));
  }, []);

  console.log(boardId);
  return (
    <ViewStyle>
      <Card size={{ width: "80%", height: "55vh", flex: "row" }}>
        <LeftContainer>
          {boardReducer.boardList &&
            boardReducer.boardList.map((a, i) => (
              <div key={a.boardId}>
                <h2>제목:{" "}{a.title}</h2>
                <h4>답변:{" "}{a.content}</h4>
              </div>
            ))}
        </LeftContainer>
        <RigthContainer>
          <AnswerDragView onChange={setCorrection} />
        </RigthContainer>
      </Card>
      <Card size={{ width: "80%", height: "25vh", flex: "col" }}>
        <CorrectionContainer>
          <div className="p"><h3>현재 선택된 문장:</h3></div>
          <h4>{correction}</h4>
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
