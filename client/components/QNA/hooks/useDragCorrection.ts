import { ERROR_MESSAGES, MODAL_MESSAGES } from "@/constants";

import useModal from "@/hooks/useModal";

import { useState } from "react";

export interface ISelectedText {
  dragTitleId: number;
  targetId: number;
  selectedText: string;
  start: number;
  end: number;
  added: boolean;
}

const useDragCorrection = () => {
  const { setModal, Modal } = useModal();
  const [selectedText, setSelectedText] = useState<ISelectedText>({
    dragTitleId: 0,
    targetId: 0,
    selectedText: "",
    start: 0,
    end: 0,
    added: false,
  });

  const handleCorrection = (dragTitleId: number, targetId: number) => {
    const selected = window.getSelection()?.toString();
    const isSelected = selected !== "" && selectedText.added;
    if (selected)
      isSelected
        ? showWarring()
        : changeCorrection(selected, dragTitleId, targetId);
  };

  const changeCorrection = (
    selectedText: string,
    dragTitleId: number,
    targetId: number,
  ) => {
    const range = window.getSelection()?.getRangeAt(0);
    const start = range?.startOffset || 0;
    const end = range?.endOffset || 0;

    setSelectedText({
      dragTitleId,
      targetId,
      selectedText,
      start,
      end,
      added: true,
    });
    return;
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
      dragTitleId: 0,
      targetId: 0,
      selectedText: "",
      start: 0,
      end: 0,
      added: false,
    });
  };

  return { handleCorrection, removeCorrection, selectedText, Modal, setModal };
};

export default useDragCorrection;
