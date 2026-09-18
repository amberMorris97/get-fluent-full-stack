package com.example.getfluentcreole.dto.response;

import java.util.List;

public class QuizScorePageResponseDTO {
    private List<QuizScoreResponseDTO> scores;
    private boolean hasNextPage;
    private int currentPage;

    public QuizScorePageResponseDTO() {}

    public QuizScorePageResponseDTO(List<QuizScoreResponseDTO> scores, boolean hasNextPage, int currentPage) {
        this.scores = scores;
        this.hasNextPage = hasNextPage;
        this.currentPage = currentPage;
    }

    public List<QuizScoreResponseDTO> getScores() {
        return scores;
    }

    public void setScores(List<QuizScoreResponseDTO> scores) {
        this.scores = scores;
    }

    public boolean isHasNextPage() {
        return hasNextPage;
    }

    public void setHasNextPage(boolean hasNextPage) {
        this.hasNextPage = hasNextPage;
    }

    public int getCurrentPage() {
        return currentPage;
    }

    public void setCurrentPage(int currentPage) {
        this.currentPage = currentPage;
    }
}
