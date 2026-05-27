package com.injagang.repository.board;

import com.injagang.domain.user.UserType;
import com.injagang.request.PageDTO;
import com.injagang.request.SearchDTO;
import com.injagang.response.BoardListInfo;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.Tuple;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.NumberExpression;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.support.PageableExecutionUtils;

import java.util.*;
import java.util.stream.Collectors;

import static com.injagang.domain.QBoard.*;
import static com.injagang.domain.QBoardHashtag.boardHashtag;
import static com.injagang.domain.QHashtag.hashtag1;
import static com.injagang.domain.like.QBoardLike.boardLike;
import static com.injagang.domain.qna.QBoardQnA.boardQnA;
import static com.injagang.domain.user.QUser.user;
import static java.util.stream.Collectors.toMap;
import static org.springframework.util.StringUtils.*;

@Slf4j
@RequiredArgsConstructor
public class BoardRepositoryImpl implements  BoardRepositoryCustom{

    private final JPAQueryFactory jpaQueryFactory;
    private static final int SIZE = 12;



    @Override
    public Page<BoardListInfo> boardList(PageDTO pageDTO, SearchDTO searchDTO) {


        BooleanBuilder builder = new BooleanBuilder();
        List<Long> ids = new ArrayList<>();
        List<Tuple> tuples = new ArrayList<>();


        if (hasText(searchDTO.getType()) && hasText(searchDTO.getContent())) {

            if (searchDTO.getType().equals("title")){
                builder.and(board.title.contains(searchDTO.getContent()));

            } else if (searchDTO.getType().equals("writer")) {
                builder.and(board.user.nickname.contains(searchDTO.getContent()));
            } else if (searchDTO.getType().equals("hashtag")) {

                BooleanExpression hasTag = JPAExpressions
                        .selectOne()
                        .from(boardHashtag)
                        .join(boardHashtag.hashtag, hashtag1)
                        .where(boardHashtag.board.eq(board)
                                .and(hashtag1.hashtag.eq(searchDTO.getContent())))
                        .exists();

                builder.and(hasTag);
            }



        }

        if (!builder.hasValue() && pageDTO.getPage() == 1) {

            List<Tuple> notices = jpaQueryFactory
                    .select(board.id, board.title, user.nickname, user.type, board.password, board.content,
                            board.viewCount, board.createdTime)
                    .from(board).join(board.user, user)
                    .where(board.user.type.eq(UserType.ADMIN))
                    .orderBy(board.createdTime.desc())
                    .offset(pageDTO.getOffset())
                    .fetch();

            tuples.addAll(notices);

            ids.addAll(notices.stream().map(t -> t.get(board.id)).collect(Collectors.toList()));


        }


        builder.and(board.user.type.ne(UserType.ADMIN));


        List<Tuple> boards = jpaQueryFactory
                .select(board.id, board.title, user.nickname, user.type, board.password, board.content,
                        board.viewCount, board.createdTime)
                .from(board).join(board.user, user)
                .where(builder)
                .orderBy(board.createdTime.desc())
                .offset(pageDTO.getOffset())
                .limit(SIZE)
                .fetch();

        ids.addAll(boards.stream().map(t -> t.get(board.id)).collect(Collectors.toList()));
        tuples.addAll(boards);

        Map<Long, Result> aggregates = loadBoardAggregates(ids);


        List<BoardListInfo> infos = toBoardListInfos(tuples, aggregates);

        JPAQuery<Long> countQuery = jpaQueryFactory.select(board.count())
                .from(board)
                .join(board.user, user)
                .where(builder);


        return PageableExecutionUtils.getPage(infos, PageRequest.of(pageDTO.getPage()-1, SIZE), countQuery::fetchOne);
    }


