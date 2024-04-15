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

    public List<User> getAllUsers(){
        return userRepo.findAll();
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
                null,
                false);
        return userRepo.save(createdUser);
    }
    public User editUser(OAuth2User user, UserDto userDto) {
        User currentUser = getUserById(user.getAttributes().get("id").toString()).orElseThrow();
        currentUser.setUsername(userDto.getUsername());
        currentUser.setFullName(userDto.getFullName());
        currentUser.setHomeGym(userDto.getHomeGym());
        currentUser.setFavoriteHolds(userDto.getFavoriteHolds());
        currentUser.setFavoriteStyles(userDto.getFavoriteStyles());
        return userRepo.save(currentUser);
    }
    public void changeFavorites(Boulder boulder, OAuth2User user) {
        User currentUser = getUserById(user.getAttributes().get("id").toString()).orElseThrow();
        Optional<Boulder> favoriteBoulder= currentUser.getMyFavorites().stream().filter(favorite -> favorite.getId().equals(boulder.getId())).findFirst();
        if(favoriteBoulder.isEmpty()){
            currentUser.getMyFavorites().add(boulder);
        } else {
            currentUser.getMyFavorites().remove(favoriteBoulder.get());
        }
        userRepo.save(currentUser);
    }
    public List<Boulder> getMyFavorites(OAuth2User user) {
        return getUserById(user.getAttributes().get("id").toString()).orElseThrow().getMyFavorites();
    }

    public void changeLists(Boulder boulder, OAuth2User user, String list){
        User currentUser = getUserById(user.getAttributes().get("id").toString()).orElseThrow();
        switch(list){
            case "flashes":
                currentUser.getMyFlashes().add(boulder);
                currentUser.getMyTops().remove(boulder);
                currentUser.getMyProjects().remove(boulder);
                break;
            case "tops":
                currentUser.getMyTops().add(boulder);
                currentUser.getMyFlashes().remove(boulder);
                currentUser.getMyProjects().remove(boulder);
                break;
            case "projects":
                currentUser.getMyProjects().add(boulder);
                currentUser.getMyTops().remove(boulder);
                currentUser.getMyFlashes().remove(boulder);
                break;
            case "":
                currentUser.getMyFlashes().remove(boulder);
                currentUser.getMyTops().remove(boulder);
                currentUser.getMyProjects().remove(boulder);
                break;
            default:
                throw new IllegalArgumentException();
        }
        userRepo.save(currentUser);
    }
    public String checkMyLists(OAuth2User user, Boulder boulder) {
        User currentUser = getUserById(user.getAttributes().get("id").toString()).orElseThrow();
        if(currentUser.getMyFlashes().contains(boulder)){
            return "flashes";
        } else if(currentUser.getMyTops().contains(boulder)){
            return "tops";
        } else if(currentUser.getMyProjects().contains(boulder)){
            return "projects";
        } else {
            return "";
        }
    }

    public List<Boulder> getFlashes(OAuth2User user){
        return getUserById(user.getAttributes().get("id").toString()).orElseThrow().getMyFlashes();
    }

    public List<Boulder> getTops(OAuth2User user){
        return getUserById(user.getAttributes().get("id").toString()).orElseThrow().getMyTops();
    }

    public List<Boulder> getProjects(OAuth2User user){
        return getUserById(user.getAttributes().get("id").toString()).orElseThrow().getMyProjects();
    }
}
