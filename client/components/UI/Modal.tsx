import React from "react";
import styled from "styled-components";
import CustomButton from "./CustomButton";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAction: () => void;
  contents: {
    title: string;
    content: string;
  };
}

/**경고메시지를 출력하기 위한 역할 */
const Modal = ({ isOpen, onClose, onAction, contents }: ModalProps) => {
  return (
    <ModalStyle isOpen={isOpen}>
      <ModalBox>
        <div className="modal_Contents">
          <h2>{contents.title}</h2>
          <p>{contents.content}</p>
        </div>
        <div className="modal_Controller">
          <CustomButton
            Size={{ width: "150px", font: "15px" }}
            onClick={onAction}
            text={"예"}
          />
          <CustomButton
            Size={{ width: "150px", font: "15px" }}
            onClick={onClose}
            text={"아니오"}
          />
        </div>
      </ModalBox>
    </ModalStyle>
  );
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
    text-align: center;
    color: #e6dfdf;
  }
  .modal_Controller {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 10px;
  }
`;

export default Modal;
