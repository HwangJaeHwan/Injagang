import { FlexBox } from "@/styles/GlobalStyle";
import React, { useState } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import styled from "styled-components";

const SearchStyle = styled.div`
  ${FlexBox};
  margin: 0.5rem auto;
  svg {
    margin: auto 10px;
    font-size: 35px;
  }
  input {
    border-radius: 16px;
    font-size: 20px;
  }
`;
const Search = () => {
  const [searchText, setSearchText] = useState("");

  const serachHandler = () => {
    console.log(searchText);
  };
  return (
    <SearchStyle>
      <BiSearchAlt2 onClick={serachHandler} />
      <input value={searchText} onChange={e => setSearchText(e.target.value)} />
    </SearchStyle>
  );
};

export default Search;
