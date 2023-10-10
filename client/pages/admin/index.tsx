import styled from "styled-components";
import MemberTable from "@/components/Admin/MemberTable";
import TemplateView from "@/components/Admin/Template/TemplateList";
import { ColBox } from "@/styles/GlobalStyle";

import { useSelector } from "react-redux";
import { RootReducerType } from "@/components/redux/store";
import { InitiaState } from "@/components/redux/Auth/reducer";
import ExpectedQuestionView from "@/components/InterViewQuestion/ExpectedQuestion/ExpectedQuestionList";
const AdminPageStyle = styled.div`
  ${ColBox}
`;

const AdminPage = () => {
  const { role } = useSelector((state: RootReducerType) => state.profile);
  return role === "ADMIN" ? (
    <AdminPageStyle>
      <TemplateView />
      <ExpectedQuestionView />
    </AdminPageStyle>
  ) : (
    <div>당신은 관리자가 아닙니다.</div>
  );
};

export default AdminPage;
