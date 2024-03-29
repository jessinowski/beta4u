package com.github.backend.service;

import com.github.backend.models.Boulder;
import com.github.backend.models.User;
import com.github.backend.models.UserDto;
import com.github.backend.repo.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepo userRepo;

    public Optional<User> getUserById(String id){
        return userRepo.findById(id);
    }

    public User createUser(OAuth2User user, UserDto newUserDto){
        User createdUser = new User(user.getAttributes().get("id").toString(),
                newUserDto.getUsername(),
                newUserDto.getFullName(),
                user.getAttributes().get("avatar_url").toString(),
                newUserDto.getHomeGym(),
                newUserDto.getFavoriteHolds(),
                newUserDto.getFavoriteStyles(),
                null,
                null,
                null,
                null);
        return userRepo.save(createdUser);
    }

    public List<Boulder> getFlashes(OAuth2User user){
        return getUserById(user.getAttributes().get("id").toString()).orElseThrow().getMyFlashes();
    }

    public void changeFlashes(Boulder boulder, OAuth2User user){
        User currentUser = getUserById(user.getAttributes().get("id").toString()).orElseThrow();
        Optional<Boulder> flashedBoulder = currentUser.getMyFlashes().stream().filter(flash -> flash.getId().equals(boulder.getId())).findFirst();
        if(flashedBoulder.isEmpty()){
            currentUser.getMyFlashes().add(boulder);
        } else {
            currentUser.getMyFlashes().remove(flashedBoulder.get());
        }
        userRepo.save(currentUser);
    }

    public List<Boulder> getTops(OAuth2User user){
        return getUserById(user.getAttributes().get("id").toString()).orElseThrow().getMyTops();
    }

    public void changeTops(Boulder boulder, OAuth2User user){
        User currentUser = getUserById(user.getAttributes().get("id").toString()).orElseThrow();
        Optional<Boulder> toppedBoulder = currentUser.getMyTops().stream().filter(top -> top.getId().equals(boulder.getId())).findFirst();
        if(toppedBoulder.isEmpty()){
            currentUser.getMyTops().add(boulder);
        } else {
            currentUser.getMyTops().remove(toppedBoulder.get());
        }
        userRepo.save(currentUser);
    }

    public List<Boulder> getProjects(OAuth2User user){
        return getUserById(user.getAttributes().get("id").toString()).orElseThrow().getMyProjects();
    }

    public void changeProjects(Boulder boulder, OAuth2User user){
        User currentUser = getUserById(user.getAttributes().get("id").toString()).orElseThrow();
        Optional<Boulder> projectedBoulder = currentUser.getMyProjects().stream().filter(project -> project.getId().equals(boulder.getId())).findFirst();
        if(projectedBoulder.isEmpty()){
            currentUser.getMyProjects().add(boulder);
        } else {
            currentUser.getMyProjects().remove(projectedBoulder.get());
        }
        userRepo.save(currentUser);
    }
}
