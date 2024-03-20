package com.github.backend.models;

import com.github.backend.models.enums.Gym;
import com.github.backend.models.enums.Hold;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import com.github.backend.models.enums.Style;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "users")
public class User {
    @Id
    private String id;
    private String username;
    private String fullName;
    private String imagePath;
    private Gym homeGym;
    private List<Hold> favoriteHolds;
    private List<Style> favoriteStyles;
    @DBRef
    private List<Boulder> myFavorites;
    @DBRef
    private List<Boulder> myTops;
    @DBRef
    private List<Boulder> myFlashes;
    @DBRef
    private List<Boulder> myProjects;
}
