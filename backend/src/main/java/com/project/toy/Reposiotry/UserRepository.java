package com.project.toy.Reposiotry;

import com.project.toy.Entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<UserEntity, Long > {

}
