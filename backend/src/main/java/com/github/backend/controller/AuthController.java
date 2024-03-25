package com.github.backend.controller;

import com.github.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;

    @GetMapping("/me")
    public boolean getMe(@AuthenticationPrincipal OAuth2User user) {
        return userService.getUserById(user.getAttributes().get("id").toString()).isPresent();
    }

    @GetMapping("/myAvatar")
    public String getMyAvatar(@AuthenticationPrincipal OAuth2User user){
        return user.getAttributes().get("avatar_url").toString();
    }
}
