import React, { useCallback, useState } from "react";
import styled from "styled-components";
import CustomButton from "@/components/UI/CustomButton";

interface ModalProps {
  onAction?: () => void;
  contents: {
    title: string;
    content: string;
  };
}

const useModal = () => {
  const [modalState, setModalState] = useState<{ isModalOpen: boolean, modal: ModalProps | null }>({
    isModalOpen: false,
    modal: null
  });

  const setModal = useCallback((modalProps: ModalProps) => {
    setModalState({
      isModalOpen: true,
      modal: modalProps
    });
  }, []);

  const closeModal = useCallback(() => {
    setModalState(prevState => ({ ...prevState, isModalOpen: false }));
  }, []);

  const Modal = () => {
    if (!modalState.isModalOpen || !modalState.modal) {
      return null;
    }
    
    const { title, content } = modalState.modal.contents;
    
    return (
      <ModalStyle isOpen={modalState.isModalOpen}>
        <ModalBox>
          <div className="modal_Contents">
            <h2>{title}</h2>
            <p>{content}</p>
          </div>
          {modalState.modal.onAction ? (
            <div className="modal_Controller">
              <CustomButton
                Size={{ width: "150px", font: "15px" }}
                onClick={() => {
                  modalState.modal?.onAction?.();
                  closeModal();
                }}
                text={"예"}
              />
              <CustomButton
                Size={{ width: "150px", font: "15px" }}
                onClick={closeModal}
                text={"아니오"}
              />
            </div>
          ) : (
            <div className="modal_center_btn">
              <CustomButton
                Size={{ width: "250px", font: "15px" }}
                onClick={closeModal}
                text={"확인"}
              />
            </div>
          )}
        </ModalBox>
      </ModalStyle>
    );
  };

  return {
    isModalOpen: modalState.isModalOpen,
    setModal,
    Modal,
  };
};

interface ModalStyleProps {
  isOpen: boolean;
}

const ModalStyle = styled.div<ModalStyleProps>`
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
