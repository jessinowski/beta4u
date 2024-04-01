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
    @GetMapping("/favorites")
    public List<Boulder> getMyFavorites(@AuthenticationPrincipal OAuth2User user){
        return userService.getMyFavorites(user);
    }

    @PostMapping("/create")
    public User createUser(@AuthenticationPrincipal OAuth2User user, @RequestBody UserDto newUserDto){
        return userService.createUser(user, newUserDto);
    }

    @PutMapping("/favorites/{id}")
    public void changeFavorites(@PathVariable String id, @AuthenticationPrincipal OAuth2User user){
        Boulder boulder = boulderService.getBoulderById(id);
        userService.changeFavorites(boulder, user);
    }
}
