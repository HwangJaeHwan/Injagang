import QuestionItem from "@/components/Edit/QuestionItem";
import ControlMenu from "@/components/UI/ControlMenu";
import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import CustomButton from "@/components/UI/CustomButton";
import { BiPlus } from "react-icons/bi";
import { useSelector } from "react-redux";
import { RootReducerType } from "@/components/redux/store";
import templateReducer, {
  InitiaState,
} from "@/components/redux/Template/reducer";
import {
  addEssay,
  deleteEssayList,
  updateEssay,
} from "@/components/redux/Essay/actions";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { ColBox } from "@/styles/GlobalStyle";
import QnAListTitle from "../UI/ListTitle";
import Modal from "../UI/Modal";

const QnAEditorStyle = styled.div`
  text-align: center;
  width: 100%;
  .content-container {
    ${ColBox}
    width: 100%;
    margin: 15px auto;
  }

  h2 {
    font-size: 1.5rem;
    margin-bottom: 15px;
    text-decoration-line: underline;
  }

  select {
    width: 50%;
    height: 40px;
  }

  .button_container {
    ${ColBox}
    margin: 13px auto;
    width: 50%;
    .flex-end {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
    svg {
      font-size: 50px;
      cursor: pointer;
    }
    button:last-child {
      margin-left: 8px;
    }
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 70%;
  margin: 20px auto;
  padding: 20px;
  /* border: 1px solid #ccc; */
  border-radius: 10px;
  /* box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3); */
`;

const TitleInput = styled.input`
  width: 50%;
  height: 40px;
  border-radius: 5px;
  border-color: black;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text};
  box-shadow: 0px 1px 0.5px rgba(0, 0, 0, 09);
  margin-bottom: 15px;
`;

type qna = {
  qnaId: number;
  question: string;
  answer: string;
};

interface QnAList {
  essayId?: number;
  templateId?: number;
  title: string;
  qnaList: Array<qna | string>;
}

interface qnaListItem {
  qnaId: number;
  question: string;
  answer: string;
}

interface qnaList extends Array<qnaListItem> {}

type QnAEditorProps = {
  isEdit: boolean;
};

