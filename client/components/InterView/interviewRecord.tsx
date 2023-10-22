import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootReducerType } from "../redux/store";
import InterViewSlider from "./InterViewSlider";
import CustomButton from "../UI/CustomButton";
import Image from "next/image";
import interViewimg from "../../assets/images/interView.svg";
import interViewin from "../../assets/images/interviewIn.svg";
import { v } from "@/styles/variables";
import { ColBox, FlexBox } from "@/styles/GlobalStyle";
import useMediaRecord from "@/hooks/useMediaRecord";
import useWebSpeech from "@/hooks/useWebSpeech";
import VideoController from "./Video/VideoController";
import RenderVideoInfo from "./Video/RenderVideoInfo";

const InterviewRecord = () => {
  const [curIndex, setCurIndex] = useState<number>(0);
  const [changeImg, setChangeImg] = useState<boolean>(false);
  const [isResult, setIsResult] = useState<boolean>(false);
  const [videoIndex, setVideoIndex] = useState<number>(0);

  const userList = useSelector(
    (state: RootReducerType) => state.userInterViewList.interViewList,
  );

  const randomList = useSelector(
    (state: RootReducerType) => state.interViewQuestion.randomList,
  );

  const { setSpeechData, readingTheScript, speechData } = useWebSpeech(
    2000,
    [],
  );

  useEffect(() => {
    setSpeechData([...randomList.map(a => a.questions), ...userList]);
  }, [userList, randomList]);

  const {
    videoRef,
    handleRecord,
    handlePauseRecord,
    handleResumeRecord,
    handleRecordRemove,
    isPaused,
    isRecord,
    recordedChunks,
  } = useMediaRecord();

  const handleSpeak = async (): Promise<void> => {
    if (!isRecord) {
      setChangeImg(!changeImg);
      if (curIndex < speechData.length) {
        await readingTheScript(curIndex);
        setCurIndex(curIndex + 1);
      } else {
        setCurIndex(0);
      }
      handleRecord();
    } else {
      handleRecordRemove();
    }
  };

  const RecordMainBtn = () => (
    <button className={"record_btn"} onClick={handleSpeak}>
      {!isRecord && "I'm ready to record"}
    </button>
  );

  return (
    <RecordStyle>
      <RecordContainer isResult={isResult}>
        <Image
          className={"interView_img"}
          src={interViewin}
          alt="interView"
        />
        <Camera>
          {!isResult ? (
            <video autoPlay muted ref={videoRef}></video>
          ) : (
            recordedChunks.length > 0 && (
              <InterViewSlider
                idx={videoIndex}
                video={recordedChunks}
                question={speechData}
              />
            )
          )}

          {isRecord ? (
            <VideoController
              isPaused={isPaused}
              handleResumeRecord={handleResumeRecord}
              handlePauseRecord={handlePauseRecord}
              handleSpeak={handleSpeak}
            />
          ) : (
            <RecordMainBtn />
          )}
        </Camera>
      </RecordContainer>
      <Result>
        {speechData.length > 0 && (
          <RenderVideoInfo
            numQuestions={speechData.length}
            curIndex={videoIndex}
          />
        )}
        {recordedChunks.length > 0 && (
          <ResultContainer>
            <CustomButton
              text="< 이전영상"
              onClick={() =>
                setVideoIndex(prevIndex =>
                  prevIndex <= 1 ? 0 : videoIndex - 1,
                )
              }
              Size={{ width: "150px", font: "15px" }}
            />
            <CustomButton
              text="결과확인"
              onClick={() => setIsResult(!isResult)}
              Size={{ width: "150px", font: "15px" }}
            ></CustomButton>
            <CustomButton
              text="다음영상>"
              onClick={() =>
                setVideoIndex(prevIndex =>
                  prevIndex >= recordedChunks.length - 1 ? 0 : videoIndex + 1,
                )
              }
              Size={{ width: "150px", font: "15px" }}
            ></CustomButton>
          </ResultContainer>
        )}
      </Result>
    </RecordStyle>
  );
};

export default InterviewRecord;
const RecordStyle = styled.div`
  ${ColBox}
  margin: 20px;
  gap: 20px;
  width: 90%;
  height: 100%;
  box-shadow: ${v.boxShadow2};
`;

const RecordContainer = styled.div<{ isResult: boolean }>`
  position: relative;
  display: flex;
  flex-grow: 1;
  width: ${v.lgItemWidth};
  height: 60%;
  border: ${({ isResult }) => !isResult && "2px solid #e0e0e0"};
  border-radius: 15px;
  overflow: hidden;

  .interView_img {
    display: ${({ isResult }) => (isResult ? "none" : "block")};
    position: relative;
    width: 100%;
    height: 80%;
    object-fit: cover;
  }

  video {
    width: 100%;
    height: ${({ isResult }) => (isResult ? "75%" : "100%")};
    object-fit: cover;
  }

  @media screen and (max-width: 800px) {
    width: ${v.smItemWidth};
    video {
      height: ${({ isResult }) => (isResult ? "65%" : "100%")};
    }
  }
`;

const Camera = styled.div`
  ${FlexBox}
  position: absolute;
  width: 100%;
  height: 100%;

  .record_btn {
    position: absolute;
    bottom: 25px;
    left: 35px;

    border: none;
    outline: none;

    padding: 10px 20px;
    background-image: linear-gradient(to right, #252427, #362f31);
    color: #fff;
    font-size: 22px;
    font-weight: 600;
    border-radius: 25px;
    transition: 0.3s;
    cursor: pointer;
    &:hover {
      scale: 1.05;
    }
  }
`;

const Result = styled.div`
  ${ColBox}
  align-items: flex-start;
  gap: 15px;
  width: 100%;
  height: 35%;
  padding: 10px 0;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.05);
`;

const ResultContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 90%;
  gap: 10px;
`;
