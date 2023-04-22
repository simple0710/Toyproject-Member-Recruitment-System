package com.project.toy.Controller;

import com.project.toy.BoardDto.UserDto;
import com.project.toy.Entity.UserEntity;
import com.project.toy.Service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/user")
public class UserAPIController {

    private final UserService userService;

    @PostMapping("/signup")
    public void signup(UserDto userDto) {
        userService.create(userDto.getName(), userDto.getPassword(), userDto.getEmail());
    }

    @GetMapping("/token")
    public Optional<UserEntity> token(UserDto userDto) {
        System.out.println(userDto.getName());
        Optional<UserEntity> userEntity = userService.getAccount(userDto);
        System.out.println(userEntity);
        return userEntity;
    }

//    @GetMapping("/name")
//    public UserEntity getUser(String username) {
//    }
}
