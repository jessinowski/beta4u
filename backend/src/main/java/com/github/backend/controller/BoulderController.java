package com.github.backend.controller;
import com.github.backend.service.BoulderService;
import lombok.RequiredArgsConstructor;
import com.github.backend.models.Boulder;
import org.springframework.http.MediaType;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
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

    @PutMapping(value="/changeRating/{id}", consumes= MediaType.APPLICATION_JSON_VALUE)
    public Boulder changeRating(@AuthenticationPrincipal OAuth2User oAuth2User, @PathVariable String id, @RequestBody double ratingPoints){
        return boulderService.changeRating(oAuth2User, id, ratingPoints);
    }
}
