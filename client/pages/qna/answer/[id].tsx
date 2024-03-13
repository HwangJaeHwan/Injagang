import React, { useEffect } from "react";

import { useRouter } from "next/router";

import styled from "styled-components";

import { useDispatch } from "react-redux";

import AnswerLayout from "@/components/QNA/Answer/AnswerLayout";
import { getBoardDetail } from "@/components/redux/QnA/actions";

import { ColBox } from "@/styles/GlobalStyle";

const ViewStyle = styled.div`
  ${ColBox}
  width: 100%;
  height: 100vh;
`;

const answer = () => {
  const router = useRouter();
  const boardId = router.query;
  const dispatch = useDispatch();
  useEffect(() => {
    if (!isNaN(Number(boardId.id))) {
      dispatch(getBoardDetail(Number(boardId.id)));
    }
  }, [router.query]);

  return (
    <ViewStyle>
      <AnswerLayout />
    </ViewStyle>
  );
};

export default answer;
