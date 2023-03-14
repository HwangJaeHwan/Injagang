import React from "react";
import MyList from "@/components/MyList";
import styled from "styled-components";
import { ColBox } from "@/styles/GlobalStyle";

const TestEditStyle = styled.div`
  ${ColBox}
  margin: 50px auto;
  width: 100%;
  height: 100vh;
`;

const testEdit = () => {
  return (
    <TestEditStyle>
      <MyList />
    </TestEditStyle>
  );
};

export default testEdit;
