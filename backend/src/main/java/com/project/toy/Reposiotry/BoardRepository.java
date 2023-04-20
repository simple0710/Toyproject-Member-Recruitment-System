package com.project.toy.Reposiotry;

import com.project.toy.Entity.BoardEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BoardRepository extends JpaRepository<BoardEntity, Integer> {
    List<BoardEntity> findAll();
    Page<BoardEntity> findAll(Pageable pageable);
    List<BoardEntity> findByTitleContaining(String title, Sort createDate);

}
