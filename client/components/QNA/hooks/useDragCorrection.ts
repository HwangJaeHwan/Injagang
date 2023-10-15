import { ERROR_MESSAGES, MODAL_MESSAGES } from "@/constants";
import useModal from "@/hooks/useModal";
import React, { useEffect, useState } from "react";

const useDragCorrection = () => {
  const { setModal, Modal } = useModal();
  const [selectedText, setSelectedText] = useState({
    selectedText: "",
    start: 0,
    end: 0,
    added: false,
  });

  const handleCorrection = () => {
    const selected = window.getSelection()?.toString();
    if (selected)
      selectedText.added ? showWarring() : changeCorrection(selected);
  };

  const changeCorrection = (selectedText: string) => {
    const range = window.getSelection()?.getRangeAt(0);
    const start = range?.startOffset || 0;
    const end = range?.endOffset || 0;

    setSelectedText({
      selectedText,
      start,
      end,
      added: true,
    });
    return
  };

  const showWarring = () => {
    setModal({
      contents: {
        title: MODAL_MESSAGES.WARNING,
        content: ERROR_MESSAGES.DUPLICATION_TEXT,
      },
    });
  };

  const removeCorrection = () => {
    setSelectedText({
      selectedText: "",
      start: 0,
      end: 0,
      added: false,
    });
  };

  return { handleCorrection, removeCorrection, selectedText, Modal, setModal };
};

export default useDragCorrection;
