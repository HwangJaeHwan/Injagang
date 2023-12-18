import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { StyleButton } from "@/styles/GlobalStyle";

export interface ModalProps {
  onAction?: (params?: any) => void | null;
  contents: {
    title: string;
    content: string;
  };
}

const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalState, setModalState] = useState<{
    modal: ModalProps | null;
  }>({
    modal: null,
  });
  const MODAL_CLOSE_DELAY = 50;

  const setModal = useCallback((modalProps: ModalProps) => {
    setIsModalOpen(true);
    setModalState({
      modal: modalProps,
    });
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const actionModal = useCallback(() => {
    closeModal();
    setTimeout(() => {
      modalState.modal?.onAction?.();
    }, MODAL_CLOSE_DELAY);
  }, [isModalOpen]);

  const Modal = () => {
    if (!isModalOpen || !modalState.modal) {
      return null;
    }

    const { title, content } = modalState.modal.contents;

    return (
      <ModalStyle isOpen={isModalOpen}>
        <ModalBox>
          <div className="modal_Contents">
            <h2>{title}</h2>
            <p>{content}</p>
          </div>
          {modalState.modal.onAction ? (
            <div className="modal_Controller">
              <StyleButton
                Size={{ width: "150px", font: "15px" }}
                onClick={actionModal}
              >
                예
              </StyleButton>
              <StyleButton
                Size={{ width: "150px", font: "15px" }}
                onClick={closeModal}
              >
                아니오
              </StyleButton>
            </div>
          ) : (
            <div className="modal_center_btn">
              <StyleButton
                Size={{ width: "250px", font: "15px" }}
                onClick={closeModal}
              >
                확인
              </StyleButton>
            </div>
          )}
        </ModalBox>
      </ModalStyle>
    );
  };

  return {
    isModalOpen,
    setModal,
    Modal,
  };
};

interface ModalStyleProps {
  isOpen: boolean;
}

const ModalStyle = styled.div<ModalStyleProps>`
  z-index: 1000;
  display: ${props => (props.isOpen ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: rgba(36, 31, 31, 0.5);
`;

const ModalBox = styled.div`
  display: flex;
  flex-direction: column;
  height: 250px;
  width: 500px;
  border-radius: 15px;
  background-color: #0a0a0aee;
  .modal_Contents {
    display: flex;
    flex-direction: column;
    height: 200px;
  }
  .modal_Contents h2 {
    color: red;
    margin: 20px;
  }
  .modal_Contents p {
    margin-top: 20px;
    text-align: center;
    color: #e6dfdf;
  }
  .modal_Controller {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 10px;
  }
  .modal_center_btn {
    display: flex;
    justify-content: center;
    width: 100%;
    padding: 10px;
  }
`;

export default useModal;
