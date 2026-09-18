package com.example.getfluentcreole.repositories;

import com.example.getfluentcreole.models.QuizScore;
import com.example.getfluentcreole.models.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuizScoreRepository extends JpaRepository<QuizScore, Integer> {
    Page<QuizScore> findByUser(User user, Pageable pageable);
}
