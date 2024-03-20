package com.github.backend.controller;

import com.github.backend.service.BoulderService;
import lombok.RequiredArgsConstructor;
import com.github.backend.models.Boulder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
