package com.github.backend.service;

import com.github.backend.models.Comment;
import com.github.backend.models.CommentDto;
import com.github.backend.models.User;
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

    public Comment createComment(OAuth2User user, CommentDto commentDto) {
        User currentUser = userService.getUserById(user.getAttributes().get("id").toString()).orElseThrow();
        Comment comment = new Comment(null, commentDto.getContent(), currentUser, LocalDateTime.now());
        return commentRepo.save(comment);
    }

    public Comment editComment(String id, String newContent) {
        Comment updatedComment = commentRepo.findById(id).orElseThrow();
        updatedComment.setContent(newContent);
        updatedComment.setDate(LocalDateTime.now());
        return commentRepo.save(updatedComment);
    }

    public void deleteComment(String id){
        commentRepo.deleteById(id);
    }
}
