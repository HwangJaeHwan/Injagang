import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { getBoardDetail } from "@/components/redux/QnA/actions";
import { InitiaState } from "@/components/redux/QnA/reducer";
import { useSelector } from "react-redux";
import { RootReducerType } from "@/components/redux/store";
import { Card, ColBox, ScrollBar } from "@/styles/GlobalStyle";
import AnswerDragView from "@/components/AnswerDragView";
import CustomButton from "@/components/UI/CustomButton";
import BoardItem from "@/components/BoardItem";
import { writeFeedback } from "@/components/redux/FeedBack/action";
import FeedBackView from "@/components/QNA/Answer/FeedBack/FeedBackView";
import EditMenuBar from "@/components/QNA/Answer/EditMenuBar";
import AnswerWirte from "@/components/QNA/Answer/AnswerWirte";

const ViewStyle = styled.div`
  ${ColBox}
  width: 80vw;
`;

const answer = () => {
  return (
    <ViewStyle>
      <AnswerWirte />
    </ViewStyle>
  );
};

export default answer;
