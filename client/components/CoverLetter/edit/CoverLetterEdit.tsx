import React, { useState, useEffect, Suspense } from "react";
import { useRouter } from "next/router";
import useCoverLetterManager from "../hooks/useCoverLetterManager";
import useCoverLetterCreatorLogic from "../hooks/useCoverLetterCreatorLogic";

import { BiPlus } from "react-icons/bi";
import styled from "styled-components";
import { v } from "@/styles/variables";
import { ColBox, StyleButton } from "@/styles/GlobalStyle";
import APIErrorBoundary from "@/components/APIErrorBoundary";
import Spinner from "@/components/Spinner";
import CoverLetterQuestionItems from "../new/CoverLetterQuestionItems";

// 생각해보기
// const CoverLetterQuestionItems = React.lazy(
//   () => import("../new/CoverLetterQuestionItems"),
// );
const CoverLetterEdit = () => {
  const [coverLetterTitle, setCoverLetterTitle] = useState<string>("");
  const router = useRouter();
  const moveCoverLetterMainPage = "/coverLetter";
  const { id } = router.query;

  const { qnaList, setQnAList, deleteQnAList, changeQnAList, addQnAList } =
    useCoverLetterCreatorLogic();

  const {
    loading,
    targetQnAData,
    getDetailEssayList,
    coverLetterMainTitle,
    changeCoverLetter,
    deleteCoverLetter,
  } = useCoverLetterManager();

  useEffect(() => {
    getDetailEssayList(Number(id));
  }, []);

  useEffect(() => {
    if (!loading) {
      setQnAList(targetQnAData);
      setCoverLetterTitle(coverLetterMainTitle);
    }
  }, [targetQnAData]);

  if (loading) return <Spinner></Spinner>;

  return (
    <APIErrorBoundary>
      <CoverLetterCreatorContainer>
        <MainTitle>자소서 수정하기</MainTitle>
        <CoverLetterTitle
          value={coverLetterTitle}
          onChange={e => setCoverLetterTitle(e.target.value)}
          placeholder="자소서 제목"
        ></CoverLetterTitle>
        {qnaList.map((qna, i) => (
          <CoverLetterQuestionItems
            key={qna.qnaId}
            item={qna}
            onDelete={deleteQnAList}
            onUpdate={changeQnAList}
          ></CoverLetterQuestionItems>
        ))}
        <BiPlusStyled onClick={addQnAList}></BiPlusStyled>
        <ControllerBtns>
          <StyleButton
            Size={{ width: "150px", font: "20px" }}
            onClick={() => router.push(moveCoverLetterMainPage)}
          >
            뒤로가기
          </StyleButton>
          <StyleButton
            Size={{ width: "150px", font: "20px" }}
            onClick={() => deleteCoverLetter(Number(id))}
          >
            삭제하기
          </StyleButton>
          <StyleButton
            Size={{ width: "150px", font: "20px" }}
            onClick={() =>
              changeCoverLetter(Number(id), coverLetterTitle, qnaList)
            }
          >
            수정완료
          </StyleButton>
        </ControllerBtns>
      </CoverLetterCreatorContainer>
    </APIErrorBoundary>
  );
};

export default CoverLetterEdit;
const CoverLetterCreatorContainer = styled.div`
  ${ColBox}
  width: 100%;
`;

const MainTitle = styled.h2`
  font-size: 1.7rem;
  margin-bottom: 30px;
  text-decoration-line: underline;
`;

const CoverLetterTitle = styled.input`
  width: ${v.xlItemWidth};
  height: 40px;
  border-radius: 5px;
  border-color: black;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text};
  box-shadow: 0px 1px 0.5px rgba(0, 0, 0, 09);
  margin-bottom: 15px;
`;

const ControllerBtns = styled.div`
  display: flex;
  justify-content: space-between;
  width: ${v.xlItemWidth};
`;

const BiPlusStyled = styled(BiPlus)`
  margin: 40px auto;
  font-size: 3rem;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;
