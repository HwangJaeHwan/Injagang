import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { ColBox, FlexBox } from "@/styles/GlobalStyle";
import { questionList } from "@/pages/edit";
import { BiPlus, BiEdit, BiCheck, BiTrash } from "react-icons/bi";
import TemplateQuestionAdd from "./TemplateQuestionAdd";
import { METHOD } from "@/components/test/fecher";
import fetcher from "@/components/test/fecher";
import Cookies from "js-cookie";
import { getTemplateList } from "../test/api";
import { title } from "process";

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
  const [curTitle, setCurTitle] = useState("");

  const handleList = (qnaList: string[] = [], title: string) => {
    setCurTemplateList([...qnaList]);
    setCurTitle(title);
    console.log(curTitle);
  };

  const getTemplateData = async () => {
    const templateData = await getTemplateList()
    return templateData
  };

  useEffect(() => {
    console.log(getTemplateData().then((res)=> console.log(res)))
    //API요청후 데이터 저장
    setTemplateList(questionList);
  }, []);

  const handleRemoveList = async () => {
    const removeItemIndex = templateList.findIndex(a => a.title === curTitle);
    console.log(removeItemIndex);

    const headers = {
      Authorization: Cookies.get("jwtToken"),
    };

    try {
      const response = await fetcher(
        METHOD.DELETE,
        `/template/${removeItemIndex + 1}`,
        {
          headers,
        },
      );
      if (response) {
        console.log("성공");
      }
    } catch (error) {
      console.error(error);
    }

    setTemplateList(cur => {
      const filterItem = templateList.filter(a => a.title !== curTitle);
      return filterItem;
    });
    setCurTemplateList([]);
  };

  return (
    <TemplateStlyed>
      <Card>
        <TitleView>
          {templateList &&
            templateList.map((list, index) => (
              <div key={index}>
                <div onClick={() => handleList(list.qnaList, list.title)}>
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
