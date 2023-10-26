import React, { useState, useCallback, useRef, useEffect } from "react";
import useModal from "@/hooks/useModal";
import userQnaManager from "../hooks/userQnaManager";
import useFeedManager from "../hooks/useFeedManager";

const useFeedBackLogic = () => {
  const [correctionText, setCorrectionText] = useState<string>("");
  const [isFeedBackClear, setIsFeedBackClear] = useState<boolean>(false);
  const [isViolation, setIsViolation] = useState<boolean>(false);
  const textRef = useRef<HTMLTextAreaElement>(null);
  const { setModal, Modal } = useModal();
  const { selectedCorrection, dispatchInitCorrection } = userQnaManager();

  const { dispatchWriteFeedBack } = useFeedManager();
  const CORRECTION_MIN = correctionText.length < 30;
  const EMPTY_CORRECTION = selectedCorrection.targetAnswer === "";

  const handleWarring = useCallback(() => {
    setModal({
      contents: {
        title: "경고",
        content: `Target질문을 선택해주세요.
          피드백은 30자이상 작성하세요. `,
      },
    });
  }, []);

  useEffect(() => {
    if (isFeedBackClear) {
      setCorrectionText("");
      textRef.current?.focus();
    }
    if (isViolation) {
      textRef.current?.focus();
    }
  }, [isFeedBackClear, isViolation]);

  const focusTextArea = useCallback(() => {
    setIsViolation(true);
    setTimeout(() => {
      setIsViolation(false);
    }, 30);
  }, []);

  const handleClear = useCallback(() => {
    setIsFeedBackClear(true);
    setTimeout(() => {
      setIsFeedBackClear(false);
    }, 10);
  }, []);

  const handleSubmit = useCallback(() => {
    if (CORRECTION_MIN || EMPTY_CORRECTION) {
      handleWarring();
      focusTextArea();
      return;
    }
    const formatData = {
      qnaId: selectedCorrection.targetQuestionIndex,
      feedbackTarget: selectedCorrection.targetAnswer,
      feedbackContent: correctionText,
    };
    dispatchWriteFeedBack(formatData);
    dispatchInitCorrection();
    handleClear();
  }, [CORRECTION_MIN, EMPTY_CORRECTION, selectedCorrection, correctionText]);

  const handleChangeFeedBack = useCallback((feedBackText: string) => {
    setCorrectionText(feedBackText);
  }, []);

  return {
    textRef,
    correctionText,
    selectedCorrection,
    handleChangeFeedBack,
    handleSubmit,
    handleClear,
    Modal,
  };
};

export default useFeedBackLogic;
