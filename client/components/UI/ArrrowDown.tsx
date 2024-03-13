import React from "react";

import styled, { keyframes } from "styled-components";

import { BsArrowDown } from "react-icons/bs";

const ArrrowDown = () => {
  return (
    <ArrowContainer>
      <BsArrowDown />
    </ArrowContainer>
  );
};

export default ArrrowDown;

const bounce = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-15px);
  }
`;

const ArrowContainer = styled.div`
  position: fixed;
  bottom: 8rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${bounce} 2s infinite;
  opacity: 0.8;
  svg {
    font-size: 3.5rem;
  }
`;
