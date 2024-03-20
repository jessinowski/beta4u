package com.github.backend.models;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.github.backend.models.enums.*;
import lombok.With;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;
import java.util.List;

@With
@Document(collection = "boulders")
public record Boulder (
    @Id
    String id,
    String imagePath,
    String videoPath,
    Level level,
    Sector sector,
    Gym gym,
    LocalDateTime date,
    @DBRef
    @JsonIgnore
    List<Comment> comments,
    Routesetter routesetter,
    Color color,
    List<Hold> holds,
    List<Style> styles
){}
