import React, { useEffect } from "react";

import { useRouter } from "next/router";

import styled from "styled-components";

import AnswerLayout from "@/components/QNA/Answer/AnswerLayout";

import { ColBox } from "@/styles/GlobalStyle";

import { useDispatch } from "react-redux";
import { getBoardDetail } from "@/components/redux/QnA/actions";
import { initFeedBack } from "@/components/redux/FeedBack/action";
import { initTargetFeed } from "@/components/redux/QnA/user/actions";



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
    return () => {
      dispatch(initFeedBack())
      dispatch(initTargetFeed())
    }
  }, [router.query]);

  return (
    <ViewStyle>
      <AnswerLayout />
    </ViewStyle>
  );
};

export default answer;
