package com.github.backend.models;

import com.github.backend.models.enums.Gym;
import com.github.backend.models.enums.Hold;

import com.github.backend.models.enums.Style;

import lombok.With;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;

@With
@Document(collection = "users")
public record User (
    @Id
    String id,
    String username,
    String fullName,
    String imagePath,
    Gym homeGym,
    List<Hold> favoriteHolds,
    List<Style> favoriteStyles,
    @DBRef
    List<Boulder> myFavorites,
    @DBRef
    List<Boulder> myTops,
    @DBRef
    List<Boulder> myFlashes,
    @DBRef
    List<Boulder> myProjects
){}
