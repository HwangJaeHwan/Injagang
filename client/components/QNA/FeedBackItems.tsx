import { Card, ColBox, ScrollBar } from "@/styles/GlobalStyle";
import React from "react";
import styled from "styled-components";
import CustomButton from "../UI/CustomButton";

const FeedBackItemsStyle = styled.div`
  ${ColBox}
  width: 100%;
`;

const CorrectionContainer = styled.div`
  ${ScrollBar}
  width: 98%;
  height: 40%;
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
  height: 60%;
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

const ControlRightButtons = styled.div`
  button:first-child {
    margin-right: 5px;
  }
`;

type FeedBackItemsProps = {
  target: string;
  content: string;
  feedbackId: number;
  owner: boolean;
};

const FeedBackItems = ({
  target,
  content,
  feedbackId,
  owner,
}: FeedBackItemsProps) => {
  return (
    <FeedBackItemsStyle>
      <Card size={{ width: "80%", height: "50vh", flex: "col" }}>
        <CorrectionContainer>
          <span className="correction_title">피드백:</span>
          <h4 className="correction_sentence">{target}</h4>
        </CorrectionContainer>
        <CommentTop>
          <textarea value={content} readOnly></textarea>
        </CommentTop>
        <CommentFooter>
          {owner ? (
            <ControlRightButtons>
              <CustomButton
                text="편집"
                onClick={() => console.log("e")}
                Size={{ width: "150px", font: "15px" }}
              ></CustomButton>
              <CustomButton
                text="삭제"
                onClick={() => console.log("e")}
                Size={{ width: "150px", font: "15px" }}
              ></CustomButton>
            </ControlRightButtons>
          ) : (
            ""
          )}
        </CommentFooter>
      </Card>
    </FeedBackItemsStyle>
  );
};

export default FeedBackItems;
