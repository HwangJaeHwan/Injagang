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
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [modal, setModal] = useState<ModalProps>({
    onAction: () => {},
    contents: {
      title: "",
      content: "",
    },
  });

  const setModalState = useCallback(({ onAction, contents }: ModalProps) => {
    setModalOpen(true);
    setModal({ onAction, contents });
  }, []);

  const submitModal = () => {
    if (modal.onAction) modal.onAction();
    setModalOpen(false);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const Modal = () => {
    return (
      <ModalStyle isOpen={isModalOpen}>
        <ModalBox>
          <div className="modal_Contents">
            <h2>{modal.contents.title}</h2>
            <p>{modal.contents.content}</p>
          </div>
          {modal.onAction ? (
            <div className="modal_Controller">
              <CustomButton
                Size={{ width: "150px", font: "15px" }}
                onClick={submitModal}
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
    isModalOpen,
    setModalState,
    Modal,
  };
};

const ModalStyle = styled.div<{ isOpen: boolean }>`
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
