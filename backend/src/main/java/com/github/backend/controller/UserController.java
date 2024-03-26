package com.github.backend.controller;
import com.github.backend.models.BoulderDto;
import com.github.backend.models.User;
import com.github.backend.models.UserDto;
import com.github.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping
    public Optional<User> getUserById(@AuthenticationPrincipal OAuth2User user){
        return userService.getUserById(user.getAttributes().get("id").toString());
    }

    @PostMapping("/create")
    public User createUser(@AuthenticationPrincipal OAuth2User user, @RequestBody UserDto newUserDto){
        return userService.createUser(user, newUserDto);
    }

    @PutMapping("/likeBoulder/{id}")
    public User addBoulderToFavorites(@PathVariable String id, @AuthenticationPrincipal OAuth2User user, @RequestBody BoulderDto boulderDto){
        return userService.addBoulderToFavorites(id, user, boulderDto);
    }
}
