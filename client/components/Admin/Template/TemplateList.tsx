import React, { useEffect } from "react";
import styled from "styled-components";
import {
  ColBox,
  Container,
  FlexBox,
  StyleCard,
  MainTitleContainer,
} from "@/styles/GlobalStyle";
import { BiPlus } from "react-icons/bi";
import { v } from "@/styles/variables";
import useTemplateManager from "../hooks/useTemplateManager";
import TemplateTitleItem from "./TemplateTitleItem";
import useUserTemplateManager from "../hooks/useUserTemplateManager";
import TemplateDetail from "./TemplateDetail";
import AddTemplate from "./AddTemplate";

const TemplateList = () => {
  const { templateList, loading, error, getTemplateList, RenderToast } =
    useTemplateManager();
  const { isAddTemplate, setIsAddTemplate } = useUserTemplateManager();

  useEffect(() => {
    getTemplateList();
  }, []);

  // if (error) return <p>Error발생</p>;

  return (
    <TemplateStlyed>
      <TemplateContainer>
        <MainTitleContainer>템플릿 만들기</MainTitleContainer>
        <Card size={{ width: `${v.xlItemWidth}`, height: "350px" }}>
          <TemplateTtileList>
            {templateList.map(item => (
              <TemplateTitleItem key={item.templateId} list={item} />
            ))}
            {!isAddTemplate && (
              <BiPlus onClick={() => setIsAddTemplate(true)}></BiPlus>
            )}
          </TemplateTtileList>
          <TemplateViewController>
            {loading && <p>로딩중</p>}
            {isAddTemplate ? (
              <AddTemplate onClose={setIsAddTemplate} />
            ) : (
              <TemplateDetail />
            )}
          </TemplateViewController>
        </Card>
      </TemplateContainer>
      <RenderToast />
    </TemplateStlyed>
  );
};

export default TemplateList;
const TemplateStlyed = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 50px 0;
  background-color: red;
`;

const TemplateContainer = styled(Container)`
  display: flex;
  flex-direction: column;;
  align-items: center;
`

const Card = styled(StyleCard)`
  @media screen and (max-width: 800px) {
    ${ColBox}
    flex-direction: column-reverse;
    width: ${v.smItemWidth};
  }
`;

const TemplateTtileList = styled.div`
  ${ColBox}
  justify-content: center;
  gap: 8px;
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

  @media screen and (max-width: 800px) {
    border-right: 0px;
    width: 100%;
    height: 50%;
  }
`;

const TemplateViewController = styled.div`
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
