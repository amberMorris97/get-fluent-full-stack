package com.example.getfluentcreole.dto.response;

import java.time.LocalDateTime;

public class QuizScoreResponseDTO {
    private int id;
    private int score;
    private int quizLength;
    private LocalDateTime createdAt;

    public QuizScoreResponseDTO() {}

    public QuizScoreResponseDTO(int id, int score, int quizLength, LocalDateTime createdAt) {
        this.id = id;
        this.score = score;
        this.quizLength = quizLength;
        this.createdAt = createdAt;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

    public int getQuizLength() {
        return quizLength;
    }

    public void setQuizLength(int quizLength) {
        this.quizLength = quizLength;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
