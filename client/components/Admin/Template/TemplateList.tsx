import React from "react";
import styled from "styled-components";
import { ColBox, FlexBox } from "@/styles/GlobalStyle";
import { BiPlus } from "react-icons/bi";
import TemplateQuestionAdd from "./TemplateQuestionAdd";
import useTemplateManager from "../hooks/useTemplateManager";
import TemplateTitleItem from "./TemplateTitleItem";
import useUserTemplateManager from "../hooks/useUserTemplateManager";
import TemplateDetail from "./TemplateDetail";

const TemplateList = () => {
  const { templateList } = useTemplateManager();
  const { isAddTemplate, setIsAddTemplate } = useUserTemplateManager();

  return (
    <TemplateStlyed>
      <Card>
        <TemplateTtileList>
          {templateList.map(item => (
            <TemplateTitleItem key={item.templateId} list={item} />
          ))}
          {!isAddTemplate && (
            <BiPlus onClick={() => setIsAddTemplate(true)}></BiPlus>
          )}
        </TemplateTtileList>
        <TemplateViewController>
          {isAddTemplate ? <TemplateQuestionAdd /> : <TemplateDetail />}
        </TemplateViewController>
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
