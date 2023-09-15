import styled from "styled-components";
import MemberTable from "@/components/Admin/MemberTable";
import TemplateView from "@/components/Admin/Template/TemplateList";
import { ColBox } from "@/styles/GlobalStyle";


import { useSelector } from "react-redux";
import { RootReducerType } from "@/components/redux/store";
import { InitiaState } from "@/components/redux/Auth/reducer";
import InterViewListView from "@/components/InterView/InterViewListView";
const AdminPageStyle = styled.div`
  ${ColBox}
`;

const AdminPage = () => {
  const authReducer: InitiaState = useSelector(
    (state: RootReducerType) => state.auth,
  );
  return authReducer.role === "ADMIN" ? (
    <AdminPageStyle>
      <TemplateView />
      <InterViewListView />
    </AdminPageStyle>
  ) : (
    <div>당신은 관리자가 아닙니다.</div>
  );
};

export default AdminPage;
