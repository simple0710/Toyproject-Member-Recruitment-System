package com.project.toy.Controller;

import com.project.toy.BoardDto.UserDto;
import com.project.toy.Entity.AnswerEntity;
import com.project.toy.Entity.BoardEntity;
import com.project.toy.Entity.UserEntity;
import com.project.toy.Service.AnswerService;
import com.project.toy.Service.BoardService;
import com.project.toy.Service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@RequestMapping("/api/answer")
@RestController
public class AnswerAPIController {

    private final BoardService boardService;

    private final AnswerService answerService;

    private final UserService userService;

    // 글(id)에 답글(content) 추가
    @PostMapping("/create/{id}")
    public void createAnswer(@PathVariable("id") Integer id, @RequestParam String content) {
        BoardEntity boardEntity = this.boardService.boardView(id);
        this.answerService.create(boardEntity, content);
    }


    // 해당 글(id)의 답글 가져오기
    @GetMapping("/detail/{id}")
    public List<AnswerEntity> detailAnswer(@PathVariable("id") Integer id) {
        return this.answerService.getList(id);
    }
}
