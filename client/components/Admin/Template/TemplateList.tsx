import React, { useState } from "react";

import styled from "styled-components";
import { ColBox, FlexBox } from "@/styles/GlobalStyle";
import { BiPlus, BiTrash } from "react-icons/bi";
import TemplateQuestionAdd from "./TemplateQuestionAdd";
import useSelectedIndex from "@/hooks/useSelectedIndex";
import useTemplateManager from "../hooks/useTemplateManager";
import TemplateItem from "./TemplateItem";

/**템플릿 현재의 상태를 보여주기*/
const TemplateList = () => {
  const [curTemplateList, setCurTemplateList] = useState<string[]>([]);
  // 뷰모드&추가모드를구분짓는 역할
  const [isAddContent, setIsAddContent] = useState<boolean>(false);
  const [curIndex, changeCurIndex] = useSelectedIndex(0);
  const { templateList, removeTemplateItem } = useTemplateManager();

  /**현재선택된 템플릿리스트정보를 저장하기위한 함수 */
  const handleList = (qnaList: string[] = [], index: number) => {
    setCurTemplateList([...qnaList]);
    changeCurIndex(index);
  };

  /**현재선택된 템플릿리스트 삭제요청을 위한 함수 */
  const handleRemoveList = async () => {
    removeTemplateItem(curIndex);
    setCurTemplateList([]);
  };

  return (
    <TemplateStlyed>
      <Card>
        <TemplateTtileList>
          {templateList.map((list, index) => (
            <TemplateItem
              key={list.templateId}
              list={list}
              handleList={handleList}
            />
          ))}
          {!isAddContent && (
            <BiPlus onClick={() => setIsAddContent(true)}></BiPlus>
          )}
        </TemplateTtileList>
        <QuestionView>
          {isAddContent ? (
            <TemplateQuestionAdd setIsAddContent={setIsAddContent} />
          ) : (
            <div className="endTitle">
              {curTemplateList.length < 1 ? (
                <div style={{ color: "red" }}>
                  현재 선택된 리스트가 없습니다.
                </div>
              ) : (
                <>
                  {curTemplateList.map((question, index) => (
                    <div key={index}> {question}</div>
                  ))}
                  <BiTrash onClick={handleRemoveList} />
                </>
              )}
            </div>
          )}
        </QuestionView>
      </Card>
    </TemplateStlyed>
  );
};

export default TemplateList;
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

  @media screen and (max-width: 800px) {
    ${ColBox}
    flex-direction: column-reverse;
  }
`;

const TemplateTtileList = styled.div`
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
  .template_Item {
    cursor: pointer;
  }

  @media screen and (max-width: 800px) {
    border-right: 0px;
    width: 100%;
    height: 50%;
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
  @media screen and (max-width: 800px) {
    width: 100%;
    height: 50%;
    border-bottom: 1px solid white;
  }
`;
