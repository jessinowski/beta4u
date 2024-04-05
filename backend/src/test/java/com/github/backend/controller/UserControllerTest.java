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
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;



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
                List.of(),
                false);
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
                            "favoriteStyles": ["MANTLE"],
                            "isNewUser": false
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
        mvc.perform(post("/api/user/create")
                        .with(oidcLogin().userInfoToken(token -> token
                                .claim("id", "22")
                                .claim("avatar_url", "image")))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        
                        {
                            "id": "22",
                            "username": "jurassica",
                            "fullName": "Jessica",
                            "imagePath": "image",
                            "homeGym": "UA_HH_OST",
                            "favoriteHolds": ["CRIMP"],
                            "favoriteStyles": ["MANTLE"],
                            "isNewUser": false
                        }
                        
                """));
    }

    @Test
    void editUser() throws Exception {
        // GIVEN
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
        String requestBody = """
                        {
                            "username": "jess",
                            "fullName": "Jessica",
                            "imagePath": "image",
                            "homeGym": "UA_HH_WEST",
                            "favoriteHolds": ["JUG"],
                            "favoriteStyles": ["MANTLE", "ROOF"]
                        }
                """;

        // WHEN & THEN
        mvc.perform(MockMvcRequestBuilders.post("/api/user/edit")
                        .with(oidcLogin().userInfoToken(token -> token
                                .claim("id", "22")
                                .claim("avatar_url", "image")))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(content().json("""
                        
                        {
                            "id": "22",
                            "username": "jess",
                            "fullName": "Jessica",
                            "imagePath": "image",
                            "homeGym": "UA_HH_WEST",
                            "favoriteHolds": ["JUG"],
                            "favoriteStyles": ["MANTLE", "ROOF"],
                            "isNewUser": false
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
                List.of(),
                false);
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
                            "styles": ["MANTLE"],
                            "isNewUser": false
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
                List.of(),
                false);
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
                            "styles": ["MANTLE"],
                            "isNewUser": false
                        }
                    ]
                """))
                .andReturn();
    }

    @Test
    void changeLists_Flash() throws Exception {
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
                List.of(),
                false);
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
        mvc.perform(put("/api/user/change-lists/1")
                        .with(oidcLogin().userInfoToken(token -> token
                                .claim("id", "22")))
                        .content("flashes").contentType(MediaType.TEXT_PLAIN_VALUE))
                //THEN
                .andExpect(status().isOk());
        mvc.perform(get("/api/user/flashes")
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
                            "styles": ["MANTLE"],
                            "isNewUser": false
                        }
                    ]
                """))
                .andReturn();
    }

    @Test
    void changeLists_Top() throws Exception {
        //GIVEN
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
                List.of(boulder),
                false);
        userRepo.save(existingUser);
        //WHEN
        mvc.perform(put("/api/user/change-lists/1")
                        .with(oidcLogin().userInfoToken(token -> token
                                .claim("id", "22")))
                        .content("tops").contentType(MediaType.TEXT_PLAIN_VALUE))
                //THEN
                .andExpect(status().isOk());
        mvc.perform(get("/api/user/tops")
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
                            "styles": ["MANTLE"],
                            "isNewUser": false
                        }
                    ]
                """))
                .andReturn();
        mvc.perform(get("/api/user/projects")
                        .with(oidcLogin().userInfoToken(token -> token
                                .claim("id", "22"))))
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.content().json("[]"))
                .andReturn();
    }

    @Test
    void changeLists_Project() throws Exception {
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
                List.of(),
                false);
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
        mvc.perform(put("/api/user/change-lists/1")
                        .with(oidcLogin().userInfoToken(token -> token
                                .claim("id", "22")))
                        .content("projects").contentType(MediaType.TEXT_PLAIN_VALUE))
                //THEN
                .andExpect(status().isOk());
        mvc.perform(get("/api/user/projects")
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
                            "styles": ["MANTLE"],
                            "isNewUser": false
                        }
                    ]
                """))
                .andReturn();
    }

    @Test
    void checkMyLists() throws Exception {
        //GIVEN
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
        User existingUser = new User(
                "22",
                "jurassica",
                "Jessica",
                "image",
                Gym.UA_HH_OST,
                List.of(Hold.CRIMP),
                List.of(Style.MANTLE),
                List.of(),
                List.of(boulder),
                List.of(),
                List.of(),
                false);
        userRepo.save(existingUser);
        //WHEN
        mvc.perform(get("/api/user/check-lists/1")
                        .with(oidcLogin().userInfoToken(token -> token
                                .claim("id", "22"))))
                //THEN
                .andExpect(status().isOk())
                .andExpect(content().string("tops"))
                .andReturn();
    }

    @Test
    void getFlashes() throws Exception {
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
                List.of(),
                List.of(),
                List.of(boulder),
                List.of(),
                false);
        userRepo.save(user);
        //WHEN & THEN
        mvc.perform(get("/api/user/flashes")
                        .with(oidcLogin().userInfoToken(token -> token
                                .claim("id", "22"))))
                .andExpect(status().isOk())
                .andExpect(content().json("""
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
                            "styles": ["MANTLE"],
                            "isNewUser": false
                        }
                    ]
                """))
                .andReturn();
    }

    @Test
    void getTops() throws Exception {
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
                List.of(),
                List.of(boulder),
                List.of(),
                List.of(),
                false);
        userRepo.save(user);
        //WHEN & THEN
        mvc.perform(get("/api/user/tops")
                        .with(oidcLogin().userInfoToken(token -> token
                                .claim("id", "22"))))
                .andExpect(status().isOk())
                .andExpect(content().json("""
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
                            "styles": ["MANTLE"],
                            "isNewUser": false
                        }
                    ]
                """))
                .andReturn();
    }

    @Test
    void getProjects() throws Exception {
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
                List.of(),
                List.of(),
                List.of(),
                List.of(boulder),
                false);
        userRepo.save(user);
        //WHEN & THEN
        mvc.perform(get("/api/user/projects")
                        .with(oidcLogin().userInfoToken(token -> token
                                .claim("id", "22"))))
                .andExpect(status().isOk())
                .andExpect(content().json("""
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
                            "styles": ["MANTLE"],
                            "isNewUser": false
                        }
                    ]
                """))
                .andReturn();
    }
}