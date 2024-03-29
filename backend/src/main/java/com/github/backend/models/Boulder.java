package com.github.backend.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.github.backend.models.enums.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "boulders")
public class Boulder {
    @Id
    private String id;
    private String imagePath;
    private String videoPath;
    private Level level;
    private String sector;
    private Gym gym;
    private LocalDate date;
    @DBRef(lazy = true)
    @JsonIgnore
    private List<Comment> comments = new ArrayList<>();
    private List<Rating> ratings = new ArrayList<>();
    private String routesetter;
    private Color color;
    private List<Hold> holds = new ArrayList<>();
    private List<Style> styles = new ArrayList<>();
}
