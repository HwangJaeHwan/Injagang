import React, { useState } from "react";
import InterviewRecord from "@/components/InterView/interviewRecord";
import InterViewListView from "@/components/InterView/InterViewListView";
import styled from "styled-components";
import { ColBox, FlexBox } from "@/styles/GlobalStyle";
import InterViewRandomSetting from "@/components/InterView/InterViewRandomSetting";
import CustomButton from "@/components/UI/CustomButton";
import { BiArrowBack } from "react-icons/bi";
import ArrowAnimation from "@/components/InterView/InterViewMenual";
import Image from "next/image";
import interViewimg from "@/assets/images/interView.svg";
import { v } from "@/styles/variables";

const InterViewStyle = styled.div`
  ${ColBox}
  height: 100vh;
  width: 80vw;
`;

const Menual = styled.div`
  ${ColBox}
  margin:50px;
  width: 100%;
  height: 100%;
  .interViewImg_box {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 60%;
    height: 60%;
  }
  img {
    width: 100%;
    height: 100%;
    border-radius: 12px;
    background-color: #fff;
  }
  @media screen and (max-width: 800px) {
    .interViewImg_box {
      width: 85%;
      height: 100%;
    }
  }
`;

const ControlBtn = styled.div`
  ${FlexBox}
  width: ${v.lgItemWidth};
  gap: 8px;
  @media screen and (max-width: 800px) {
    width: ${v.smItemWidth};
  }
`;

const RecordComponent = styled.div`
  ${ColBox}
  width: 100%;
  height: 80%;
`;

const renderComponent = (nextBtn: number) => {
  switch (nextBtn) {
    case 1:
      return <InterViewListView />;
    case 2:
      return <InterViewRandomSetting />;
    case 3:
      return <InterviewRecord />;
    default:
      return null;
  }
};

const Interview = () => {
  const [curIndex, setCurIndex] = useState<number>(0);
  const [btnText, setBtnText] = useState([
    "면접영상촬영시작",
    "나만의 질문 리스트 셋팅",
    "랜덤 배치 리스트 셋팅",
    "면접 시작 ",
  ]);

  const handleChangeScreen = () => {
    setCurIndex(prevIndex => (prevIndex >= 3 ? 1 : prevIndex + 1));
  };

  const handleChangePrevScreen = () => {
    setCurIndex(prevIndex => (prevIndex <= 0 ? 0 : prevIndex - 1));
  };

  return (
    <InterViewStyle>
      {
        <ControlBtn>
          {curIndex > 1 && (
            <CustomButton
              onClick={handleChangePrevScreen}
              text={<BiArrowBack />}
              Size={{ width: "50px", font: "22px" }}
            ></CustomButton>
          )}
          <CustomButton
            className="Arrow_btn"
            onClick={handleChangeScreen}
            text={btnText[curIndex]}
            Size={{ width: "90%", font: "20px" }}
          ></CustomButton>
        </ControlBtn>
      }
      {curIndex === 0 && (
        <Menual>
          <ArrowAnimation targetId="Arrow_btn" />
          <div className="interViewImg_box">
            <Image src={interViewimg} alt="interView" />
          </div>
        </Menual>
      )}
      <RecordComponent>{renderComponent(curIndex)}</RecordComponent>
    </InterViewStyle>
  );
};

export default Interview;
