package com.injagang.repository.board;

import com.injagang.domain.Board;
import com.injagang.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface BoardRepository extends JpaRepository<Board, Long>, BoardRepositoryCustom {


    @Query("select b from Board b join fetch b.user where b.id =:boardId")
    Optional<Board> findByIdWithUser(Long boardId);

    void deleteAllByUser(User user);
}
