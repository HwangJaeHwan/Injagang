import { IGetTemplate } from "@/types/template/TemplateType";
import React from "react";
import useUserTemplateManager from "../hooks/useUserTemplateManager";
import styled from "styled-components";

interface TemplateItemProps {
  list: IGetTemplate;
}

const TemplateItem = ({ list }: TemplateItemProps) => {
  const { setItemInfo } = useUserTemplateManager();

  return (
    <TemplateTitle onClick={() => setItemInfo(list)}>
      {list.title}
    </TemplateTitle>
  );
};

export default TemplateItem;

const TemplateTitle = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
`;
