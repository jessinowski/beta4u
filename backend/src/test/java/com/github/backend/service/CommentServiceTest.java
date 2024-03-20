package com.github.backend.service;

import com.github.backend.models.Boulder;
import com.github.backend.models.Comment;
import com.github.backend.models.User;
import com.github.backend.models.enums.*;
import com.github.backend.repo.CommentRepo;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class CommentServiceTest {
    private final CommentRepo repo = mock(CommentRepo.class);

    CommentService service = new CommentService(repo);

    @Test
    void getAllComments_returnEmptyList_whenCalledInitially() {
        //GIVEN
        List<Comment> expected = List.of();
        when(repo.findAll()).thenReturn(expected);
        //WHEN
        List<Comment> actual =service.getAllComments();
        //THEN
        assertEquals(expected, actual);
        verify(repo).findAll();
    }

    @Test
    void getAllComments_returnListOfOne_whenCalled(){
        //GIVEN
        List<Comment> expected =List.of(new Comment("1", "Nice Slab", new User(
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
                        List.of()),
                null));
        when(repo.findAll()).thenReturn(expected);
        //WHEN
        List<Comment> actual = service.getAllComments();
        //THEN
        assertEquals(expected, actual);
        verify(repo).findAll();
    }
}