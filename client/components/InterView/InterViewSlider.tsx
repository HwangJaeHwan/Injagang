import React from "react";
import styled from "styled-components";

type InterViewSliderProps = {
  video: Blob[];
  question: string[];
  idx: number;
};
const InterViewSlider = ({ video, question, idx }: InterViewSliderProps) => {
  return (
    <div>
      <div>
        {<h2>질문: {question[idx]} </h2>}
        <h2>나의 대답: </h2>
        <video autoPlay controls src={URL.createObjectURL(video[idx])}></video>
      </div>
    </div>
  );
};

export default InterViewSlider;
