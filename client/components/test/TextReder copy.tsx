import React, { useState, useEffect } from "react";

type TextToSpeechProps = {
  speechData: string[];
};

const TextToSpeech = ({ speechData }: TextToSpeechProps) => {
  const [curIndex, setCurIndex] = useState<number>(0);
  const [isStope, setIsStop] = useState<boolean>(false);
  /**입력받은 스피치 데이터를 순차적으로 읽어준다.speakText를 재귀적호출로 실행하여 끝에 도달하면 실행을 종료한다. */
  // const handleSpeak = () => {
  //   const speakText = (index: number) => {
  //     if (index < speechData.length) {
  //       const utterance = new SpeechSynthesisUtterance(speechData[index]);
  //       window.speechSynthesis.speak(utterance);
  //       utterance.onend = () => {
  //         setTimeout(() => {
  //           setCurIndex(index);
  //           const nextIndex = index + 1;
  //           speakText(nextIndex);
  //         }, 500);
  //       };
  //     } else {
  //       setCurIndex(0);
  //     }
  //   };
  //   speakText(curIndex);
  // };
  useEffect(() => {
    handleSpeak()
  },[])

  const handleSpeak = () => {
    if (curIndex < speechData.length) {
      const utterance = new SpeechSynthesisUtterance(speechData[curIndex]);
      window.speechSynthesis.speak(utterance);
      setCurIndex(curIndex+1);
    } else {
      setCurIndex(0);
    }
  };

  const handleStop = () => {
    window.speechSynthesis.cancel();
    setIsStop(true);
  };

  return (
    <div>
      <button onClick={handleSpeak}>음성으로 듣기</button>
      <button onClick={handleStop}>정지</button>
    </div>
  );
};

export default TextToSpeech;
