package com.example.getfluentcreole.dto;

import com.example.getfluentcreole.models.FlashcardStatus;
import com.example.getfluentcreole.models.Phrase;
import com.example.getfluentcreole.models.User;

public class UserFlashcardDTO {
    private User user;
    private Phrase phrase;
    private FlashcardStatus status;

    public UserFlashcardDTO() {}

    public UserFlashcardDTO(User user, Phrase phrase, FlashcardStatus status) {
        this.user = user;
        this.phrase = phrase;
        this.status = status;
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
