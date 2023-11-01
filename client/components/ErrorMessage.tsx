import styled from "styled-components";
import Image from "next/image";
import interViewin from "@/public/assets/interView3.png";
import { fadeIn } from "@/styles/animations";

interface ErrorMessageProps {
  message: string | undefined;
}


const ErrorContainer = styled.div`
  color: #fff;
  border: none;
  border-radius: 15px;
  padding: 30px;
  margin: 10px 0;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
  max-width: 500px;
  width: 100%;
  display: flex;
  align-items: center;
  animation: ${fadeIn} 0.7s ease;
`;

const ErrorBackgroundOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 15px;
`;

const ErrorIcon = styled.div`
  background-color: #fff;
  color: #e74c3c;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 25px;
  font-size: 28px;
  z-index: 1;
`;

const ErrorMessageText = styled.div`
  z-index: 1;
  font-size: 16px;
  font-weight: bold;
`;

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <>
      <ErrorContainer>
        <ErrorBackgroundOverlay />
        <ErrorIcon>!</ErrorIcon>
        <ErrorMessageText>{message}</ErrorMessageText>
      </ErrorContainer>
      <Image src={interViewin} alt="Interview Image" />
    </>
  );
};

export default ErrorMessage;
