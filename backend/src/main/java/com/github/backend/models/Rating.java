package com.github.backend.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.With;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;

@Data
@With
@NoArgsConstructor
@AllArgsConstructor
public class Rating {
    @Id
    private String id;
    private double ratingPoints;
    @DBRef
    private User user;
}
