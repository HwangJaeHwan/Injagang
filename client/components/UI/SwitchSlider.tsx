import React from "react";
import styled from "styled-components";

const SwitchSliderStyle = styled.label.attrs({ htmlFor: "toogleBtn" })`
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

const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc; // Neutral color when switch is off
  border-radius: 17px; // Half of the height for a perfect circle
  transition: background-color 0.4s;

  &:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    border-radius: 50%; // Perfect circle
    transition: 0.4s;
  }

  input:checked + &:before {
    transform: translateX(26px);
  }

  input:checked + & {
    background-color: #2196f3; // Blue color when switch is on
  }
`;

const Crater = styled.span`
  position: absolute;
  background-color: rgba(0, 0, 0, 0.2); // Semi-transparent craters
  border-radius: 50%;
  transition: opacity 200ms ease-in-out;

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
      <Slider>
        <Crater className="crater__1" />
        <Crater className="crater__2" />
        <Crater className="crater__3" />
      </Slider>
    </SwitchSliderStyle>
  );
};

export default SwitchSlider;
