import React from "react";

import styled from "styled-components";

const SwitchSliderStyle = styled.label`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
`;

const CheckBox = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
`;

const Slider = styled.span<{ isToggle: boolean }>`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${props => (props.isToggle ? "#2196f3" : "#ccc")};
  border-radius: 17px;
  transition: background-color 0.4s;

  &:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    transform: ${props =>
      props.isToggle ? "translateX(30px)" : "translateX(4px)"};
    bottom: 4px;
    background-color: white;
    border-radius: 50%;
    transition: 0.4s;
  }
`;

const Crater = styled.span<{ isToggle: boolean }>`
  position: absolute;
  visibility: ${props => (props.isToggle ? "visible" : "hidden")};
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 50%;
  transition: visibility 0.5ms ease-in-out;

  &.crater__1 {
    top: 6px;
    left: 42px;
    width: 8px;
    height: 8px;
  }
  &.crater__2 {
    top: 14px;
    left: 32px;
    width: 8px;
    height: 8px;
  }
  &.crater__3 {
    top: 20px;
    left: 39px;
    width: 8px;
    height: 8px;
  }
`;
const VisuallyHidden = styled.span`
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

type SwitchSliderProps = {
  isToggle: boolean;
  onClick: () => void;
};

const SwitchSlider = ({ isToggle, onClick }: SwitchSliderProps) => {
  const Craters = [
    { className: "crater__1", isToggle },
    { className: "crater__2", isToggle },
    { className: "crater__3", isToggle },
  ];
  return (
    <SwitchSliderStyle>
      <VisuallyHidden>
        <label htmlFor="toggleBtn">Toggle button</label>
      </VisuallyHidden>
      <CheckBox
        id="toggleBtn"
        type="checkbox"
        onClick={onClick}
        defaultChecked={isToggle}
        aria-label="토글버튼"
      />
      <Slider isToggle={isToggle}>
        {Craters.map((el, i) => (
          <Crater key={i} {...el}></Crater>
        ))}
      </Slider>
    </SwitchSliderStyle>
  );
};

export default SwitchSlider;
