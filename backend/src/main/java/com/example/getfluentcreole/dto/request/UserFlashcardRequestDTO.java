package com.example.getfluentcreole.dto.request;

import com.example.getfluentcreole.models.FlashcardStatus;

public class UserFlashcardRequestDTO {
    private String email;
    private int phraseId;
    private FlashcardStatus status;

    public UserFlashcardRequestDTO() {}

    public UserFlashcardRequestDTO(String email, int phraseId, FlashcardStatus status) {
        this.email = email;
        this.phraseId = phraseId;
        this.status = status;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public int getPhraseId() {
        return phraseId;
    }

    public void setPhraseId(int phraseId) {
        this.phraseId = phraseId;
    }

    public FlashcardStatus getStatus() {
        return status;
    }

    public void setStatus(FlashcardStatus status) {
        this.status = status;
    }
}
