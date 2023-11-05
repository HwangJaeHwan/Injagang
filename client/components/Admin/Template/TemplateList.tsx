import React from "react";
import styled from "styled-components";
import { ColBox, StyleCard, MainTitleContainer } from "@/styles/GlobalStyle";
import { v } from "@/styles/variables";
import useTemplateManager from "../hooks/useTemplateManager";
import TemplateTitleList from "./TemplateTitle/TemplateTitleList";
import TemplateViewController from "./TemplateDetail/TemplateViewController";

const TemplateList = () => {
  const { RenderToast } = useTemplateManager();

  return (
    <TemplateStlyed>
      <MainTitleContainer>템플릿 만들기</MainTitleContainer>
      <TemplateContainer>
        <Card size={{ width: `${v.xlItemWidth}`, height: "350px" }}>
          <TemplateTitleList />
        </Card>
        <Card size={{ width: `${v.xlItemWidth}`, height: "350px" }}>
          <TemplateViewController />
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
`;

const TemplateContainer = styled.div`
  display: flex;
  @media screen and (max-width: 1200px) {
    ${ColBox}
  }
`;

const Card = styled(StyleCard)`
  margin-bottom: 8px;
  @media screen and (max-width: 800px) {
    ${ColBox}
    flex-direction: column-reverse;
    width: ${v.smItemWidth};
  }
`;
