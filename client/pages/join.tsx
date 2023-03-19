import { FlexBox } from "@/styles/GlobalStyle";
import { useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { joinRequest } from "@/components/test/api";

const JoinStyle = styled.div`
  ${FlexBox};
  height: 100vh;
  width: 100vw;
  background-color: #31404e;
  color: ${({ theme }) => theme.colors.text};
`;

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


const SignupPage = () => {
  const [joinInfo, setJoinInfo] = useState({
    loginId: "",
    password: "",
    confirmPassword: "",
    email: "",
    nickName: "",
  });
  const router = useRouter()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (joinInfo.password !== joinInfo.confirmPassword) {
      console.log("비밀번호를 재확인해주세요");
      return;
    }
    const joinData = {
      loginId: joinInfo.loginId,
      password: joinInfo.password,
      email: joinInfo.email,
      nickname: joinInfo.nickName,
    };
    const joinResult = await joinRequest(joinData)
    if(joinResult?.status === 200) {
      console.log('요청')
      router.replace('/login')
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setJoinInfo(cur => ({
      ...cur,
      [name]: value,
    }));
  };

  return (
    <JoinStyle>
      <Form onSubmit={handleSubmit}>
        <Label>아이디</Label>
        <Input
          type="test"
          name="loginId"
          value={joinInfo.loginId}
          onChange={handleChange}
        />
        <Label>비밀번호</Label>
        <Input
          type="password"
          name="password"
          value={joinInfo.password}
          onChange={handleChange}
        />
        <Label>재확인</Label>
        <Input
          type="password"
          name="confirmPassword"
          value={joinInfo.confirmPassword}
          onChange={handleChange}
        />
        <Label>Email</Label>
        <Input
          type="email"
          name="email"
          value={joinInfo.email}
          onChange={handleChange}
        />
        <Label>닉네임</Label>
        <Input
          type="text"
          name="nickName"
          value={joinInfo.nickName}
          onChange={handleChange}
        />
        <Button type="submit">회원가입</Button>
      </Form>
    </JoinStyle>
  );
};

export default SignupPage;
