import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { MdCallMade } from "react-icons/md";

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-15px);
  }
  60% {
    transform: translateY(-10px);
  }
`;

const Arrow = styled.div`
  font-size: 50px;
  color: red;
  animation: ${bounce} 2s infinite;
  font-family: 'Oswald', sans-serif;
  p{
    font-size: 30px;
  }
`;

interface ArrowAnimationProps {
  targetId: string;
}

const ArrowAnimation = ({ targetId }: ArrowAnimationProps) => {
  const [position, setPosition] = useState<{ top: number; left: number }>({
    top: 0,
    left: 0,
  });

  useEffect(() => {
    const updatePosition = () => {
      const targetElement = document.querySelector(`.${targetId}`);
      console.log(targetElement);
      if (targetElement) {
        const rect = targetElement.getBoundingClientRect();
        setPosition({
          top: rect.bottom,
          left: rect.left,
        });
      }
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    return () => {
      window.removeEventListener("resize", updatePosition);
    };
  }, [targetId]);

  return (
    <Arrow
      style={{
        position: "absolute",
        top: position.top,
        left: position.left,
      }}
    >
      <MdCallMade />
      <p>Click Me</p>
    </Arrow>
  );
};

export default ArrowAnimation;
