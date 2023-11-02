import styled from "styled-components";
import Image from "next/image";
import sorry from "@/public/assets/sorry.png";
import { useRouter } from "next/router";
import { fadeIn } from "@/styles/animations";
import { ColBox } from "@/styles/GlobalStyle";

const ErrorContainer = styled.div`
  background: #fff;
  color: #333;
  border: 1px solid #e74c3c;
  border-radius: 8px;
  padding: 2rem;
  margin: 1rem 0;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  animation: ${fadeIn} 0.5s ease-out;
`;

const ErrorIcon = styled.div`
  color: #e74c3c;
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const ErrorMessageText = styled.div`
  text-align: center;
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const GoBackButton = styled.button`
  background-color: #3498db;
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  transition: background-color 0.3s ease, transform 0.3s ease;
  &:hover {
    background-color: #2980b9;
    transform: translateY(-2px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
  &:active {
    transform: translateY(1px);
    box-shadow: none;
  }
`;

const ErrorMessageStyle = styled.div`
  position: relative;
  ${ColBox}
`;

const ErrorMessage = ({ message }: { message?: string }) => {
  const router = useRouter();
  const goBack = () => {
    router.back();
  };

  return (
    <ErrorMessageStyle>
      <ErrorContainer>
        <ErrorIcon>⚠️</ErrorIcon>
        <ErrorMessageText>
          {message || "잠시후 다시 시도 해주세요"}
        </ErrorMessageText>
        <GoBackButton onClick={goBack}>Go Back</GoBackButton>
      </ErrorContainer>
      <Image
        src={sorry}
        alt="Interview Image"
        width={500}
        height={500}
      />
    </ErrorMessageStyle>
  );
};

export default ErrorMessage;
