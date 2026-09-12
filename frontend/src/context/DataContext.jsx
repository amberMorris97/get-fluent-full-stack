import { useState, createContext, useEffect, useContext } from "react";
import { requestAllPhrases } from "../services/phraseService";
import { requestAddFlashcard, requestDeleteFlashcard, requestUserFlashcards } from "../services/UserFlashcardService";
import { AuthContext } from "./AuthContext";

export const DataContext = createContext();

export const DataContextProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isFlashcardsLoading, setIsFlashcardsLoading] = useState(true);

    const [allPhrases, setAllPhrases] = useState(null);
    const [userFlashcards, setUserFlashcards] = useState(null);

    const { auth } = useContext(AuthContext);
    
    const fetchPhrases = async () => {
        let phrases = [];
        
        try {
            let response = await requestAllPhrases();
            setAllPhrases(response.data);
            if (response.status !== 200) {
                // TODO: handle error
                const errorData = await response;
                throw new Error(
                    errorData.message || `ERROR - Status ${response.status}`,
                );
            } else {
                const data = await response.data;
                phrases = data.slice();
            }
        } catch(error) {
            console.error(error);
            // TODO: Give userfeedback
        } finally {
            setIsLoading(false)
        }
    };

    const fetchUserFlashcards = async (email) => {
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
    }

    const addUserFlashcard = async (email, phraseId) => {
        try {
            await requestAddFlashcard(email, phraseId);
        } catch (error) {
            throw error;
        } finally {
            fetchUserFlashcards(email);
        }
    }

    const deleteUserFlashcard = async (flashcardId) => {
        try {
            await requestDeleteFlashcard(flashcardId);
        } catch(error) {
            throw error;
        } finally {
            fetchUserFlashcards(auth.email);
        }
    }

    useEffect(() => {
        fetchPhrases();
    }, []);

    useEffect(() => {
        if (auth.isAuthenticated && allPhrases !== null) {
            fetchUserFlashcards(auth.email);
        }
    }, [allPhrases]);


    return (
        <DataContext.Provider value={{ 
            isLoading, 
            isFlashcardsLoading,
            allPhrases,
            setAllPhrases,
            addUserFlashcard,
            userFlashcards,
            deleteUserFlashcard,
        }}>
            {!isLoading && children}
        </DataContext.Provider>
    );
};