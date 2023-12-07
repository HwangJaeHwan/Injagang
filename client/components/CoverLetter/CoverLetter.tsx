import React, { Suspense } from "react";
import styled from "styled-components";
import { v } from "@/styles/variables";
import { ColBox } from "@/styles/GlobalStyle";
import CoverLetterPreView from "./CoverLetterPreView";
import CoverLetterList, { CoverLetterListContainer } from "./CoverLetterList";
import { useRouter } from "next/router";
import { BiPlus } from "react-icons/bi";
import Spinner from "../Spinner";
import APIErrorBoundary from "../APIErrorBoundary";

const CoverLetter = () => {
  const router = useRouter();
  const headerTitle = "나의 자소서 목록";
  const moveCreationPage = "/coverLetter/new";
  return (
    <CoverLetterContainer>
      <CoverLetterPreView />
      <ListHeader>{headerTitle}</ListHeader>
      <APIErrorBoundary>
        <Suspense fallback={<Spinner />}>
          <CoverLetterList />
        </Suspense>
      </APIErrorBoundary>
      <CoverLetterControllers>
        <BiPlus onClick={() => router.push(moveCreationPage)} />
      </CoverLetterControllers>
    </CoverLetterContainer>
  );
};

export default CoverLetter;

const CoverLetterContainer = styled.div`
  width: ${v.xlWidth};
  height: 600px;
  ${ColBox}
  @media screen and (max-width: 1300px) {
    width: ${v.mdWidth};
  }
  @media screen and (max-width: 900px) {
    width: ${v.smWidth};
  }
`;

const CoverLetterControllers = styled.div`
  svg {
    font-size: 50px;
    margin-bottom: 30px;
    cursor: pointer;
  }
`;

const ListHeader = styled.div`
  text-align: center;
  width: 100%;
  font-size: 30px;
  font-weight: bold;
  background-color: #302e2e;
  padding: ${v.xsPadding};
  border-radius: 5px;
  box-shadow: ${v.boxShadow2};
`;
