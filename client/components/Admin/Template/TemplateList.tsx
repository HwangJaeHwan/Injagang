import React, { useEffect } from "react";
import styled from "styled-components";
import { ColBox, FlexBox } from "@/styles/GlobalStyle";
import { BiPlus } from "react-icons/bi";
import {v} from "@/styles/variables"
import useTemplateManager from "../hooks/useTemplateManager";
import TemplateTitleItem from "./TemplateTitleItem";
import useUserTemplateManager from "../hooks/useUserTemplateManager";
import TemplateDetail from "./TemplateDetail";
import AddTemplate from "./AddTemplate";

const TemplateList = () => {
  const { templateList, loading, error, getTemplateList } =
    useTemplateManager();
  const { isAddTemplate, setIsAddTemplate } = useUserTemplateManager();

  useEffect(() => {
    getTemplateList();
  }, []);

  // if (error) return <p>Error발생</p>;

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
          {loading && <p>로딩중</p>}
          {isAddTemplate ? <AddTemplate /> : <TemplateDetail />}
        </TemplateViewController>
      </Card>
    </TemplateStlyed>
  );
};

export default TemplateList;
const TemplateStlyed = styled.div`
  ${ColBox}
  width: 100%;
  background-color: green;
`;

const Card = styled.div`
  ${FlexBox};
  padding: 15px 15px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text};
  width: ${v.mdWidth};
  height: 350px;
  border-radius: 8px;
  box-shadow: 1px 2px 12px rgba(0, 0, 0, 0.6);
  text-align: center;
  margin: 15px 15px;

  @media screen and (max-width: 800px) {
    ${ColBox}
    flex-direction: column-reverse;
    width: ${v.xsWidth}
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
