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
    font-family: 'Noto Sans KR', sans-serif;
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
