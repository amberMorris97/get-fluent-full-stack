import apiClient from "../config/api-client";

export const requestUserFlashcards = (email) => {
    return apiClient.get(`/userFlashcards/${email}`);
};

export const requestAddFlashcard = (email, phraseId) => {
    return apiClient.post('/userFlashcards/addFlashcard', { email, phraseId, status: "NEEDS_WORK" });
};

export const requestDeleteFlashcard = (flashcardId) => {
    return apiClient.delete(`/userFlashcards/${flashcardId}`);
};

export const requestUpdateFlashcardStatus = (email, flashcardStatus, flashcardId) => {
    return apiClient.put(`/userFlashcards/update/${flashcardId}`, { email, status: flashcardStatus })
}