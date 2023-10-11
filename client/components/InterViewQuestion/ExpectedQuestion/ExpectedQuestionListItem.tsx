import React, { useState, useEffect } from "react";
import styled from "styled-components";

type InterViewListItemProps = {
  questions: string;
  allCheck: boolean;
  id: number;
  onChange: (id: number, isCheck: boolean) => void;
};

const ExpectedQuestionListItem = ({
  onChange,
  questions,
  allCheck,
  id,
}: InterViewListItemProps) => {
  const [isCheck, setIsCheck] = useState<boolean>(false);

  useEffect(() => {
    allCheck ? setIsCheck(true) : setIsCheck(false);
  }, [allCheck]);

  /**현재 리스트의 체크리스트 변경하고 핸들러를 통해 id값과 체크 상태를 전달 */
  const handleCheckList = () => {
    onChange(id, isCheck);
    setIsCheck(!isCheck);
  };

  return (
    <InterViewListItemStyle>
      <input type="checkbox" checked={isCheck} onChange={handleCheckList} />
      <label htmlFor={questions}>{questions}</label>
    </InterViewListItemStyle>
  );
};

export default React.memo(ExpectedQuestionListItem);

const InterViewListItemStyle = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 3px;
  input {
    margin-right: 15px;
  }
`;
