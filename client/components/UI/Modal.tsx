import React from "react";
import styled from "styled-components";
import CustomButton from "./CustomButton";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  contents: {
    title: string;
    qnaList: string;
  };
}


/**경고메시지를 출력하기 위한 역할 */
const Modal = ({ isOpen, onClose, contents }: ModalProps) => {
  return (
    <ModalStyle isOpen={isOpen}>
      <ModalBox>
        <div className="modal-Contents">
          <h2>{contents.title}</h2>
          <p>{contents.qnaList}</p>
        </div>
        <div className="modal-Container">
          <div className="modal-Buttons">
            <CustomButton onClick={onClose} text={"닫기"} />
          </div>
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
  z-index: 100;
  position: relative;
  height: 250px;
  width: 500px;
  padding: 10px;
  border-radius: 15px;
  background-color: #0a0a0aee;
  .modal-Contents {
    display: flex;
    flex-direction: column;
  }
  .modal-Contents h2 {
    margin-left: 15px;
    color: red;
  }
  .modal-Contents p {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #e6dfdf;
  }
  .modal-Container {
    width: 500px;
    margin: 15px 10px;
    position: absolute;
    bottom: 0;
  }
  .modal-Buttons {
    display: flex;
    justify-content: space-between;
    margin-right: 15px;
  }
`;

export default Modal;
