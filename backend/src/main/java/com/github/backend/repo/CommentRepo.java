package com.github.backend.repo;

import com.github.backend.models.Comment;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentRepo extends MongoRepository<Comment,String> {
}
