import { useEffect, useState } from "react";

import styled from "styled-components";
import { StyleInput } from "@/styles/GlobalStyle";

import ControlMenu from "../UI/ControlMenu";

import userQnaManager from "./hooks/userQnaManager";
import useDebounce from "@/hooks/useDebounce";

const typeList = [
  { title: "제목", en: "title" },
  { title: "작성자", en: "writer" },
];

const BoardSearch = () => {
  const { dispatchChangeType, dispatchChangeSearch } = userQnaManager();
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const debounceSearch = useDebounce(search);

  useEffect(() => {
    if (debounceSearch) {
      dispatchChangeSearch(debounceSearch);
    }
  }, [debounceSearch]);

  const changeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const changeType = (newType: string) => {
    const findType = typeList.find(item => item.title === newType);
    setType(newType);
    if (findType) {
      dispatchChangeType(findType.en);
      dispatchChangeSearch("");
    }
    setSearch("");
  };

  return (
    <Container>
      <ControlMenu
        Size={{ width: "150px", height: "40px" }}
        value={type}
        optionList={typeList}
        onChange={changeType}
      />
      <Label htmlFor="searchInput" className="sr-only">검색 :</Label>
      <InputStyle
        type="text"
        id="searchInput"
        value={search}
        onChange={changeSearch}
      ></InputStyle>
    </Container>
  );
};

export default BoardSearch;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3px;
`;

const InputStyle = styled(StyleInput)`
  width: 350px;
  margin-top: 16.4px;
`;

const Label = styled.label`
`;
