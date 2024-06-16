import React, { useState } from "react";

import Image, { StaticImageData } from "next/image";

import styled, { keyframes, css } from "styled-components";

import ArrrowDown from "../UI/ArrrowDown";

import useSectionObsever from "@/hooks/useSectionObsever";


interface MnualItemsProps {
  mainTitle: string;
  subTitle: string;
  isArrow: boolean;
  imageList: StaticImageData[];
}

const ManualItems = ({
  mainTitle,
  subTitle,
  isArrow,
  imageList,
}: MnualItemsProps) => {
  const [isShow, setIsShow] = useState<boolean>(false);
  const { targetItemRef } = useSectionObsever(() => {
    !isShow && setIsShow(true);
  }, 0.5);
  return (
    <BannerContainer ref={targetItemRef} isShow={isShow}>
      <MainTitle isShow={isShow}>{mainTitle}</MainTitle>
      <SubTitle isShow={isShow}>{subTitle}</SubTitle>
      {imageList.map((image, index) => (
        <ImageContainer key={index}>
          <Image
            src={image}
            alt="Interview Image"
            width={700}
            height={600}
            placeholder="blur"
            style={{ objectFit: "cover" }}
          />
        </ImageContainer>
      ))}
      {isArrow && <ArrrowDown />}
    </BannerContainer>
  );
};

export default React.memo(ManualItems);

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
const fadeInUpOpacity = css<{ isShow: boolean }>`
  opacity: 0;
  animation: ${props =>
    props.isShow
      ? css`
          ${fadeInUp} 0.5s ease forwards
        `
      : "none"};
`;

const BannerContainer = styled.div<{ isShow: boolean }>`
  will-change: transform, opacity;
  height: 100vh;
  display: ${({ isShow }) => (isShow ? "flex" : "visibilty")};
  flex-direction: column;
  align-items: center;
  ${fadeInUpOpacity}
`;

const MainTitle = styled.h2<{ isShow: boolean }>`
  font-size: 2.5rem;
  ${fadeInUpOpacity}
  animation-delay: 0.2s;
`;

const SubTitle = styled.h3<{ isShow: boolean }>`
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
