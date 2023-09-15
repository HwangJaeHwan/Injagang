import { IGetTemplate } from "@/types/template/TemplateType";
import React from "react";

interface TemplateItemProps {
  list: IGetTemplate;
  handleList: (question: string[], index: number) => void;
}

const TemplateItem = ({ list, handleList }: TemplateItemProps) => {
  return (
    <div
      className="template_Item"
      onClick={() => handleList(list.questions, list.templateId)}
    >
      {list.title}
    </div>
  );
};

export default TemplateItem;
