package com.github.backend.repo;

import com.github.backend.models.Boulder;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BoulderRepo extends MongoRepository<Boulder, String> {
}
