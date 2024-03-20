package com.github.backend.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.github.backend.models.enums.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.With;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

@Data
@With
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "boulders")
public class Boulder {
    @Id
    private String id;
    private String imagePath;
    private String videoPath;
    private Level level;
    private Sector sector;
    private Gym gym;
    private LocalDateTime date;
    @DBRef(lazy = true)
    @JsonIgnore
    private List<Comment> comments;
    private List<Rating> ratings;
    private Routesetter routesetter;
    private Color color;
    private List<Hold> holds;
    private List<Style> styles;
}