    @Override
    public Page<BoardListInfo> myList(Long userId,PageDTO pageDTO) {


        List<Tuple> boards = jpaQueryFactory
                .select(board.id, board.title, user.nickname, user.type, board.password, board.content,
                        board.viewCount, board.createdTime)
                .from(board).join(board.user, user)
                .where(board.user.id.eq(userId))
                .orderBy(board.createdTime.desc())
                .offset(pageDTO.getOffset())
                .limit(SIZE)
                .fetch();


        List<Long> ids = boards.stream().map(t -> t.get(board.id)).collect(Collectors.toList());


        Map<Long, Result> aggregates = loadBoardAggregates(ids);

        List<BoardListInfo> infos = toBoardListInfos(boards, aggregates);

        JPAQuery<Long> countQuery = jpaQueryFactory.select(board.count())
                .from(board)
                .join(board.user, user)
                .where(board.user.id.eq(userId));

        return PageableExecutionUtils.getPage(infos, PageRequest.of(pageDTO.getPage()-1, SIZE), countQuery::fetchOne);


    }


    private Map<Long,Result> loadBoardAggregates(List<Long> ids) {

        NumberExpression<Long> qnaCnt = boardQnA.id.count();
        NumberExpression<Long> likeCnt = boardLike.id.count();

        Map<Long, Integer> qnaCounts = jpaQueryFactory
                .select(boardQnA.board.id, qnaCnt)
                .from(boardQnA)
                .where(boardQnA.board.id.in(ids))
                .groupBy(boardQnA.board.id)
                .fetch().stream()
                .collect(toMap(
                        t -> t.get(boardQnA.board.id),
                        t -> t.get(qnaCnt).intValue()
                ));

        Map<Long, Long> likeCounts = jpaQueryFactory
                .select(boardLike.board.id, likeCnt)
                .from(boardLike)
                .where(boardLike.board.id.in(ids))
                .groupBy(boardLike.board.id)
                .fetch().stream()
                .collect(toMap(
                        t -> t.get(boardLike.board.id),
                        t -> t.get(likeCnt)
                ));


        Map<Long, List<String>> hashtagMap = jpaQueryFactory
                .select(boardHashtag.board.id, hashtag1.hashtag)
                .from(boardHashtag)
                .join(boardHashtag.hashtag, hashtag1)
                .where(boardHashtag.board.id.in(ids))
                .fetch()
                .stream()
                .collect(Collectors.groupingBy(
                        tuple -> tuple.get(boardHashtag.board.id),
                        Collectors.mapping(t -> t.get(hashtag1.hashtag), Collectors.toList())
                ));

        Map<Long, Result> result = new HashMap<>(ids.size());
        for (Long id : ids) {
            int q = qnaCounts.getOrDefault(id, 0);
            long l = likeCounts.getOrDefault(id, 0L);
            List<String> h = hashtagMap.getOrDefault(id, Collections.emptyList());
            result.put(id, new Result(q, l, h));
        }

        return result;


    }

    private List<BoardListInfo> toBoardListInfos(List<Tuple> boards, Map<Long, Result> aggregates) {
        return boards.stream().map(t -> {
            Long id = t.get(board.id);
            Result aggregate = aggregates.get(id);
            return BoardListInfo.builder()
                    .id(id)
                    .title(t.get(board.title))
                    .nickname(t.get(user.nickname))
                    .isLock(t.get(board.password) != null)
                    .isNotice(t.get(user.type) == UserType.ADMIN)
                    .content(t.get(board.content))
                    .viewCount(t.get(board.viewCount))
                    .createdAt(t.get(board.createdTime))
                    .qnaCount(aggregate.qnaCount)
                    .likes(aggregate.likeCount)
                    .hashtags(aggregate.hashtagMap)
                    .build();
        }).collect(Collectors.toList());
    }

    private static class Result {
        public final Integer qnaCount;
        public final Long likeCount;
        public final List<String> hashtagMap;

        public Result(Integer qnaCount, Long likeCount, List<String> hashtagMap) {
            this.qnaCount = qnaCount;
            this.likeCount = likeCount;
            this.hashtagMap = hashtagMap;
        }
    }




}
