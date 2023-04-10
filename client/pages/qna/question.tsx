import QuestionWirte from "@/components/QNA/Question/QuestionWirte";
import { ColBox } from "@/styles/GlobalStyle";

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { getEssayList } from "@/components/redux/Essay/actions";
import Cookies from "js-cookie";

const WirteStyle = styled.div`
  ${ColBox}
  height: 100vh;
  width: 80vw;
`;

const question = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("dsfasfasfsad로딩");
    dispatch(getEssayList(Number(Cookies.get("userId"))));
  }, []);

  return (
    <WirteStyle>
      <QuestionWirte />
    </WirteStyle>
  );
};

export default question;
