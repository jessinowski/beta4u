package com.github.backend.controller;

import com.github.backend.models.Comment;
import com.github.backend.repo.CommentRepo;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

@SpringBootTest
@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
class CommentControllerTest {
    @Autowired
    private MockMvc mvc;

    @Autowired
    private CommentRepo repo;
    @Test
    void getAllComments_returnEmptyList_whenCalledInitially() throws Exception{
        //GIVEN
        //WHEN & THEN
        mvc.perform(MockMvcRequestBuilders.get("/api/comments"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json("[]"))
                .andReturn();
    }

    @Test
    void getAllComments_returnOne_whenCalled() throws Exception {
        //GIVEN
        Comment comment= new Comment("1", "Nice Slab", null,
            null);
        repo.save(comment);
        //WHEN & THEN
        mvc.perform(MockMvcRequestBuilders.get("/api/comments"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json("""
                     [
                        {
                            "id": "1",
                            "content": "Nice Slab",
                            "user": null,
                            "date": null
                        }
                     ]
                """))
                .andReturn();
    }
}