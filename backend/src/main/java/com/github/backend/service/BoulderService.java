package com.github.backend.service;
import com.github.backend.models.Comment;
import com.github.backend.models.Rating;
import com.github.backend.repo.BoulderRepo;
import lombok.RequiredArgsConstructor;
import com.github.backend.models.Boulder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import java.util.List;

import static java.util.stream.Collectors.toList;

@Service
@RequiredArgsConstructor
public class BoulderService {
    private final BoulderRepo boulderRepo;
    private final UserService userService;

    public List<Boulder> getAllBoulders(){
        return boulderRepo.findAll();
    }
    public Boulder getBoulderById(String id) {
        return boulderRepo.findById(id).orElseThrow();
    }

    public Boulder changeRating(OAuth2User oAuth2User, String id, double ratingPoints){
        Rating newRating = new Rating(ratingPoints, userService.getUserById(oAuth2User.getAttributes().get("id").toString()).orElseThrow());
        Boulder boulder = boulderRepo.findById(id).orElseThrow();
        String userIdOfNewRating = newRating.getUser().getId();
        List<Rating> newRatings = boulder.getRatings().stream()
                .filter(rating-> !rating.getUser().getId().equals(userIdOfNewRating))
                .collect(toList());
        boulder.setRatings(newRatings);
        boulder.getRatings().add(newRating);
        return boulderRepo.save(boulder);
    }

    public List<Comment> getCommentsByBoulder(String id) {
        Boulder boulder = boulderRepo.findById(id).orElseThrow();
        return boulder.getComments();
    }
}
