package com.github.backend.controller;

import com.github.backend.models.Comment;
import com.github.backend.models.CommentDto;
import com.github.backend.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/comments")
@RequiredArgsConstructor
public class CommentController {
    private final CommentService commentService;

    @PostMapping("/create")
    public Comment createComment(@AuthenticationPrincipal OAuth2User user, @RequestBody CommentDto commentDto){
        return commentService.createComment(user, commentDto);
    }

    @PutMapping("/edit/{id}")
    public Comment editComment(@PathVariable String id, @RequestBody String newContent){
        return commentService.editComment(id, newContent);
    }

    @DeleteMapping("/{id}")
    public void deleteComment(@PathVariable String id){
        commentService.deleteComment(id);
    }

}
