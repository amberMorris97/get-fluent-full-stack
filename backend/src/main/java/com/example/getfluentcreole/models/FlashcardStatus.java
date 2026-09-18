package com.example.getfluentcreole.models;

public enum FlashcardStatus {
    NEEDS_WORK("NEEDS_WORK"),
    MASTERED("MASTERED");

    private final String displayName;

    FlashcardStatus(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}
