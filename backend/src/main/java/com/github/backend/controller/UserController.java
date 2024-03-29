package com.github.backend.controller;

import com.github.backend.models.Boulder;
import com.github.backend.models.User;
import com.github.backend.models.UserDto;
import com.github.backend.service.BoulderService;
import com.github.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    private final BoulderService boulderService;

    @GetMapping
    public Optional<User> getUserById(@AuthenticationPrincipal OAuth2User user){
        return userService.getUserById(user.getAttributes().get("id").toString());
    }

    @PostMapping("/create")
    public User createUser(@AuthenticationPrincipal OAuth2User user, @RequestBody UserDto newUserDto){
        return userService.createUser(user, newUserDto);
    }

    @GetMapping("/flashes")
    public List<Boulder> getFlashes(@AuthenticationPrincipal OAuth2User user){
        return userService.getFlashes(user);
    }

    @PutMapping("/flashes/{id}")
    public void changeFlashes(@PathVariable String id, @AuthenticationPrincipal OAuth2User user){
        Boulder boulder = boulderService.getBoulderById(id);
        userService.changeFlashes(boulder, user);
    }

    @GetMapping("/tops")
    public List<Boulder> getTops(@AuthenticationPrincipal OAuth2User user){
        return userService.getTops(user);
    }

    @PutMapping("/tops/{id}")
    public void changeTops(@PathVariable String id, @AuthenticationPrincipal OAuth2User user){
        Boulder boulder = boulderService.getBoulderById(id);
        userService.changeTops(boulder, user);
    }

    @GetMapping("/projects")
    public List<Boulder> getProjects(@AuthenticationPrincipal OAuth2User user){
        return userService.getProjects(user);
    }

    @PutMapping("/projects/{id}")
    public void changeProjects(@PathVariable String id, @AuthenticationPrincipal OAuth2User user){
        Boulder boulder = boulderService.getBoulderById(id);
        userService.changeProjects(boulder, user);
    }

}
