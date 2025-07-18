package com.injagang.repository.board;

import com.injagang.domain.Board;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface BoardRepository extends JpaRepository<Board, Long>, BoardRepositoryCustom {


    @Query("select b from Board b join fetch b.user where b.id =:boardId")
    Optional<Board> findByIdWithUser(Long boardId);
    @Modifying
    @Query("update from Board b set b.deletedTime = current_timestamp where b.user.id = :userId")
    void softDeleteAllByUser(@Param("userId") Long userId);

    @Query("select b from Board b where b.user.id = :userId")
    List<Board> findAllByUserId(@Param("userId") Long userId);

}
