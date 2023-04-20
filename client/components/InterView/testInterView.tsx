import React, { useRef, useEffect, useState } from "react";

interface InterviewProps {
  questions: string[];
  interviewName: string;
}

const TextInterview = ({ questions, interviewName }: InterviewProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const autoDownloadRef = useRef<HTMLAnchorElement>(null);
  const endInterviewRef = useRef<HTMLAnchorElement>(null);
  const [currentIdx, setCurrentIdx] = useState<number>(0);

  useEffect(() => {
    canRead();
  }, []);

  const canRead = () => {
    if (
      typeof SpeechSynthesisUtterance === "undefined" ||
      typeof window.speechSynthesis === "undefined"
    ) {
      alert("이 브라우저에서 테스트가 불가능합니다.");
      if (endInterviewRef.current) {
        endInterviewRef.current.href = "/interview/test";
        endInterviewRef.current.click();
      }
    } else {
      initGuide();
      startVideo();
    }
  };

  const initGuide = () => {
    // Implement the initialization logic here.
  };

  const startVideo = () => {
    const video = videoRef.current;

    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then(function (stream) {
          if (video) {
            video.srcObject = stream;
          }
        })
        .catch(function (error) {
          console.log("Something went wrong!");
        });
    }
  };

  const [guide, setGuide] = useState<{
    imgPath: string;
    msg: string;
    idx: number;
  } | null>(null);

  const startInterview = async (idx: number) => {
    setCurrentIdx(idx);
    setGuide(null);

    await speakSet(questions[idx]);
    showGuide("/listen.png", "문제를 읽고 있습니다.", idx);
    await speak();
    await waitSpeaking();
    await startRecording(idx);
    showGuide("/speak.png", "이제 말하세요!", idx);
  };

  const showGuide = (imgPath: string, msg: string, idx: number) => {
    setGuide({ imgPath, msg, idx });
  };

  const speakSet = async (text: string) => {
    return new Promise<void>((resolve, _reject) => {
      const synth = window.speechSynthesis;
      synth.cancel(); // Cancel any ongoing speech synthesis

      const speechMsg = new SpeechSynthesisUtterance();
      speechMsg.text = text;
      speechMsg.rate = 1; // Speed: 0.1 ~ 10
      speechMsg.pitch = 0.5; // Pitch: 0 ~ 2
      speechMsg.lang = "ko-KR";

      resolve();
    });
  };

  const speak = async () => {
    return new Promise<void>((resolve, _reject) => {
      if (guide) {
        const synth = window.speechSynthesis;
        const speechMsg = new SpeechSynthesisUtterance();
        speechMsg.text = guide.msg;
        speechMsg.rate = 1;
        speechMsg.pitch = 0.5;
        speechMsg.lang = "ko-KR";

        speechMsg.onend = () => {
          resolve();
        };

        synth.speak(speechMsg);
      }
    });
  };

  const waitSpeaking = async () => {
    return new Promise<void>(resolve => {
      const synth = window.speechSynthesis;
      const check = () => {
        if (!synth.speaking) {
          resolve();
        } else {
          setTimeout(check, 50);
        }
      };
      check();
    });
  };

  const finishWait = () => {
    return new Promise<void>(resolve => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
  };
  const startRecording = async (idx: number) => {
    // chunks = []; // Always start with a new recording
    // recorder = new MediaRecorder(video.srcObject as MediaStream);
    // recorder.onstop = () => {
    //   downloadVideo(idx);
    // };
    // recorder.ondataavailable = (e) => {
    //   chunks.push(e.data);
    // };
    // recorder.start();
  };

  const downloadVideo = (idx: number) => {
    // const recordedBlob = new Blob(chunks, { type: "video/mp4" });
    // const downloadUrl = URL.createObjectURL(recordedBlob);
    // const downloadLink = document.createElement("a");
    // downloadLink.href = downloadUrl;
    // downloadLink.download = `${interviewName}_질문_${idx + 1}.mp4`;
    // downloadLink.click();
  };

  const btnControl = (idx: number) => {
    let btnValue = "다음문제";
    if (idx === questions.length - 1) {
      btnValue = "면접종료";
    }
  };

  const processVideo = async (idx: number) => {
    await finishWait();
    await startRecording(idx);
    await downloadVideo(idx);
    btnControl(idx);
  };

  const handleStartClick = async () => {
    await startInterview(currentIdx);
  };

  const handleNextClick = async () => {
    await processVideo(currentIdx + 1);
    setCurrentIdx(prevIdx => prevIdx + 1);
  };

  return (
    <div>
      <div>
        {/* 여기에 안내 메시지, 이미지 및 현재 웹캠 화면을 렌더링하세요. */}
      </div>
      <video ref={videoRef}></video>
      <button onClick={() => startInterview(currentIdx)}>다음</button>
    </div>
  );
};
export default TextInterview;
