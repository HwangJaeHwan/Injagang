package com.injagang.repository.board;

import com.injagang.domain.Board;
import com.injagang.domain.user.UserType;
import com.injagang.request.PageDTO;
import com.injagang.request.SearchDTO;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.support.PageableExecutionUtils;

import java.util.ArrayList;
import java.util.List;

import static com.injagang.domain.QBoard.*;
import static com.injagang.domain.user.QUser.user;
import static org.springframework.util.StringUtils.*;

@Slf4j
@RequiredArgsConstructor
public class BoardRepositoryImpl implements  BoardRepositoryCustom{

    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public Page<Board> boardList(PageDTO pageDTO, SearchDTO searchDTO) {


        List<Board> lists = new ArrayList<>();
        BooleanBuilder builder = new BooleanBuilder();

        if (hasText(searchDTO.getType()) && hasText(searchDTO.getContent())) {

            if (searchDTO.getType().equals("title")){
                builder.and(board.title.contains(searchDTO.getContent()));

            } else if (searchDTO.getType().equals("writer")) {
                builder.and(board.user.nickname.contains(searchDTO.getContent()));
            }



        }

        if (!builder.hasValue() && pageDTO.getPage() == 1) {

            lists.addAll(jpaQueryFactory.selectFrom(board)
                    .join(board.user, user).fetchJoin()
                    .orderBy(new OrderSpecifier<>(Order.DESC, board.createdTime))
                    .where(board.user.type.eq(UserType.ADMIN))
                    .fetch());

        }


        builder.and(board.user.type.ne(UserType.ADMIN));



        List<Board> content = jpaQueryFactory.selectFrom(board)
                .join(board.user, user).fetchJoin()
                .where(builder)
                .offset(pageDTO.getOffset())
                .limit(15L)
                .orderBy(new OrderSpecifier<>(Order.DESC, board.createdTime))
                .fetch();

        lists.addAll(content);

        JPAQuery<Long> countQuery = jpaQueryFactory.select(board.count())
                .from(board)
                .where(builder);


        return PageableExecutionUtils.getPage(lists, PageRequest.of(pageDTO.getPage()-1, 15), countQuery::fetchOne);
    }




}
