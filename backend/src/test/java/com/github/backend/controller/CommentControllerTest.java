package com.github.backend.controller;

import com.github.backend.models.Boulder;
import com.github.backend.models.User;
import com.github.backend.models.enums.*;
import com.github.backend.repo.BoulderRepo;
import com.github.backend.repo.CommentRepo;
import com.github.backend.repo.UserRepo;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.security.config.http.MatcherType.mvc;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.oidcLogin;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
@SpringBootTest
@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
@WithMockUser
class CommentControllerTest {
    @Autowired
    private MockMvc mvc;
    @Autowired
    private UserRepo userRepo;

    @Autowired
    private CommentRepo commentRepo;

    @Autowired
    private BoulderRepo boulderRepo;
    @Test
    void createComment() throws Exception {
        //GIVEN
        String requestBody = "nice";
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
                List.of(),
                false);
        userRepo.save(user);
        Boulder boulder= new Boulder("1",
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
        //WHEN & THEN
        mvc.perform(post("/api/comments/create/1")
                .with(oidcLogin().userInfoToken(token -> token
                        .claim("id", "22")
                        .claim("avatar_url", "image")))
                .contentType(MediaType.TEXT_PLAIN_VALUE)
                .content(requestBody))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                            {
                            "id": "1",
                            "imagePath": "image",
                            "videoPath": "video",
                            "level": "EIGHT",
                            "sector": "5",
                            "gym": "UA_HH_OST",
                            "date": null,
                            "comments":
                            [
                            {
                                "id": "3",
                                "content": "nice",
                                "user":{
                                    "id": "22",
                                    "username": "jurassica",
                                    "fullName": "Jessica",
                                    "imagePath": "image",
                                    "homeGym": "UA_HH_OST",
                                    "favoriteHolds": ["CRIMP"],
                                    "favoriteStyles": ["MANTLE"],
                                    "newUser": false
                                },
                                "date": null
                            }
                            ],
                            "routesetter": "Alex",
                            "color": "BLUE",
                            "holds": ["CRIMP"],
                            "styles": ["MANTLE"]
                        }
                """))
                .andReturn();
    }

    @Test
    void deleteComment() throws Exception {
        //GIVEN
        //WHEN & THEN
        mvc.perform(delete("/api/comments/1"))
                .andExpect(status().isOk())
                .andReturn();
    }
}