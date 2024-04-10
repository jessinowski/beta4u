package com.github.backend.service;

import com.github.backend.models.Boulder;
import com.github.backend.models.Comment;
import com.github.backend.models.User;
import com.github.backend.repo.BoulderRepo;
import com.github.backend.repo.CommentRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import static java.util.stream.Collectors.toList;

@Service
@RequiredArgsConstructor
public class CommentService {
    private final CommentRepo commentRepo;
    private final UserService userService;
    private final BoulderRepo boulderRepo;

    public void createComment(OAuth2User user, String id, String content) {
        Boulder boulder = boulderRepo.findById(id).orElseThrow();
        User currentUser = userService.getUserById(user.getAttributes().get("id").toString()).orElseThrow();
        Comment comment = new Comment(UUID.randomUUID().toString(), content, currentUser, LocalDateTime.now());
        commentRepo.save(comment);
        boulder.getComments().add(comment);
        boulderRepo.save(boulder);
    }

    public void deleteComment(String commentId, String boulderId){
        Boulder boulder = boulderRepo.findById(boulderId).orElseThrow();
        List<Comment> newComments = boulder.getComments().stream()
                        .filter(comment -> !comment.getId().equals(commentId))
                                .collect(toList());
        boulder.setComments(newComments);
        boulderRepo.save(boulder);
        commentRepo.deleteById(commentId);
    }
}
