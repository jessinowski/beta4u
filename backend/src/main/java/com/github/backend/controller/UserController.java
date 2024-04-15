package com.github.backend.controller;
import com.github.backend.models.Boulder;
import com.github.backend.models.User;
import com.github.backend.models.UserDto;
import com.github.backend.service.BoulderService;
import com.github.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    private final BoulderService boulderService;
    @GetMapping
    public User getMe(@AuthenticationPrincipal OAuth2User user){
        if (user == null) {
            return null;
        }
        return userService.getUserById(user.getAttributes().get("id").toString()).orElse(new User(user.getAttributes()));
    }

    @GetMapping("/all")
    public List<User> getAllUsers(){
        return userService.getAllUsers();
    }

    @PostMapping("/edit")
    public User editUser(@AuthenticationPrincipal OAuth2User user, @RequestBody UserDto userDto){
        return userService.editUser(user, userDto);
    }

    @PostMapping("/create")
    public User createUser(@AuthenticationPrincipal OAuth2User user, @RequestBody UserDto newUserDto){
        return userService.createUser(user, newUserDto);
    }
    @GetMapping("/favorites")
    public List<Boulder> getMyFavorites(@AuthenticationPrincipal OAuth2User user){
        return userService.getMyFavorites(user);
    }

    @PutMapping("/favorites/{id}")
    public void changeFavorites(@PathVariable String id, @AuthenticationPrincipal OAuth2User user){
        Boulder boulder = boulderService.getBoulderById(id);
        userService.changeFavorites(boulder, user);
    }

    @PutMapping(value="/change-lists/{id}", consumes= MediaType.TEXT_PLAIN_VALUE)
    public void changeLists(@PathVariable String id, @AuthenticationPrincipal OAuth2User user, @RequestBody(required = false) String list){
        Boulder boulder = boulderService.getBoulderById(id);
        userService.changeLists(boulder, user, list == null ? "" : list);
    }
    @GetMapping("/check-lists/{id}")
    public String checkMyLists(@AuthenticationPrincipal OAuth2User user, @PathVariable String id){
        Boulder boulder = boulderService.getBoulderById(id);
        return userService.checkMyLists(user, boulder);
    }

    @GetMapping("/flashes")
    public List<Boulder> getFlashes(@AuthenticationPrincipal OAuth2User user){
        return userService.getFlashes(user);
    }

    @GetMapping("/tops")
    public List<Boulder> getTops(@AuthenticationPrincipal OAuth2User user){
        return userService.getTops(user);
    }

    @GetMapping("/projects")
    public List<Boulder> getProjects(@AuthenticationPrincipal OAuth2User user){
        return userService.getProjects(user);
    }


}
