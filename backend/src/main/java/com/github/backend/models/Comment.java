package com.github.backend.models;
import lombok.With;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
@With
@Document(collection = "comments")
public record Comment (
    @Id
    String id,
    String content,
    @DBRef
    User user,
    LocalDateTime date
){}
