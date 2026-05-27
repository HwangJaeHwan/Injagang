package com.injagang.repository;

import com.injagang.domain.Board;
import com.injagang.domain.BoardHashtag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BoardHashtagRepository extends JpaRepository<BoardHashtag, Long> {

    @Query("select bh from BoardHashtag bh join fetch bh.hashtag where bh.board =:board ")
    List<BoardHashtag> findAllByBoard(Board board);

    void deleteAllByBoard(Board board);


}
