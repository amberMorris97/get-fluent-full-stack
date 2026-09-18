import apiClient from "../config/api-client"

export const requestSubmitQuizScore = (email, score, quizLength) => {
    return apiClient.post('/quizScores/submit', { emailAddress: email, score, quizLength });
};

export const requestQuizScores = (email, offset = 0, limit = 5) => {
    return apiClient.get(`/quizScores/${email}`, {
        params: { offset, limit }
    });
};