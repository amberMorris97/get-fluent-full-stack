package com.example.getfluentcreole.controllers;

import com.example.getfluentcreole.dto.request.QuizScoreRequestDTO;
import com.example.getfluentcreole.dto.response.QuizScoreResponseDTO;
import com.example.getfluentcreole.models.QuizScore;
import com.example.getfluentcreole.models.User;
import com.example.getfluentcreole.repositories.QuizScoreRepository;
import com.example.getfluentcreole.repositories.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/quizScores")
public class QuizScoreController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private QuizScoreRepository quizScoreRepository;

    @Autowired
    private ModelMapper modelMapper;

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/submit")
    public ResponseEntity<?> submitQuizScore(@RequestBody QuizScoreRequestDTO quizScoreRequest) {
        User user = userRepository.findByEmailAddress(quizScoreRequest.getEmailAddress())
                .orElseThrow(() -> new RuntimeException("User not found with email: " + quizScoreRequest.getEmailAddress()));

        QuizScore quizScore = new QuizScore(user, quizScoreRequest.getScore(), quizScoreRequest.getQuizLength());

        quizScoreRepository.save(quizScore);

        QuizScoreResponseDTO quizScoreResponse = mapToQuizScoreResponseDTO(quizScore);
        return new ResponseEntity<>(quizScoreResponse, HttpStatus.CREATED);
    }

    @GetMapping("/{emailAddress}")
    public ResponseEntity<?> getQuizScoresByUser(@PathVariable String emailAddress) {
        User user = userRepository.findByEmailAddress(emailAddress)
                .orElseThrow(() -> new RuntimeException("User not found with email: " + emailAddress));

        List<QuizScore> quizScores = quizScoreRepository.findByUser(user);

        return new ResponseEntity<>(quizScores, HttpStatus.OK);
    }

    private QuizScoreResponseDTO mapToQuizScoreResponseDTO(QuizScore quizScore) {
        return modelMapper.map(quizScore, QuizScoreResponseDTO.class);
    }
}
