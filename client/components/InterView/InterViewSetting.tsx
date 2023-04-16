import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { RootReducerType } from "../redux/store";

const InterViewSettingStyle = styled.div``;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
  padding: 20px;
  border-radius: 8px;
  background-color: #15202b;
  box-shadow: 0 4px 8px rgba(14, 13, 13, 0.2);
`;

const Label = styled.label`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
`;

const Input = styled.input`
  padding: 8px;
  margin-bottom: 16px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const Button = styled.button`
  padding: 8px 16px;
  background-color: #2ecc71;
  color: #fff;
  font-size: 18px;
  font-weight: 600;
  border-radius: 4px;
  border: none;
  cursor: pointer;
`;

const InterViewSetting = () => {
  const [rendomSetting, setRendomSetting] = useState({
    cs: 0,
    situation: 0,
    job: 0,
    personality: 0,
  });
  const dispatch = useDispatch();
  const csRendomList = useSelector(
    (state: RootReducerType) => state.interViewQuestion.rendomList.cs,
  );
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setRendomSetting(cur => ({
      ...cur,
      [name]: value,
    }));
  };

  return (
    <InterViewSettingStyle>
      <Form onSubmit={() => console.log("클릭")}>
        <Label>CS 질문</Label>
        <Input
          type="number"
          name="cs"
          value={rendomSetting.cs}
          onChange={handleChange}
        />
        <Label>상황 질문</Label>
        <Input
          type="number"
          name="cs"
          value={rendomSetting.cs}
          onChange={handleChange}
        />
        <Label>성격 질문</Label>
        <Input
          type="number"
          name="cs"
          value={rendomSetting.cs}
          onChange={handleChange}
        />
        <Label>직업 질문</Label>
        <Input
          type="number"
          name="cs"
          value={rendomSetting.cs}
          onChange={handleChange}
        />
        <Button type="submit">셋팅완료</Button>
      </Form>
    </InterViewSettingStyle>
  );
};

export default InterViewSetting;
