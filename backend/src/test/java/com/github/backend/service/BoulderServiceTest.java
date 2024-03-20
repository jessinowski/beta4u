package com.github.backend.service;

import com.github.backend.models.Boulder;
import com.github.backend.models.Comment;
import com.github.backend.models.User;
import com.github.backend.models.enums.*;
import com.github.backend.repo.BoulderRepo;
import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class BoulderServiceTest {
    private final BoulderRepo repo = mock(BoulderRepo.class);

    BoulderService service = new BoulderService(repo);

    @Test
    void getAllBoulders_returnEmptyList_whenCalledInitially() {
        //GIVEN
        List<Boulder> expected = List.of();
        when(repo.findAll()).thenReturn(expected);
        //WHEN
        List<Boulder> actual =service.getAllBoulders();
        //THEN
        assertEquals(expected, actual);
        verify(repo).findAll();
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
                Routesetter.ALEX,
                Color.BLUE,
                List.of(Hold.CRIMP),
                List.of(Style.MANTLE)));
        when(repo.findAll()).thenReturn(expected);
        //WHEN
        List<Boulder> actual = service.getAllBoulders();
        //THEN
        assertEquals(expected, actual);
        verify(repo).findAll();
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
                Routesetter.ALEX,
                Color.BLUE,
                List.of(Hold.CRIMP),
                List.of(Style.MANTLE));
        when(repo.findById("1")).thenReturn(Optional.of(expected));
        //WHEN
        Boulder actual=service.getBoulderById("1");
        //THEN
        assertEquals(expected,actual);
        verify(repo).findById("1");
    }
}