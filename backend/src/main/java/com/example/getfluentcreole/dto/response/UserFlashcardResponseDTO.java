package com.example.getfluentcreole.dto.response;

import com.example.getfluentcreole.models.FlashcardStatus;
import com.example.getfluentcreole.models.UserFlashcard;

public class UserFlashcardResponseDTO {
    private int flashcardId;
    private int userId;
    private int phraseId;
    private FlashcardStatus status;

    public UserFlashcardResponseDTO() {}

    public UserFlashcardResponseDTO(UserFlashcard userFlashcard) {
        this.flashcardId = userFlashcard.getId();
        this.userId = userFlashcard.getUser().getId();
        this.phraseId = userFlashcard.getPhrase().getId();
        this.status = userFlashcard.getStatus();
    }

    public int getFlashcardId() {
        return flashcardId;
    }

    public int getUserId() {
        return userId;
    }

    public int getPhraseId() {
        return phraseId;
    }

    public FlashcardStatus getStatus() {
        return status;
    }
}
