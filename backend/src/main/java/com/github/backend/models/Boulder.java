package com.github.backend.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.github.backend.models.enums.*;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Getter
@Setter
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
    private List<Comment> comments = new ArrayList<>();
    private List<Rating> ratings = new ArrayList<>();
    private Routesetter routesetter;
    private Color color;
    private List<Hold> holds = new ArrayList<>();
    private List<Style> styles = new ArrayList<>();

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Boulder boulder = (Boulder) o;
        return Objects.equals(id, boulder.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public String toString() {
        return "Boulder{" +
                "id='" + id + '\'' +
                ", imagePath='" + imagePath + '\'' +
                ", videoPath='" + videoPath + '\'' +
                ", level=" + level +
                ", sector=" + sector +
                ", gym=" + gym +
                ", date=" + date +
                ", routesetter=" + routesetter +
                ", color=" + color +
                ", holds=" + holds +
                ", styles=" + styles +
                '}';
    }
}
