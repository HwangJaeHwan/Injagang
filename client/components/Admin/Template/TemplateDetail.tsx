import React from "react";
import useUserTemplateManager from "../hooks/useUserTemplateManager";
import { BiTrash } from "react-icons/bi";
import useTemplateManager from "../hooks/useTemplateManager";

const TemplateDetail = () => {
  const { removeTemplateItem } = useTemplateManager();
  const { selectedTemplateList } = useUserTemplateManager();
  const isTemplateSelected = selectedTemplateList.questions.length < 1;
  const NoTemplateSelected = () => {
    return <div style={{ color: "red" }}>현재 선택된 리스트가 없습니다.</div>;
  };

  if (isTemplateSelected) return <NoTemplateSelected />;

  return (
      <div className="endTitle">
            {selectedTemplateList.questions.map((question, index) => (
              <div key={index}> {question}</div>
            ))}
            <BiTrash
              onClick={() =>
                removeTemplateItem(selectedTemplateList.templateId)
              }
            />
      </div>
  );
};

export default TemplateDetail;
