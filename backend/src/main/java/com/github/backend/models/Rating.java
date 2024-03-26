package com.github.backend.models;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.DBRef;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class Rating {
    private double ratingPoints;

    @DBRef
    private User user;
}
