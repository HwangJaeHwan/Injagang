import React, { useRef, useState, useEffect, useCallback } from "react";

const useMediaRecord = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [isRecord, setIsRecord] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);

  /**유저에게 권한을 요청함(캠여부) */
  const getUserAccess = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      return stream;
    } catch (error) {
      console.error("유저의 권한을 획득하지 못했습니다.", error);
      throw error;
    }
  }, []);

  const handleDataAvailable = useCallback((e: BlobEvent) => {
    if (e.data.size > 0) {
      setRecordedChunks(prev => [...prev, e.data]);
    }
  }, []);

  /**녹화촬영을 시작한다. */
  const handleRecord = useCallback(async () => {
    const stream = await getUserAccess();
    const mediaRecorder = new MediaRecorder(stream, {
      mimeType: "video/webm",
    });
    mediaRecorderRef.current = mediaRecorder;
    mediaRecorder.ondataavailable = handleDataAvailable;
    mediaRecorder.start();
    setIsRecord(true);
  }, [getUserAccess, handleDataAvailable]);

  const stopMediaTracks = useCallback((stream: MediaStream) => {
    stream.getAudioTracks().forEach(track => track.stop());
    stream.getVideoTracks().forEach(track => track.stop());
  }, []);

  /**녹화를 중지한다. */
  const handleRecordRemove = useCallback(() => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      if (videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stopMediaTracks(stream);
      }
      setIsRecord(false);
      mediaRecorderRef.current = null;
    }
  }, [stopMediaTracks]);

  /**녹화를 일시정지한다. */
  const handlePauseRecord = useCallback(() => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.pause();
      setIsPaused(true);
    }
  }, []);

  /**녹화를 재개한다. */
  const handleResumeRecord = useCallback(() => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.resume();
      setIsPaused(false);
    }
  }, []);

  /**렌더링이 종료되면 모든녹화를 정리한다. */
  useEffect(() => {
    return () => {
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stop();
        if (videoRef.current?.srcObject) {
          const stream = videoRef.current.srcObject as MediaStream;
          stopMediaTracks(stream);
        }
      }
    };
  }, [stopMediaTracks]);

  return {
    videoRef,
    handleRecord,
    handlePauseRecord,
    handleResumeRecord,
    handleRecordRemove,
    isPaused,
    isRecord,
    recordedChunks,
  };
};

export default useMediaRecord;
