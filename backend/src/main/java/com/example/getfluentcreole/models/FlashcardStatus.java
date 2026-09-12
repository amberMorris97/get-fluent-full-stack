package com.example.getfluentcreole.models;

public enum FlashcardStatus {
    NEEDS_WORK("Needs Work"),
    MASTERED("Mastered");

    private final String displayName;

    FlashcardStatus(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}
