import React from "react";

import styled, { keyframes, css } from "styled-components";

import Image from "next/image";

import ArrrowDown from "../UI/ArrrowDown";

import goodInterView from "@/public/assets/main.jpg";

const Main = () => {
  return (
    <BannerContainer>
      <MainTitle>"인터뷰와 자소서를 강하게 어필하자"</MainTitle>
      <SubTitle>"당신을 서포트 하겠습니다."</SubTitle>
      <ImageContainer>
        <Image
          src={goodInterView}
          alt="Interview Image"
          width={700}
          height={600}
          placeholder="blur"
        />
      </ImageContainer>
      <ArrrowDown />
    </BannerContainer>
  );
};

export default Main;
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;
const fadeInUpOpacity = css`
  opacity: 0;
  animation: ${fadeInUp} 0.5s ease forwards;
`;

const BannerContainer = styled.div`
  will-change: transform, opacity;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  ${fadeInUpOpacity}
`;

const MainTitle = styled.h2`
  font-size: 2.5rem;
  ${fadeInUpOpacity}
  animation-delay: 0.2s;
`;

const SubTitle = styled.h3`
  font-size: 2rem;
  ${fadeInUpOpacity}
  animation-delay: 0.4s;
`;
const ImageContainer = styled.div`
  border: 1px solid #ddd;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 10px;
  border-radius: 10px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  margin-top: 3rem;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  }
`;
