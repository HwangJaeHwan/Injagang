import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { ColBox, FlexBox } from "@/styles/GlobalStyle";
import { questionList } from "@/pages/edit";
import { BiPlus, BiEdit } from "react-icons/bi";
import TemplateQuestionAdd from "./TemplateQuestionAdd";
import TemplateQuestionEdit from "./TemplateQuestionEdit";

const TemplateStlyed = styled.div`
  ${ColBox}
  width: 100%;
`;

const Card = styled.div`
  ${FlexBox};
  padding: 15px 15px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text};
  width: 70%;
  height: 350px;
  border-radius: 8px;
  box-shadow: 1px 2px 12px rgba(0, 0, 0, 0.6);
  text-align: center;
  margin: 15px 15px;
`;

const TitleView = styled.div`
  ${ColBox}
  justify-content: center;
  width: 50%;
  height: 100%;
  border-right: 1px solid white;
  svg {
    margin-top: 10px;
    font-size: 35px;
    cursor: pointer;
  }
  svg:hover {
    color: red;
  }
`;

const QuestionView = styled.div`
  ${ColBox}
  justify-content: space-between;
  width: 50%;
  height: 100%;
  .endTitle {
    ${ColBox}
    justify-content: center;
    height: 100%;
  }
  svg {
    margin-top: 10px;
    font-size: 30px;
    cursor: pointer;
  }
  svg:hover {
    color: red;
  }
`;

interface QuestionListItem {
  title: string;
  qnaList: string[];
}

const TemplateView = () => {
  const [templateList, setTemplateList] = useState<QuestionListItem[]>([]);
  const [curTemplateList, setCurTemplateList] = useState<string[]>([]);
  const [isAddContent, setIsAddContent] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const handleList = (qnaList: string[] = []) => {
    setCurTemplateList([...qnaList]);
  };

  useEffect(() => {
    //API요청후 데이터 저장
    setTemplateList(questionList);
  }, []);

  return (
    <TemplateStlyed>
      <Card>
        <TitleView>
          {templateList &&
            templateList.map((list, index) => (
              <div key={index}>
                <div onClick={() => handleList(list.qnaList)}>{list.title}</div>
              </div>
            ))}
          {isAddContent ? (
            <></>
          ) : (
            <BiPlus onClick={() => setIsAddContent(true)}></BiPlus>
          )}
        </TitleView>
        <QuestionView>
          {isAddContent ? (
            <TemplateQuestionAdd
              setIsAddContent={setIsAddContent}
              setTemplateList={setTemplateList}
              templateList={templateList}
            />
          ) : (
            <div className="endTitle">
              {curTemplateList.length < 1 ? (
                <div style={{ color: "red" }}>현재의 리스트가 없습니다.</div>
              ) : (
                <>
                  {isEdit ? (
                    <TemplateQuestionEdit />
                  ) : (
                    curTemplateList.map((a, i) => <div key={i}> {a}</div>)
                  )}
                  <BiEdit onClick={() => setIsEdit(true)} />
                </>
              )}
            </div>
          )}
        </QuestionView>
      </Card>
    </TemplateStlyed>
  );
};

export default TemplateView;
