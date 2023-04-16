import React from "react";
import InterviewRecord from "@/components/InterView/interviewRecord";
import InterViewListView from "@/components/InterView/InterViewListView";
import styled from "styled-components";
import { ColBox } from "@/styles/GlobalStyle";
import InterViewSetting from "@/components/InterView/InterViewSetting";

const InterViewStyle = styled.div`
  ${ColBox}
`;

const Interview = () => {
  return (
    <InterViewStyle>
      <InterviewRecord />
      <InterViewListView></InterViewListView>
      <InterViewSetting></InterViewSetting>
    </InterViewStyle>
  );
};

export default Interview;
