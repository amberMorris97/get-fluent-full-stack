package com.example.getfluentcreole.dto;

public class PhraseDTO {
    private String english;
    private String haitianCreole;
    private String pronunciation;

    public PhraseDTO() {}

    public PhraseDTO(String english, String haitianCreole, String pronunciation) {
        this.english = english;
        this.haitianCreole = haitianCreole;
        this.pronunciation = pronunciation;
    }

    public String getEnglish() {
        return english;
    }

    public void setEnglish(String english) {
        this.english = english;
    }

    public String getHaitianCreole() {
        return haitianCreole;
    }

    public void setHaitianCreole(String haitianCreole) {
        this.haitianCreole = haitianCreole;
    }

    public String getPronunciation() {
        return pronunciation;
    }

    public void setPronunciation(String pronunciation) {
        this.pronunciation = pronunciation;
    }
}
