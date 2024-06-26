package com.github.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/keys")
@RequiredArgsConstructor
public class KeyController {

    @Value("${google.api.key}")
    private String googleApiKey;
    @GetMapping()
    public String getApiKey(){
        return googleApiKey;
    }
}
