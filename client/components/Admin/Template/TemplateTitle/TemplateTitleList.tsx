import React from "react";
import styled from "styled-components";
import useTemplateManager from "../../hooks/useTemplateManager";
import useUserTemplateManager from "../../hooks/useUserTemplateManager";
import TemplateItem from "./TemplateTitleItem";
import { BiPlus } from "react-icons/bi";
import { ColBox } from "@/styles/GlobalStyle";

const TemplateTitleList = () => {
  const { templateList } = useTemplateManager();
  const { isAddTemplate, setIsAddTemplate } = useUserTemplateManager();
  return (
    <TemplateTtileContainer>
      {templateList.map(item => (
        <TemplateItem key={item.templateId} list={item} />
      ))}
      {!isAddTemplate && (
        <BiPlus onClick={() => setIsAddTemplate(true)}></BiPlus>
      )}
    </TemplateTtileContainer>
  );
};

export default TemplateTitleList;

const TemplateTtileContainer = styled.div`
  ${ColBox}
  justify-content: center;
  gap: 8px;
  width: 50%;
  height: 100%;
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
