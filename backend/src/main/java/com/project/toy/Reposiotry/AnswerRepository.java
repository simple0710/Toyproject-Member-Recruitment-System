package com.project.toy.Reposiotry;

import com.project.toy.Entity.BoardEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import com.project.toy.Entity.AnswerEntity;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnswerRepository extends JpaRepository<AnswerEntity, Integer> {
}
