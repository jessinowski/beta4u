package com.github.backend.controller;
import com.github.backend.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/comments")
@RequiredArgsConstructor
public class CommentController {
    private final CommentService commentService;

    @PostMapping(value="/create/{id}", consumes= MediaType.TEXT_PLAIN_VALUE)
    public void createComment(@AuthenticationPrincipal OAuth2User user, @PathVariable String id, @RequestBody String content){
        commentService.createComment(user, id, content);
    }

    @DeleteMapping("/{commentId}")
    public void deleteComment(@PathVariable String commentId, @RequestBody String boulderId){
        commentService.deleteComment(commentId, boulderId);
    }
}
