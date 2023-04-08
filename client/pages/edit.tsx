import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { ColBox } from "@/styles/GlobalStyle";
import { useRouter } from "next/router";
import { getTemplate } from "@/components/redux/Template/actions";
import { readEssayList } from "@/components/redux/Essay/actions";
import QuestionEditor from "@/components/Edit/QuestionEditor";
import { useDispatch } from "react-redux";

const EditStyle = styled.div`
  ${ColBox}
  width: 100%;
`;

const Edit = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isEdit, setIsEdit] = useState<boolean>(false);

  /** 최초 렌더링시 MyList 수정모드인지 생성모드인지 구분역할 */
  useEffect(() => {
    if (router.query.essayId) {
      const essayId = JSON.parse(router.query.essayId as string) as number;
      setIsEdit(true);
      dispatch(readEssayList(essayId));
      return;
    }
    dispatch(getTemplate());
  }, []);

  return (
    <EditStyle>
      <QuestionEditor isEdit={isEdit} />
    </EditStyle>
  );
};

export default Edit;
