import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { ColBox, FlexBox } from "@/styles/GlobalStyle";
import { BiPlus, BiTrash } from "react-icons/bi";
import TemplateQuestionAdd from "./TemplateQuestionAdd";

import { useSelector, useDispatch } from "react-redux";
import {
  initTemplate,
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

const TemplateView = () => {
  const [curTemplateList, setCurTemplateList] = useState<string[]>([]);
  const [isAddContent, setIsAddContent] = useState<boolean>(false);
  const [curIndex, setCurIndex] = useState(0);
  const dispatch = useDispatch();
  const templateReducer: InitiaState = useSelector(
    (state: RootReducerType) => state.template,
  );

  const handleList = (qnaList: string[] = [], index: number) => {
    setCurTemplateList([...qnaList]);
    setCurIndex(index);
    console.log(curIndex);
  };

  const handleRemoveList = async () => {
    dispatch(removeTemplate(curIndex));
    setCurTemplateList([]);
  };

  useEffect(() => {
    dispatch(initTemplate());
  }, []);

  return (
    <TemplateStlyed>
      <Card>
        <TitleView>
          {templateReducer.templateList.map((list, index) => (
            <div key={index}>
              <div onClick={() => handleList(list.qnaList, list.templateId)}>
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
                <div style={{ color: "red" }}>현재의 리스트가 없습니다.</div>
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
