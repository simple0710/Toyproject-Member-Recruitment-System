package com.project.toy.Service;


import com.project.toy.Entity.BoardEntity;
import com.project.toy.Reposiotry.BoardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class BoardService {

    private final BoardRepository boardRepository;

    // id로 찾기
    public BoardEntity boardView(Integer id) {
        return boardRepository.findById(id).get();
    }

    // 모든 리스트 가져오기
    public List<BoardEntity> getList() {
        return this.boardRepository.findAll(Sort.by(Sort.Direction.DESC, "createDate"));
    }

    // 검색
    public List<BoardEntity> searchBoard(String title) {
        return this.boardRepository.findByTitleContaining(title, Sort.by(Sort.Direction.DESC, "createDate"));
    }

    // 실험중
    public Page<BoardEntity> getPagingList(int page) {
        List<Sort.Order> sorts = new ArrayList<>();
        sorts.add(Sort.Order.desc("createDate"));
        Pageable pageable = PageRequest.of(page, 20, Sort.by(sorts));
        System.out.println(this.boardRepository.findAll());
        return this.boardRepository.findAll(pageable);
    }

    public void createBoard(String title, String name, String skillStack, String workField, String maxPeople, String endDate, String content, LocalDate postEndDate) {
        BoardEntity p = new BoardEntity();
        System.out.println(skillStack);
        p.setTitle(title);
        p.setName(name);
        p.setSkillStack(skillStack);
        p.setWorkField(workField);
        p.setMaxPeople(maxPeople);
        p.setEndDate(endDate);
        p.setPostEndDate(postEndDate);
        p.setContent(content);
        p.setCreateDate(LocalDateTime.now());
        this.boardRepository.save(p);
    }

    // 수정
    public void update(BoardEntity boardEntity, String title, String skillStack, String workField, String maxPeople, String endDate, String content, LocalDate postEndDate) {
        boardEntity.setTitle(title);
        boardEntity.setSkillStack(skillStack);
        boardEntity.setWorkField(workField);
        boardEntity.setMaxPeople(maxPeople);
        boardEntity.setEndDate(endDate);
        boardEntity.setContent(content);
        boardEntity.setPostEndDate(postEndDate);
        this.boardRepository.save(boardEntity);
    }

    // 삭제
    public void delete(Integer id) {
        boardRepository.deleteById(id);
        System.out.println("삭제 완료");
    }



}