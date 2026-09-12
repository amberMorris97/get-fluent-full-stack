import apiClient from '../config/api-client';

export const requestAllPhrases = () => {
    return apiClient.get('/phrases');
}