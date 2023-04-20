import React from "react";
import styled from "styled-components";
import CustomButton from "../UI/CustomButton";
import { ColBox } from "@/styles/GlobalStyle";
import { saveAs } from "file-saver";

const InterViewSliderStyle = styled.div`
  ${ColBox}
`;

const InterViewInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
`;

type InterViewSliderProps = {
  video: Blob[];
  question: string[];
  idx: number;
};
const InterViewSlider = ({ video, question, idx }: InterViewSliderProps) => {
  const downloadVideo = () => {
    if (video.length > 0) {
      const url = URL.createObjectURL(video[idx]);
      fetch(url)
        .then(res => res.blob())
        .then(blob => {
          saveAs(blob, "interview_video.mp4");
          URL.revokeObjectURL(url);
        });
    }
  };
  return (
    <InterViewSliderStyle>
      <InterViewInfo>
        {<h2>질문: {question[idx]} </h2>}
        <h2>나의 대답: </h2>
      </InterViewInfo>
      <video autoPlay controls src={URL.createObjectURL(video[idx])}></video>
      <CustomButton
        text={"영상다운로드"}
        onClick={downloadVideo}
        Size={{ width: "300px", font: "20px" }}
      ></CustomButton>
    </InterViewSliderStyle>
  );
};

export default InterViewSlider;
