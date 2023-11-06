import { IGetTemplate } from "@/types/template/TemplateType";
import React from "react";
import useUserTemplateManager from "../../hooks/useUserTemplateManager";
import styled from "styled-components";

interface TemplateItemProps {
  list: IGetTemplate;
}

const TemplateItem = ({ list }: TemplateItemProps) => {
  const { setItemInfo, selectedTemplateList } = useUserTemplateManager();
  const isSelected = list.templateId === selectedTemplateList.templateId;

  return (
    <TemplateTitle onClick={() => setItemInfo(list)} isSelected={isSelected}>
      {list.title}
    </TemplateTitle>
  );
};

export default TemplateItem;

const TemplateTitle = styled.div<{ isSelected: boolean }>`
  font-size: ${({ isSelected }) => (isSelected ? "1.4rem" : "1.2rem")};
  font-weight: bold;
  opacity: ${({ isSelected }) => (isSelected ? 1 : 0.2)};
  border-radius: 12px;
  transition: all ease-in 0.2s;
  cursor: pointer;
`;