const QnAEditor = ({ isEdit }: QnAEditorProps) => {
  {
    /**리덕스에 대한 선언 */
  }
  const router = useRouter();
  const dispatch = useDispatch();
  /**나의 자소서를 호출중 판단여부 */
  const readEssayLoading = useSelector(
    (state: RootReducerType) => state.essay.loading,
  );
  /**나의 자소서 리스트 */
  const readEssayList = useSelector(
    (state: RootReducerType) => state.essay.readEssayList,
  );
  /**관리자의 샘플 리스트 */
  const templateReducer: InitiaState = useSelector(
    (state: RootReducerType) => state.template,
  );

  const [qnaLists, setQnALists] = useState<QnAList[]>([]);
  const [templateTitle, setTemplateTitle] = useState<string>("커스텀자소서");
  const [mainTitle, setMainTitle] = useState<string>("");
  const [qnaContent, setQnAContent] = useState<qnaList>([]);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [modalMsg, setModalMsg] = useState<string>("");
  const essayId = isEdit
    ? (JSON.parse(router.query.essayId as string) as number)
    : 0;

  /** ESSAY의 로딩이 완료가되면 useState에 반영한다. */
  useEffect(() => {
    if (!readEssayLoading) {
      if (readEssayList[0].title === "") {
        return;
      }
      setQnALists(readEssayList);
      setTemplateTitle(readEssayList[0]?.title);
    }
  }, [readEssayLoading]);

  /** 템플릿의 로딩이 완료가되면 useState에 반영한다. */
  useEffect(() => {
    if (!templateReducer.loading) {
      const customTemplate = {
        templateId: 10000,
        title: "커스텀자소서",
        qnaList: [],
      };
      setQnALists(cur => [customTemplate, ...templateReducer.templateList]);
    }
  }, [templateReducer.templateList]);
  /** 수정모드에서는 기존의 리스트를 반환, 작성모드에서는 선택된 템플릿 리스트를 반환 */
  const getQuestionItem = useCallback(() => {
    if (isEdit) {
      return qnaLists;
    }
    const filteItem = qnaLists.filter(list => list.title === templateTitle);
    return filteItem;
  }, [templateTitle, qnaLists]);

  const handleChangeMainTitle = (title: string) => {
    setMainTitle(title);
  };

  /**질문FORM 추가 함수 */
  const handleAddQnA = () => {
    if (templateTitle === "") {
      return;
    }
    setQnALists(prevLists => {
      const newLists = [...prevLists];
      const filterIndex = newLists.findIndex(a => a.title === templateTitle);
      const newContent = [...newLists[filterIndex].qnaList, " "];
      newLists[filterIndex].qnaList = newContent;
      return newLists;
    });
  };

  const handleChangeQnA = (index: number, question: string, answer: string) => {
    const newList = [...qnaContent];
    newList[index].question = question;
    newList[index].answer = answer;
    setQnAContent(newList);
  };

  // const handleDeleteQna = (index: number) => {
  //   setQnALists(prevLists => {
  //     const newLists = [...prevLists];
  //     const filterIndex = newLists.findIndex(a => a.title === templateTitle);
  //     const newContent = [...newLists[filterIndex].qnaList];
  //     newContent.splice(index, 1);
  //     newLists[filterIndex].qnaList = newContent;
  //     return newLists;
  //   });
  //   setDeletedItemExists(true)
  // };

  const handleQnASelect = (index: number, question: string, answer: string) => {
    const filterList = qnaContent[index];
    console.log("필터결과", filterList);
    console.log("질문내용", question);
    console.log("질문답변", answer);
    if (filterList) {
      return;
    } else {
      setQnAContent(curList => [
        ...curList,
        { qnaId: index, question, answer: answer },
      ]);
    }
  };

  const handleSubmit = () => {
    const filterJudge = qnaContent.filter(
      a => a.answer === "" || a.question === "",
    ).length;
    if (!isEdit && mainTitle === "") {
      setIsOpenModal(true);
      setModalMsg("메인 제목을 입력해주세요");
      return;
    }
    if (qnaContent.length < 1) {
      setIsOpenModal(true);
      setModalMsg("질문과 답변은 1개이상 작성해주세요.");
      return;
    }
    if (filterJudge > 0) {
      setIsOpenModal(true);
      setModalMsg("질문 답변의 내용을 채워주세요");
      return;
    }
    const data = {
      title: isEdit
        ? mainTitle === ""
          ? templateTitle
          : mainTitle
        : mainTitle,
      qnaList: qnaContent,
    };
    if (isEdit) {
      dispatch(updateEssay(data, essayId));
      router.replace("/myEssay");
      return;
    }
    dispatch(addEssay(data, Number(Cookies.get("useId"))));
    router.replace("/myEssay");
  };

  const handleModal = (mode: number) => {
    if (mode === 1) {
      setIsOpenModal(false);
    }
    if (mode === 2) {
      setModalMsg(`${essayId}번 자소서를 정말 삭제하시겠습니까?`);
      setIsOpenModal(true);
    }
  };

  const handleDeleteEssay = () => {
    dispatch(deleteEssayList(essayId));
    router.push("/myEssay");
  };

  return (
    <QnAEditorStyle>
      <h2>{isEdit ? "자소서 수정하기" : "자소서 작성하기"}</h2>
      <Container>
        <QnAListTitle handleChangeMainTitle={handleChangeMainTitle} />
        <ControlMenu
          Size={{ width: "10", height: "10" }}
          value={templateTitle}
          optionList={qnaLists}
          onChange={setTemplateTitle}
        />
        {qnaLists &&
          getQuestionItem().map(list => (
            <div
              className="content-container"
              key={isEdit ? list.essayId : list.templateId}
            >
              {list.qnaList.map((qna, idx) => (
                <QuestionItem
                  key={idx}
                  content={qna}
                  onChange={handleChangeQnA}
                  curInfo={handleQnASelect}
                  index={idx}
                ></QuestionItem>
              ))}
            </div>
          ))}
      </Container>
      <div className="button_container">
        <BiPlus onClick={handleAddQnA}></BiPlus>
        <div className="flex-end">
          <CustomButton
            Size={{ width: "150px", font: "20px" }}
            onClick={() => router.push("/myEssay")}
            text="뒤로가기"
          />
          <div>
            {isEdit ? (
              <CustomButton
                Size={{ width: "150px", font: "20px" }}
                onClick={() => handleModal(2)}
                text="삭제하기"
              />
            ) : (
              <></>
            )}
            <CustomButton
              Size={{ width: "150px", font: "20px" }}
              onClick={handleSubmit}
              text={isEdit ? "수정완료" : "작성완료"}
            />
          </div>
        </div>
      </div>
      {isOpenModal && (
        <Modal
          isOpen={isOpenModal}
          onClose={() => handleModal(1)}
          onAction={isEdit ? handleDeleteEssay : () => handleModal(1)}
          contents={{
            title: "경고",
            content: modalMsg,
          }}
        ></Modal>
      )}
    </QnAEditorStyle>
  );
};

export default QnAEditor;
