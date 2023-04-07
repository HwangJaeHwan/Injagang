import { createGlobalStyle } from "styled-components";
import styled, { css } from "styled-components";

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
    background-color: ${({ theme }) => (theme as any).colors.bodyColor};
    color: ${({ theme }) =>(theme as any).colors.text};
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

interface CardProps {
  size: {
    width: string;
    height: string;
    flex: string;
  };
}


export const Card = styled.div<CardProps>`
  ${({ size }) => (size.flex === "row" ? FlexBox : ColBox)};
  padding: 15px 15px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text};
  width: ${({ size }) => size.width || "100%"};
  height: ${({ size }) => size.height || "100%"};
  border-radius: 8px;
  box-shadow: 1px 2px 12px rgba(0, 0, 0, 0.6);
  margin: 15px 15px;
`;
