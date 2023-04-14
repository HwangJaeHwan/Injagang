import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { readEssayList } from "../../redux/Essay/actions";
import { RootReducerType } from "../../redux/store";
import styled from "styled-components";
import { ScrollBar } from "@/styles/GlobalStyle";

const EssayDetailStyle = styled.div`
  ${ScrollBar}
  padding: 15px;
  background-color: #858080e8;
  color: black;
  height: 100vh;
  width: 100%;
  word-break: break-all;
  overflow-x: hidden;
`;
const EssayContainer = styled.div`
  .essay_title {
    text-align: center;
    color: black;
  }
`;
const EssayContent = styled.div`
  margin: 15px;
`;

const EssayDetailViewItem = styled.div`
  margin: 20px;
  font-family: "Noto Sans KR", sans-serif;
  .essay_question {
    margin-bottom: 15px;
    > span {
      color: black;
    }
  }
  .essay_answer {
    font-weight: normal;
    font-size: 15px;
    line-height: 1.7em;
    > span {
      color: black;
      font-weight: bold;
    }
  }
`;

interface EssayProps {
  essayId: number;
}

const EssayDetailView = ({ essayId = 0 }: EssayProps) => {
  const dispatch = useDispatch();
  const readEssayReducer = useSelector(
    (state: RootReducerType) => state.essay.readEssayList,
  );
  useEffect(() => {
    if (essayId > 0) {
      dispatch(readEssayList(essayId));
    }
  }, [essayId]);
  return (
    <EssayDetailStyle>
      {readEssayReducer &&
        readEssayReducer.map(essayList => (
          <EssayContainer key={essayList.essayId}>
            <h2 className="essay_title">{essayList.title}</h2>
            <EssayContent>
              {essayList.qnaList.map(qna => (
                <EssayDetailViewItem key={qna.qnaId}>
                  <h3 className="essay_question">
                    <span>질문:</span> {qna.question}
                  </h3>
                  <h5 className="essay_answer">
                    <span>답변:</span> {qna.answer}{" "}
                  </h5>
                </EssayDetailViewItem>
              ))}
            </EssayContent>
          </EssayContainer>
        ))}
    </EssayDetailStyle>
  );
};

export default React.memo(EssayDetailView);
