import React from "react";
import styled from "styled-components";
import CustomButton from "../UI/CustomButton";
import { ColBox, FlexBox, ScrollBar } from "@/styles/GlobalStyle";
import { saveAs } from "file-saver";
import { MdOutlineFileDownload } from "react-icons/md";
const InterViewSliderStyle = styled.div`
  ${ColBox}
  width: 100%;
  height: 100%;
  overflow-x: auto;
  ${ScrollBar}
  gap: 12px;
  font-size: 13px;
  border: 3px solid black;
  border-radius: 12px;
  video {
    width: 100%;
    height: 100%;
  }
  svg{
    font-size: 50px;
  }
  button {
    ${FlexBox}
    background-color: #777;
    opacity: 0.5;
    width: 100%;
    height: 100%;
    font-size: large;
    border-radius: 8px;
    cursor: pointer;
  }
  &:hover {
    button {
      background-color: #fff;
      opacity: 1;
    }
  }
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
      <button onClick={downloadVideo}>
        <MdOutlineFileDownload></MdOutlineFileDownload>DOWNLOAD
      </button>
    </InterViewSliderStyle>
  );
};

export default InterViewSlider;
