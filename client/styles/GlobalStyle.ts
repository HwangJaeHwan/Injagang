import { createGlobalStyle } from "styled-components";
import styled, { css } from "styled-components";
import { v } from "@/styles/variables";

export const GlobalStyle = createGlobalStyle`
  * {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}
html {
  overflow-x: hidden;
  scroll-behavior: smooth;
}
  body {
    margin: 0;
    padding: 0;
    background-color: ${({ theme }) => theme.colors.bodyColor};
    color: ${({ theme }) => theme.colors.text};
    font-family: 'Roboto', sans-serif;
  }
`;

export const FlexBox = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

/**Colume 설정*/
export const ColBox = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ScrollBar = css`
  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 10px;
  }

  ::-webkit-scrollbar-track {
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 10px;
  }
`;

export const Container = styled.div`
  width: 100%;
  max-width: 1150px;
  margin: 0 auto;
  padding: 0 50px;

  @media screen and(max-width: 960px) {
    padding: 0 30p;
  }
`;

export const Card = styled.div<CardProps>`
  ${({ size }) => (size.flex === "row" ? FlexBox : ColBox)};
  padding: 15px 15px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text};
  width: ${({ size }) => size.width || "100%"};
  height: ${({ size }) => size.height || "100%"};
  border-radius: 8px;
  box-shadow: 1px 2px 12px rgba(0, 0, 0, 0.6);
`;

export const StyleCard = styled.div<CardProps>`
  ${FlexBox}
  padding: 15px 15px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text};
  width: ${({ size }) => size.width || "100%"};
  height: ${({ size }) => size.height || "100%"};
  border-radius: 8px;
  box-shadow: 1px 2px 12px rgba(0, 0, 0, 0.6);
`;

export const StyleButton = styled.button<SelectProps>`
  width: ${({ Size }) => Size.width || "100%"};
  background-color: ${({ theme }) => theme.colors.button};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ Size }) => Size.font || "16px"};
  border: none;
  padding: 10px 15px;
  border-radius: 10px;
  font-weight: bold;
  box-shadow: 0 1.5px 2px rgba(0, 0, 0, 09);
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #777;
  }

  &:active {
    background-color: red;
  }

  &.active_button {
    background-color: red;
  }
`;

export const StyleTextArea = styled.textarea`
  ${FlexBox}
  resize: vertical;
  box-sizing: border-box;
  color: #22272e;
  background-color: white;
  font-weight: bold;
  width: 100%;
  height: 100%;
  line-height: 1.5;
  padding: 10px 15px;
  border-radius: 5px;
  overflow-y: auto;
  margin: 15px auto;
`;

export const StyleInput = styled.input`
  width: ${v.lgItemWidth};
  height: 40px;
  border-radius: 5px;
  border-color: black;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text};
  box-shadow: 0px 1px 0.5px rgba(0, 0, 0, 09);
  margin-bottom: 15px;
  @media screen and (max-width: 900px) {
    width: ${v.smItemWidth};
  }
`;

export const MainTitleContainer = styled.div`
  text-align: center;
  background-color: "#151618";
  box-shadow: 1px 2px 12px rgba(0, 0, 0, 0.4);
  font-weight: bold;
  font-size: 1.8rem;
  width: ${v.xlItemWidth};
  border-radius: 8px;
  padding: 8px 20px;
  margin-bottom: 11px;

  @media screen and (max-width: 900px) {
    width: ${v.smItemWidth};
  }
`;

export const StyledInput = styled.input`
  width: 100%;
  padding: 2px 8px;
  border: 1px solid #e1e1e1;
  background-color: #ffffff;
  border-radius: 4px;
  font-size: 16px;
  color: #333;
  transition: border-color 0.2s ease-in-out;

  &:focus {
    border-color: #007bff;
    outline: none;
  }

  &::placeholder {
    color: #aaa;
  }
`;

interface CardProps {
  size: {
    width: string;
    height: string;
    flex?: string;
  };
}

interface SelectProps {
  Size: {
    width: string;
    font: string;
  };
}
