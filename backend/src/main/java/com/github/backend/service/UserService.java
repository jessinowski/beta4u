package com.github.backend.service;

import com.github.backend.models.Boulder;
import com.github.backend.models.BoulderDto;
import com.github.backend.models.User;
import com.github.backend.models.UserDto;
import com.github.backend.repo.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
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

    public User addBoulderToFavorites(String boulderId, OAuth2User user, BoulderDto boulderDto) {
        User currentUser = userRepo.findById(user.getAttributes().get("id").toString()).orElseThrow();
        Boulder likedBoulder = new Boulder(
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
        currentUser.getMyFavorites().add(likedBoulder);
        return userRepo.save(currentUser);
    }
}
