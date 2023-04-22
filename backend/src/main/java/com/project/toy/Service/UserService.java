package com.project.toy.Service;

import com.project.toy.BoardDto.UserDto;
import com.project.toy.Entity.UserEntity;
import com.project.toy.Reposiotry.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

import java.util.Optional;

@RequiredArgsConstructor
@Service
public class UserService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    public UserEntity create(String name, String password, String email) {
        UserEntity user = new UserEntity();
        user.setName(name);
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));
        this.userRepository.save(user);
        System.out.println("생성");
        return user;
    }

    public Optional<UserEntity> getAccount(UserDto userDto) {
        return this.userRepository.findByName(userDto.getName());
    }

    // 실험
    public UserEntity getUser(String username) {
        Optional<UserEntity> userEntity = this.userRepository.findByName(username);
        return userEntity.get();
    }
}
