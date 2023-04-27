import React, { useState, useEffect } from "react";

import styled from "styled-components";
import { ColBox, FlexBox } from "@/styles/GlobalStyle";
import { BiPlus, BiTrash } from "react-icons/bi";
import TemplateQuestionAdd from "./TemplateQuestionAdd";

import { useSelector, useDispatch } from "react-redux";
import {
  getTemplate,
  removeTemplate,
} from "@/components/redux/Template/actions";
import { RootReducerType } from "@/components/redux/store";
import { InitiaState } from "@/components/redux/Template/reducer";

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
/**템플릿 현재의 상태를 보여주기*/
const TemplateView = () => {
  const [curTemplateList, setCurTemplateList] = useState<string[]>([]);
  // 뷰모드&추가모드를구분짓는 역할
  const [isAddContent, setIsAddContent] = useState<boolean>(false);
  const [curIndex, setCurIndex] = useState(0);
  const dispatch = useDispatch();
  const templateReducer: InitiaState = useSelector(
    (state: RootReducerType) => state.template,
  );

  /**현재선택된 템플릿리스트정보를 저장하기위한 함수 */
  const handleList = (qnaList: string[] = [], index: number) => {
    setCurTemplateList([...qnaList]);
    setCurIndex(index);
  };

  /**현재선택된 템플릿리스트 삭제요청을 위한 함수 */
  const handleRemoveList = async () => {
    dispatch(removeTemplate(curIndex));
    setCurTemplateList([]);
  };

  /**최신화된 템플릿 리스트를 요청한다. */
  useEffect(() => {
    dispatch(getTemplate());
  }, []);

  return (
    <TemplateStlyed>
      <Card>
        <TitleView>
          {templateReducer.templateList.map((list, index) => (
            <div key={index}>
              <div
                className="template_Item"
                onClick={() => handleList(list.qnaList, list.templateId)}
              >
                {list.title}
              </div>
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

export default TemplateView;
