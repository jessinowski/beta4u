package com.github.backend.service;
import com.github.backend.models.Boulder;
import com.github.backend.models.User;
import com.github.backend.models.enums.*;
import com.github.backend.repo.UserRepo;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class UserServiceTest {

    private final UserRepo repo = mock(UserRepo.class);

    UserService service = new UserService(repo);

    @Test
    void getAllUsers_returnEmptyList_whenCalledInitially() {
        //GIVEN
        List<User> expected = List.of();
        when(repo.findAll()).thenReturn(expected);
        //WHEN
        List<User> actual =service.getAllUsers();
        //THEN
        assertEquals(expected, actual);
        verify(repo).findAll();
    }

    @Test
    void getAllUsers_returnListOfOne_whenCalled(){
        //GIVEN
        List<User> expected =List.of(new User(
                "22",
                "jurassica",
                "Jessica",
                "image",
                Gym.UA_HH_OST,
                List.of(Hold.CRIMP),
                List.of(Style.MANTLE),
                List.of(new Boulder(
                        "1",
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
                        List.of(Style.MANTLE))),
                List.of(),
                List.of(),
                List.of()));
        when(repo.findAll()).thenReturn(expected);
        //WHEN
        List<User> actual = service.getAllUsers();
        //THEN
        assertEquals(expected, actual);
        verify(repo).findAll();
    }
}