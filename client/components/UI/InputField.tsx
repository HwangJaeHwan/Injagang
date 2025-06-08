import React, { InputHTMLAttributes, forwardRef } from "react";

import styled from "styled-components";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, type, name, value, onChange }, ref) => (
    <InputFieldStyle>
      <Label>{label}</Label>
      <Input
        ref={ref}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
      />
    </InputFieldStyle>
  ),
);

export default InputField;

const InputFieldStyle = styled.div`
    display: flex;
    flex-direction: column;
`

const Label = styled.label`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
`;

const Input = styled.input`
  padding: 8px;
  margin-bottom: 16px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;