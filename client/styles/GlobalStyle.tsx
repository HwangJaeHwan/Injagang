import { createGlobalStyle } from "styled-components";
import styled,{css} from "styled-components";

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
  }
`;

export const FlexBox = css`
  display: flex;
  justify-content: center;
  align-items: center;
`
export const ColBox = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`