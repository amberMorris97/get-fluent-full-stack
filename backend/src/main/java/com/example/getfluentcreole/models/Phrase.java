package com.example.getfluentcreole.models;

import jakarta.persistence.*;

@Entity
@Table(name = "phrases")
public class Phrase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "en", nullable = false)
    private String english;

    @Column(name = "ht", nullable = false)
    private String haitianCreole;

    @Column(name = "pronunciation", nullable = true)
    private String pronunciation;

    public Phrase() {}

    public Phrase(String english, String haitianCreole, String pronunciation) {
        this.english = english;
        this.haitianCreole = haitianCreole;
        this.pronunciation = pronunciation;
    }

    public int getId() {
        return id;
    }

    public String getEnglish() {
        return english;
    }

    public void setEnglish(String english) {
        this.english = english;
    }

    public void setId(int id) {
        this.id = id;
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
