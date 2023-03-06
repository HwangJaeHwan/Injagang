import { useState } from "react";
import styled from "styled-components";
import { BiChevronUp, BiChevronDown } from "react-icons/bi";

const members = [
  { id: 1, name: "가", email: "가@example.com" },
  { id: 2, name: "나", email: "나@example.com" },
  { id: 3, name: "다", email: "다@example.com" },
];

const Table = styled.table`
  border-collapse: collapse;
  width: 80%;
`;

const Th = styled.th`
  background-color: #eee;
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
`;

const Td = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
`;

const Tr = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

const AdminPage = () => {

  return (
    <Table>
      <Th></Th>
      <Th></Th>
    </Table>
  );
};

export default AdminPage;
