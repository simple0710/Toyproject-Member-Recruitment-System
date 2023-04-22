package com.project.toy.Controller;

import com.project.toy.BoardDto.BoardDto;
import com.project.toy.BoardDto.UserDto;
import com.project.toy.Entity.BoardEntity;
import com.project.toy.Entity.UserEntity;
import com.project.toy.Service.BoardService;
import com.project.toy.Service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/board")
public class BoardAPIController {

    private final BoardService boardService;

    private final UserService userService;

    // 리스트 시간 순(내림차순)으로 전부 불러오기
    @GetMapping("/list")
    public List<BoardEntity> getBoardList(Model model){
        System.out.println("보드 불러오기");
        return this.boardService.getList();
    }

    // 제목 검색
    @GetMapping("/list/search")
    public List<BoardEntity> getSearchBoardList(BoardDto boardDto) {
        System.out.println("검색 불러오기");
        return this.boardService.searchBoard(boardDto.getTitle());
    }

    // 글 생성
    @PostMapping("/create")
    public void boardCreate(BoardDto boardDto) {
        this.boardService.createBoard(boardDto.getTitle(), boardDto.getName(), boardDto.getSkillStack(), boardDto.getWorkField(), boardDto.getMaxPeople(), boardDto.getEndDate(), boardDto.getContent(), boardDto.getPostEndDate());
    }


    // 글 상세보기
    @GetMapping("/detail/{id}")
    public BoardEntity detail(@PathVariable Integer id){
        return this.boardService.boardView(id);
    }

    // 글 수정
    @PostMapping("/update/{id}")
    public void update(BoardDto boardDto, @PathVariable Integer id) {
        System.out.println("수정 완료");
        BoardEntity boardEntity = this.boardService.boardView(id);
        this.boardService.update(boardEntity, boardDto.getTitle(), boardDto.getSkillStack(), boardDto.getWorkField(), boardDto.getMaxPeople(), boardDto.getEndDate(), boardDto.getContent(), boardDto.getPostEndDate());
    }

    // 글 삭제
    @GetMapping("/delete")
    public void delete(Integer id) {
        System.out.println("삭제 완료");
        this.boardService.delete(id);
    }
}
