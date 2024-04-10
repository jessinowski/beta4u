package com.github.backend.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.github.backend.models.enums.Gym;
import com.github.backend.models.enums.Hold;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import com.github.backend.models.enums.Style;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import static com.github.backend.service.AttributeUtils.getStringAttribute;

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
    private List<Hold> favoriteHolds = new ArrayList<>();
    private List<Style> favoriteStyles = new ArrayList<>();
    @DBRef
    @JsonIgnore
    private List<Boulder> myFavorites = new ArrayList<>();
    @DBRef
    @JsonIgnore
    private List<Boulder> myTops = new ArrayList<>();
    @DBRef
    @JsonIgnore
    private List<Boulder> myFlashes = new ArrayList<>();
    @DBRef
    @JsonIgnore
    private List<Boulder> myProjects = new ArrayList<>();

    private boolean newUser;

    public User(Map<String, Object> attributes){
        this.id = getStringAttribute(attributes, "id");
        this.username = "";
        this.fullName = "";
        this.imagePath = getStringAttribute(attributes, "avatar_url");
        this.homeGym = null;
        this.favoriteHolds = null;
        this.favoriteStyles = null;
        this.myFavorites = null;
        this.myTops = null;
        this.myFlashes = null;
        this.myProjects = null;
        this.newUser = true;
    }
}
