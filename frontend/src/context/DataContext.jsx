import { useState, createContext, useEffect, useContext } from "react";
import { requestAllPhrases } from "../services/phraseService";
import { requestAddFlashcard, requestDeleteFlashcard, requestUpdateFlashcardStatus, requestUserFlashcards } from "../services/userFlashcardService";
import { AuthContext } from "./AuthContext";
import { requestQuizScores, requestSubmitQuizScore } from "../services/quizScoreService";

export const DataContext = createContext();

export const DataContextProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isFlashcardsLoading, setIsFlashcardsLoading] = useState(true);
    const [quizScoresPage, setQuizScoresPage] = useState(0);
    const [quizScoreHasNext, setQuizScoreHasNext] = useState(false);
    const [allPhrases, setAllPhrases] = useState(null);
    const [userFlashcards, setUserFlashcards] = useState([]);
    const [userQuizScores, setUserQuizScores] = useState(null);

    const { auth } = useContext(AuthContext);
    const { isAuthenticated } = auth;
    
    const email = isAuthenticated ? auth.email : undefined;
    
    const fetchPhrases = async () => {
        try {
            let response = await requestAllPhrases();
            setAllPhrases(response.data);
        } catch(error) {
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const fetchUserFlashcards = async () => {
        try {
            let response = await requestUserFlashcards(email);
            let flashcards = response.data.map((flashcard) => {
                const matchingPhrase = allPhrases.find((phrase) => phrase.id === flashcard.phraseId);
                return {
                    ...flashcard,
                    phrase: matchingPhrase,
                };
            });
            setUserFlashcards(flashcards);
        } catch(error) {
            throw error;
        } finally {
            setIsFlashcardsLoading(false);
        }
    };

    const addUserFlashcard = async (phraseId) => {
        try {
            await requestAddFlashcard(email, phraseId);
        } catch (error) {
            throw error;
        } finally {
            fetchUserFlashcards();
        }
    };

    const deleteUserFlashcard = async (flashcardId) => {
        try {
            await requestDeleteFlashcard(flashcardId);
        } catch(error) {
            throw error;
        } finally {
            fetchUserFlashcards( );
        }
    };

    const fetchQuizScores = async (page = quizScoresPage) => {
        try {
            let response = await requestQuizScores(email, page);
            setUserQuizScores(response.data.scores);
            setQuizScoreHasNext(response.data.hasNextPage);
        } catch(error) {
            throw error;
        } 
    }

    const submitQuizScore = async (score, quizLength) => {
        try {
            await requestSubmitQuizScore(email, score, quizLength);
        } catch(error) {
            throw error;
        } finally {
            fetchQuizScores();
        }
    };

    const nextQuizScoresPage = () => {
        if (!quizScoreHasNext) return;
        const next = quizScoresPage + 1;
        setQuizScoresPage(next);
        fetchQuizScores(next);
    };

    const prevQuizScoresPage = () => {
        const prev = Math.max(0, quizScoresPage - 1);
        setQuizScoresPage(prev);
        fetchQuizScores(prev);
    }

    const updateUserFlashcard = async (flashcardStatus, flashcardId) => {
        try {
            await requestUpdateFlashcardStatus(email, flashcardStatus, flashcardId);
            fetchUserFlashcards(email);
        } catch (error) {
            throw error;
        }
    };

    useEffect(() => {
        fetchPhrases();
    }, []);

    useEffect(() => {
        if (isAuthenticated && allPhrases !== null) {
            fetchUserFlashcards();
            fetchQuizScores(quizScoresPage);
        }
    }, [isAuthenticated, allPhrases]);


    return (
        <DataContext.Provider value={{ 
            isLoading, 
            isFlashcardsLoading,
            allPhrases,
            setAllPhrases,
            addUserFlashcard,
            userFlashcards,
            fetchUserFlashcards,
            deleteUserFlashcard,
            submitQuizScore,
            userQuizScores,
            updateUserFlashcard,
            nextQuizScoresPage,
            prevQuizScoresPage,
            quizScoreHasNext,
            quizScoresPage,
        }}>
            {!isLoading && children}
        </DataContext.Provider>
    );
};