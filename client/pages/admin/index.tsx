import styled from "styled-components";
import TemplateView from "@/components/Admin/Template/TemplateList";
import { ColBox } from "@/styles/GlobalStyle";

import { useSelector } from "react-redux";
import { RootReducerType } from "@/components/redux/store";
import ExpectedQuestionView from "@/components/InterViewQuestion/ExpectedQuestionLayout";
import TemplateListFetcher from "@/components/Admin/Template/TemplateListFetcher";
const AdminPageStyle = styled.div`
  ${ColBox}
  width:100%;
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
