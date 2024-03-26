package com.github.backend.service;

import com.github.backend.models.Boulder;
import com.github.backend.models.Comment;
import com.github.backend.models.User;
import com.github.backend.models.enums.*;
import com.github.backend.repo.BoulderRepo;
import com.github.backend.repo.UserRepo;
import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class BoulderServiceTest {
    private final BoulderRepo boulderRepo = mock(BoulderRepo.class);
    private final UserRepo userRepo = mock(UserRepo.class);
    UserService userService = new UserService(userRepo);
    BoulderService boulderService = new BoulderService(boulderRepo, userService);


    @Test
    void getAllBoulders_returnEmptyList_whenCalledInitially() {
        //GIVEN
        List<Boulder> expected = List.of();
        when(boulderRepo.findAll()).thenReturn(expected);
        //WHEN
        List<Boulder> actual = boulderService.getAllBoulders();
        //THEN
        assertEquals(expected, actual);
        verify(boulderRepo).findAll();
    }

    @Test
    void getAllBoulders_returnListOfOne_whenCalledWithOneBoulder(){
        //GIVEN
        List<Boulder> expected =List.of(new Boulder(
                "1",
                "image",
                "video",
                Level.EIGHT,
                Sector.FIVE,
                Gym.UA_HH_OST,
                null,
                List.of(new Comment(
                        "11",
                        "nice slab!",
                        new User(
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
                                List.of()),
                        null)),
                List.of(),
                Routesetter.ALEX,
                Color.BLUE,
                List.of(Hold.CRIMP),
                List.of(Style.MANTLE)));
        when(boulderRepo.findAll()).thenReturn(expected);
        //WHEN
        List<Boulder> actual = boulderService.getAllBoulders();
        //THEN
        assertEquals(expected, actual);
        verify(boulderRepo).findAll();
    }

    @Test
    void getBoulderById_returnBoulderWithId1_whenCalledWithId1() {
        //GIVEN
        Boulder expected = new Boulder("1",
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
        when(boulderRepo.findById("1")).thenReturn(Optional.of(expected));
        //WHEN
        Boulder actual= boulderService.getBoulderById("1");
        //THEN
        assertEquals(expected,actual);
        verify(boulderRepo).findById("1");
    }


}