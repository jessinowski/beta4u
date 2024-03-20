package com.github.backend.service;

import com.github.backend.repo.BoulderRepo;
import lombok.RequiredArgsConstructor;
import com.github.backend.models.Boulder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BoulderService {
    private final BoulderRepo boulderRepo;

    public List<Boulder> getAllBoulder(){
        return boulderRepo.findAll();
    }
    public Boulder getBoulderById(String id) {
        return boulderRepo.findById(id).orElseThrow();
    }
}
