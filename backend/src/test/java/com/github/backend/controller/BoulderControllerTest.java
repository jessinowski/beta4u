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
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import java.util.List;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.oidcLogin;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@SpringBootTest
@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
@WithMockUser
class BoulderControllerTest {

    @Autowired
    private MockMvc mvc;

    @Autowired
    private BoulderRepo boulderRepo;

    @Autowired
    private UserRepo userRepo;

    @Test
    void getAllBoulders_returnEmptyList_whenCalledInitially() throws Exception {
        //GIVEN
        //WHEN & THEN
        mvc.perform(MockMvcRequestBuilders.get("/api/boulders"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json("[]"))
                .andReturn();
    }

    @Test
    void getAllBoulders_returnOnlyElement_whenCalledWithOneBoulder() throws Exception{
        //GIVEN
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
        mvc.perform(MockMvcRequestBuilders.get("/api/boulders"))
                .andExpect(MockMvcResultMatchers.status().isOk())
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
    void getBoulderById_returnBoulderWithId1_whenCalledWithId1() throws Exception {
        //GIVEN
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
        mvc.perform(MockMvcRequestBuilders.get("/api/boulders/1"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json("""
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
                """))
                .andReturn();
    }

    @Test
    void changeRating_addRating_whenListEmpty() throws Exception {
        //GIVEN
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
        //WHEN
        mvc.perform(put("/api/boulders/changeRating/"+boulder.getId())
                        .with(oidcLogin().userInfoToken(token->token.claim("id","22")))
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .content(String.valueOf(3.5)))
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
                                "ratings": [{"ratingPoints": 3.5,
                                             "user":                         {
                            "id": "22",
                            "username": "jurassica",
                            "fullName": "Jessica",
                            "imagePath": "image",
                            "homeGym": "UA_HH_OST",
                            "favoriteHolds": ["CRIMP"],
                            "favoriteStyles": ["MANTLE"]
                        }
                                 }],
                                "routesetter": "Alex",
                                "color": "BLUE",
                                "holds": ["CRIMP"],
                                "styles": ["MANTLE"],
                                "isNewUser": false
                            }
                          """))
                        .andReturn();
    }


}