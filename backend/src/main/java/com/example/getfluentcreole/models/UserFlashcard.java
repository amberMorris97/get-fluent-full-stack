package com.example.getfluentcreole.models;

import jakarta.persistence.*;

@Entity
@Table(
        name = "user_flashcards",
        uniqueConstraints = @UniqueConstraint(columnNames = {"user_id", "phrase_id"})
)
public class UserFlashcard {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "phrase_id", nullable = false)
    private Phrase phrase;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private FlashcardStatus status = FlashcardStatus.NEEDS_WORK;

    public UserFlashcard() {}

    public UserFlashcard(User user, Phrase phrase, FlashcardStatus status) {
        this.user = user;
        this.phrase = phrase;
        this.status = status;
    }

    public int getId() {
        return id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Phrase getPhrase() {
        return phrase;
    }

    public void setPhrase(Phrase phrase) {
        this.phrase = phrase;
    }

    public FlashcardStatus getStatus() {
        return status;
    }

    public void setStatus(FlashcardStatus status) {
        this.status = status;
    }
}
