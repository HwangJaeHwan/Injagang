import React from "react";
import InterviewRecord from "@/components/InterView/interviewRecord";
import InterViewListView from "@/components/InterView/InterViewListView";
import styled from "styled-components";
import { ColBox } from "@/styles/GlobalStyle";

const InterViewStyle = styled.div`
  ${ColBox}
`;

const Interview = () => {
  return (
    <InterViewStyle>
      <InterviewRecord />
      <InterViewListView></InterViewListView>
    </InterViewStyle>
  );
};

export default Interview;
