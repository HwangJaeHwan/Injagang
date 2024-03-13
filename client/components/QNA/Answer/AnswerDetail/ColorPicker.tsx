import React from "react";

import styled from "styled-components";

interface ColorPickerProps {
  onSelectColor: (color: string) => void;
}

const colors = ["#ff0000b3", "#0c750c9f", "#0000FF", "#e69a0def"];

const ColorPicker = ({ onSelectColor }: ColorPickerProps) => {
  return (
    <ColorPickerContainer>
      {colors.map(color => (
        <ColorBox
          key={color}
          color={color}
          onClick={() => onSelectColor(color)}
        />
      ))}
    </ColorPickerContainer>
  );
};

const ColorPickerContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const ColorBox = styled.div<{ color: string }>`
  width: 20px;
  height: 20px;
  background-color: ${props => props.color};
  cursor: pointer;
`;

export default ColorPicker;
