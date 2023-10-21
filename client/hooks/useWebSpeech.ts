import React, { useState } from "react";

const useWebSpeech = (waitTime = 1000, speechList: string[]) => {
  const [speechData, setSpeechData] = useState<string[]>([...speechList]);

  const wait = (duration: number): Promise<void> => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, duration);
    });
  };

  const waitSpeechEnd = (
    utterance: SpeechSynthesisUtterance,
  ): Promise<void> => {
    return new Promise(resolve => {
      utterance.onend = () => {
        resolve();
      };
    });
  };

  const readingTheScript = async (curIndex: number): Promise<void> => {
    if (curIndex < 0 || curIndex >= speechData.length) {
      throw new Error("Invalid index provided");
    }
    const utterance = new SpeechSynthesisUtterance(speechData[curIndex]);
    console.log(utterance);
    await wait(2000);
    window.speechSynthesis.speak(utterance);
    await waitSpeechEnd(utterance);
  };

  return {
    speechData,
    readingTheScript,
    setSpeechData,
  };
};

export default useWebSpeech;
