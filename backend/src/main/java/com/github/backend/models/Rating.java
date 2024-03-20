package com.github.backend.models;
import lombok.With;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;


@With
public record Rating (
    @Id
    String id,
    double ratingPoints,
    @DBRef
    User user
){}
