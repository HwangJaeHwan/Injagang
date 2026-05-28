package com.injagang.repository.board;

import com.injagang.domain.Board;
import com.injagang.request.PageDTO;
import com.injagang.request.SearchDTO;
import com.injagang.response.BoardListInfo;
import org.springframework.data.domain.Page;

import java.util.List;

public interface BoardRepositoryCustom {

    Page<BoardListInfo> boardList(PageDTO pageDTO, SearchDTO searchDTO);

    Page<BoardListInfo> myList(Long userId,PageDTO pageDTO);
}
