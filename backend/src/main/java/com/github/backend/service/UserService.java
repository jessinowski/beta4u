package com.github.backend.service;

import com.github.backend.models.Boulder;
import com.github.backend.models.BoulderDto;
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

    public Optional<User> getUserById(String id) {
        return userRepo.findById(id);
    }

    public User createUser(OAuth2User user, UserDto newUserDto) {
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

    public User changeFavorites(String boulderId, OAuth2User user, BoulderDto boulderDto) {
        User currentUser = getUserById(user.getAttributes().get("id").toString()).orElseThrow();
        Boulder boulder = new Boulder(
                boulderId,
                boulderDto.getImagePath(),
                boulderDto.getVideoPath(),
                boulderDto.getLevel(),
                boulderDto.getSector(),
                boulderDto.getGym(),
                boulderDto.getDate(),
                boulderDto.getComments(),
                boulderDto.getRatings(),
                boulderDto.getRoutesetter(),
                boulderDto.getColor(),
                boulderDto.getHolds(),
                boulderDto.getStyles());
        if(!currentUser.getMyFavorites().contains(boulder)){
            currentUser.getMyFavorites().add(boulder);
        } else {
            currentUser.getMyFavorites().remove(boulder);
        }
        return userRepo.save(currentUser);
    }

    public List<Boulder> getMyFavorites(OAuth2User user) {
        return userRepo.findById(user.getAttributes().get("id").toString()).orElseThrow().getMyFavorites();
    }
}
