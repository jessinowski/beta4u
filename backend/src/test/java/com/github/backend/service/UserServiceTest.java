package com.github.backend.service;
import com.github.backend.models.Boulder;
import com.github.backend.models.User;
import com.github.backend.models.UserDto;
import com.github.backend.models.enums.*;
import com.github.backend.repo.UserRepo;
import org.junit.jupiter.api.Test;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class UserServiceTest {

    private final UserRepo repo = mock(UserRepo.class);

    UserService service = new UserService(repo);

    @Test
    void getUserById_returnUserWithId22_whenCalledWithId22(){
        //GIVEN
        User expected =new User(
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
                List.of());
        when(repo.findById("22")).thenReturn(Optional.of(expected));
        //WHEN
        Optional<User> actual = service.getUserById("22");
        //THEN
        assertEquals(Optional.of(expected), actual);
        verify(repo).findById("22");
    }

    @Test
    void createUser(){
        OAuth2User oAuth2User = mock(OAuth2User.class);
        Map<String, Object> attributes = new HashMap<>();
        attributes.put("id", "123456");
        attributes.put("avatar_url", "sdcsdc");
        when(oAuth2User.getAttributes()).thenReturn(attributes);
        //GIVEN
        UserDto user = new UserDto(
                "jurassica",
                "Jessica",
                Gym.UA_HH_OST,
                List.of(Hold.CRIMP),
                List.of(Style.MANTLE));
        when(repo.save(any(User.class)))
                .thenReturn(new User(
                        "123456",
                        user.getUsername(),
                        user.getFullName(),
                        "slojj",
                        user.getHomeGym(),
                        user.getFavoriteHolds(),
                        user.getFavoriteStyles(),
                        null, null, null, null));
        //WHEN
        User createdUser = service.createUser(oAuth2User, user);
        //THEN
        assertEquals("123456", createdUser.getId());

    }

    @Test
    void getFlashes() {
    }

    @Test
    void changeFlashes() {
    }

    @Test
    void getTops() {
    }

    @Test
    void changeTops() {
    }

    @Test
    void getProjects() {
    }

    @Test
    void changeProjects() {
    }
}