package com.github.backend.models;

import com.github.backend.models.enums.Gym;
import com.github.backend.models.enums.Hold;
import com.github.backend.models.enums.Style;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
    private String username;
    private String fullName;
    private Gym homeGym;
    private List<Hold> favoriteHolds = new ArrayList<>();
    private List<Style> favoriteStyles = new ArrayList<>();
}
