package com.github.backend.controller;
import com.github.backend.models.Boulder;
import com.github.backend.models.User;
import com.github.backend.models.enums.*;
import com.github.backend.repo.BoulderRepo;
import com.github.backend.repo.UserRepo;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.List;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.oidcLogin;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


@SpringBootTest
@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
class UserControllerTest {

    @Autowired
    private MockMvc mvc;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private BoulderRepo boulderRepo;

    @Test
    void getUserById() throws Exception {
        //GIVEN
        User user= new User(
                "22",
                "jurassica",
                "Jessica",
                "image",
                Gym.UA_HH_OST,
                List.of(Hold.CRIMP),
                List.of(Style.MANTLE),
                List.of(),
                List.of(),
                List.of(),
                List.of());
        userRepo.save(user);
        //WHEN & THEN
        mvc.perform(get("/api/user")
                        .with(oidcLogin().userInfoToken(token -> token
                                .claim("id", "22"))))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        
                        {
                            "id": "22",
                            "username": "jurassica",
                            "fullName": "Jessica",
                            "imagePath": "image",
                            "homeGym": "UA_HH_OST",
                            "favoriteHolds": ["CRIMP"],
                            "favoriteStyles": ["MANTLE"]
                        }
                        
                """));
    }

    @Test
    void createUser() throws Exception {
        // GIVEN
        String requestBody = """
                        {
                            "username": "jurassica",
                            "fullName": "Jessica",
                            "imagePath": "image",
                            "homeGym": "UA_HH_OST",
                            "favoriteHolds": ["CRIMP"],
                            "favoriteStyles": ["MANTLE"]
                        }
                """;

        // WHEN & THEN
        mvc.perform(MockMvcRequestBuilders.post("/api/user/create")
                        .with(oidcLogin().userInfoToken(token -> token
                                .claim("id", "22")
                                .claim("avatar_url", "image")))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(content().json("""
                        
                        {
                            "id": "22",
                            "username": "jurassica",
                            "fullName": "Jessica",
                            "imagePath": "image",
                            "homeGym": "UA_HH_OST",
                            "favoriteHolds": ["CRIMP"],
                            "favoriteStyles": ["MANTLE"]
                        }
                        
                """));
    }

    @Test
    void getMyFavorites() throws Exception {
        //GIVEN
        Boulder boulder =new Boulder(
                "1",
                "image",
                "video",
                Level.EIGHT,
                "5",
                Gym.UA_HH_OST,
                null,
                List.of(),
                List.of(),
                "Alex",
                Color.BLUE,
                List.of(Hold.CRIMP),
                List.of(Style.MANTLE));
        boulderRepo.save(boulder);
        User user= new User(
                "22",
                "jurassica",
                "Jessica",
                "image",
                Gym.UA_HH_OST,
                List.of(Hold.CRIMP),
                List.of(Style.MANTLE),
                List.of(boulder),
                List.of(),
                List.of(),
                List.of());
        userRepo.save(user);
        //WHEN & THEN
        mvc.perform(get("/api/user/favorites")
                        .with(oidcLogin().userInfoToken(token -> token
                                .claim("id", "22"))))
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.content().json("""
                    [
                        {
                            "id": "1",
                            "imagePath": "image",
                            "videoPath": "video",
                            "level": "EIGHT",
                            "sector": "5",
                            "gym": "UA_HH_OST",
                            "date": null,
                            "routesetter": "Alex",
                            "color": "BLUE",
                            "holds": ["CRIMP"],
                            "styles": ["MANTLE"]
                        }
                    ]
                """))
                .andReturn();
    }

    @Test
    void changeFavorites() throws Exception {
        //GIVEN
        User existingUser = new User(
                "22",
                "jurassica",
                "Jessica",
                "image",
                Gym.UA_HH_OST,
                List.of(Hold.CRIMP),
                List.of(Style.MANTLE),
                List.of(),
                List.of(),
                List.of(),
                List.of());
        userRepo.save(existingUser);
        Boulder boulder = new Boulder("1",
                "image",
                "video",
                Level.EIGHT,
                "5",
                Gym.UA_HH_OST,
                null,
                List.of(),
                List.of(),
                "Alex",
                Color.BLUE,
                List.of(Hold.CRIMP),
                List.of(Style.MANTLE));
        boulderRepo.save(boulder);
        //WHEN
        mvc.perform(put("/api/user/favorites/1")
                        .with(oidcLogin().userInfoToken(token -> token
                                .claim("id", "22"))))
                //THEN
                .andExpect(status().isOk());
        mvc.perform(get("/api/user/favorites")
                        .with(oidcLogin().userInfoToken(token -> token
                                .claim("id", "22"))))
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.content().json("""
                    [
                        {
                            "id": "1",
                            "imagePath": "image",
                            "videoPath": "video",
                            "level": "EIGHT",
                            "sector": "5",
                            "gym": "UA_HH_OST",
                            "date": null,
                            "routesetter": "Alex",
                            "color": "BLUE",
                            "holds": ["CRIMP"],
                            "styles": ["MANTLE"]
                        }
                    ]
                """))
                .andReturn();
    }
}