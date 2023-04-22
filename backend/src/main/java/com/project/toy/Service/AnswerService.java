package com.project.toy.Service;

import com.project.toy.Entity.AnswerEntity;
import com.project.toy.Entity.BoardEntity;
import com.project.toy.Entity.UserEntity;
import com.project.toy.Reposiotry.AnswerRepository;
import com.project.toy.Reposiotry.BoardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class AnswerService {

    private final BoardRepository boardRepository;

    private final AnswerRepository answerRepository;

    public void create(BoardEntity boardEntity, String content) {
        AnswerEntity answerEntity = new AnswerEntity();
        answerEntity.setContent(content);
        answerEntity.setCreateDate(LocalDateTime.now());
        answerEntity.setBoard(boardEntity);
        this.answerRepository.save(answerEntity);
    }

    public List<BoardEntity> detailAnswer(Integer id) {
        return this.boardRepository.findAll(Sort.by(Sort.Direction.DESC, "createDate"));
    }

    public List<AnswerEntity> getList(Integer id) {
        System.out.println(this.boardRepository.findById(id).get().getAnswerList());
        return this.boardRepository.findById(id).get().getAnswerList();
    }
}
