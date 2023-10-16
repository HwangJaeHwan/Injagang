import React, { useEffect } from "react";
import styled from "styled-components";
import { ColBox } from "@/styles/GlobalStyle";
import AnswerWirte from "@/components/QNA/Answer/AnswerWirte";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { getBoardDetail } from "@/components/redux/QnA/actions";

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
      <AnswerWirte />
    </ViewStyle>
  );
};

export default answer;
