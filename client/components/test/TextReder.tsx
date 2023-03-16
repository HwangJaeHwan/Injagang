import React, { useState } from "react";

const TextToSpeech = () => {

  const handleSpeak = () => {
    const utterance = new SpeechSynthesisUtterance("자신의 장단점에 대해 말씀해주세요");
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div>
      <button onClick={handleSpeak}>음성으로 듣기</button>
    </div>
  );
};

export default TextToSpeech;
