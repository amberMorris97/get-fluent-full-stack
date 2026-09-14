package com.example.getfluentcreole.dto.request;

public class QuizScoreRequestDTO {
    private String emailAddress;
    private int score;
    private int quizLength;


    public QuizScoreRequestDTO() {}

    public QuizScoreRequestDTO(String emailAddress, int score, int quizLength) {
        this.emailAddress = emailAddress;
        this.score = score;
        this.quizLength = quizLength;
    }

    public String getEmailAddress() {
        return emailAddress;
    }

    public void setEmailAddress(String emailAddress) {
        this.emailAddress = emailAddress;
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
}
