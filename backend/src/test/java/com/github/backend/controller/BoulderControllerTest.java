package com.github.backend.controller;
import com.github.backend.models.Boulder;
import com.github.backend.models.enums.*;
import com.github.backend.repo.BoulderRepo;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import java.util.List;


@SpringBootTest
@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
class BoulderControllerTest {

    @Autowired
    private MockMvc mvc;

    @Autowired
    private BoulderRepo repo;

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
                Sector.FIVE,
                Gym.UA_HH_OST,
                null,
                List.of(),
                List.of(),
                Routesetter.ALEX,
                Color.BLUE,
                List.of(Hold.CRIMP),
                List.of(Style.MANTLE));
        repo.save(boulder);
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
                            "sector": "FIVE",
                            "gym": "UA_HH_OST",
                            "date": null,
                            "routesetter": "ALEX",
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
                Sector.FIVE,
                Gym.UA_HH_OST,
                null,
                List.of(),
                List.of(),
                Routesetter.ALEX,
                Color.BLUE,
                List.of(Hold.CRIMP),
                List.of(Style.MANTLE));
        repo.save(boulder);
        //WHEN & THEN
        mvc.perform(MockMvcRequestBuilders.get("/api/boulders/1"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json("""
                        {
                            "id": "1",
                            "imagePath": "image",
                            "videoPath": "video",
                            "level": "EIGHT",
                            "sector": "FIVE",
                            "gym": "UA_HH_OST",
                            "date": null,
                            "routesetter": "ALEX",
                            "color": "BLUE",
                            "holds": ["CRIMP"],
                            "styles": ["MANTLE"]
                        }
                """))
                .andReturn();
    }

}