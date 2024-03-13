import React from "react";

import styled from "styled-components";

const ManualCheckList = () => {
  return <CheckInput type={"checkbox"}></CheckInput>;
};

export default ManualCheckList;

const CheckInput = styled.input`
  &[type="checkbox"] {
  }
`;
