import styled from "styled-components";
import react, { useState } from "react";
import MemberTable from "@/components/Admin/MemberTable";
import TemplateView from "@/components/Admin/TemplateView";
import Drage from "@/components/test/drag";
import { ColBox } from "@/styles/GlobalStyle";
import TextReader from "@/components/test/TextReder";

const AdminPageStyle = styled.div`
  ${ColBox}
`;

const members = [
  { id: 1, name: "5", email: "가@example.com" },
  { id: 2, name: "3", email: "나@example.com" },
  { id: 3, name: "1", email: "다@example.com" },
];

const AdminPage = () => {
  return (
    <AdminPageStyle>
      <MemberTable members={members} />
      <TemplateView />
      <Drage />
      <TextReader />
    </AdminPageStyle>
  );
};

export default AdminPage;
