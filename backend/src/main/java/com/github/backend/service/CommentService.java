package com.github.backend.service;

import com.github.backend.models.Boulder;
import com.github.backend.models.Comment;
import com.github.backend.models.CommentDto;
import com.github.backend.models.User;
import com.github.backend.repo.BoulderRepo;
import com.github.backend.repo.CommentRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class CommentService {
    private final CommentRepo commentRepo;
    private final UserService userService;
    private final BoulderRepo boulderRepo;

    public Comment createComment(OAuth2User user, String id, CommentDto commentDto) {
        User currentUser = userService.getUserById(user.getAttributes().get("id").toString()).orElseThrow();
        Comment comment = new Comment(null, commentDto.getContent(), currentUser, LocalDateTime.now());
        Boulder boulder = boulderRepo.findById(id).orElseThrow();
        boulder.getComments().add(comment);
        boulderRepo.save(boulder);
        return commentRepo.save(comment);
    }

    public void deleteComment(String commentId, String boulderId){
        Comment comment = commentRepo.findById(commentId).orElseThrow();
        Boulder boulder = boulderRepo.findById(boulderId).orElseThrow();
        boulder.getComments().remove(comment);
        commentRepo.deleteById(commentId);
    }
}
