package com.project.toy.Service;

import com.project.toy.Entity.UserEntity;
import com.project.toy.Reposiotry.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class UserService {

    private final UserRepository userRepository;

    public UserEntity create(String username, String nickname, String email, String password) {
        UserEntity user = new UserEntity();
        user.setUsername(username);
        user.setEmail(email);
        user.setPassword(password);
        this.userRepository.save(user);
        return user;
    }
}
