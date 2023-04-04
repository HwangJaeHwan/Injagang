package com.injagang.repository.board;

import com.injagang.domain.Board;
import com.injagang.request.PageDTO;
import com.injagang.request.SearchDTO;
import org.springframework.data.domain.Page;

public interface BoardRepositoryCustom {

    Page<Board> boardList(PageDTO pageDTO, SearchDTO searchDTO);
}
