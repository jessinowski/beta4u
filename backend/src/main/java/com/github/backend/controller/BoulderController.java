package com.github.backend.controller;
import com.github.backend.service.BoulderService;
import lombok.RequiredArgsConstructor;
import com.github.backend.models.Boulder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/boulders")
@RequiredArgsConstructor
public class BoulderController {
    private final BoulderService boulderService;

    @GetMapping
    public List<Boulder> getAllBoulders(){
        return boulderService.getAllBoulders();
    }
    @GetMapping("/{id}")
    public Boulder getBoulderById(@PathVariable String id){
        return boulderService.getBoulderById(id);
    }

    @PutMapping("/changeRating/{id}")
    public Boulder changeRating(@PathVariable String id, @RequestBody double ratingPoints){
        return boulderService.changeRating(id, ratingPoints);
    }
}
