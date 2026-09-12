package com.example.getfluentcreole.repositories;

import com.example.getfluentcreole.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByEmailAddress(String emailAddress);

    Boolean existsByEmailAddress(String emailAddress);
}
