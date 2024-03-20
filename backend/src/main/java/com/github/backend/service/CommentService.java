package com.github.backend.service;
import com.github.backend.models.Comment;
import com.github.backend.repo.CommentRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CommentService {
    private final CommentRepo commentRepo;

    public List<Comment> getAllComments(){
        return commentRepo.findAll();
    }
}
