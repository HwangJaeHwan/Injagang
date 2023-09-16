import { IGetTemplate } from "@/types/template/TemplateType";
import React from "react";
import useUserTemplateManager from "../hooks/useUserTemplateManager";

interface TemplateItemProps {
  list: IGetTemplate;
}

const TemplateItem = ({ list }: TemplateItemProps) => {
  const { setItemInfo } = useUserTemplateManager();

  return (
    <div className="template_Item" onClick={() => setItemInfo(list)}>
      {list.title}
    </div>
  );
};

export default TemplateItem;
