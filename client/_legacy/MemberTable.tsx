import styled from "styled-components";

import { BiChevronUp, BiChevronDown } from "react-icons/bi";

import {useState} from 'react';

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
  h2::selection {
    background-color: black;
    color: yellow;
  }
`;

interface Member {
    id: number;
    name: string;
    email: string;
  }
  
  interface MemberTableProps {
    members: Member[];
  }

const MemberTable = ({members}:MemberTableProps) => {
    type userInfo = "name"|"email"
    const [sortName, setSortName] = useState<userInfo>('name');
    const [sortDirection, setSorDirection] = useState<'latest'|'oldest'>('latest')
  
    const sortedMembers = members.sort((a,b) => {
      const sortList = sortDirection === 'latest'? 1 : -1;
      return a[sortName] > b[sortName]? sortList : -sortList  
    })
  
    const handleSort = (curName:userInfo) => {
      if(curName === sortName) {
        setSorDirection(sortDirection === "latest"? "oldest" : "latest")
      }
      setSortName(curName)
    }
    return (
        <Table>
        <thead>
          <Tr>
            <Th onClick={()=>handleSort("name")}>Name{sortName === 'name' && (sortDirection === "latest"? <BiChevronUp/> : <BiChevronDown/>)}</Th>
            <Th onClick={()=>handleSort("email")}>Email{sortName === 'email' && (sortDirection === "latest"? <BiChevronUp/> : <BiChevronDown/>)}</Th>
          </Tr>
        </thead>
        <tbody>
          {sortedMembers.map(member => (
            <Tr key={member.id}>
              <Td>{member.name}</Td>
              <Td>{member.email}</Td>
            </Tr>
          ))}
        </tbody>
      </Table>
    );
};

export default MemberTable;