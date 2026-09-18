import { useContext } from "react";
import Button from "../common/Button";
import { useNavigate } from "react-router";
import { DataContext } from "../../context/DataContext";
import { AuthContext } from "../../context/AuthContext";

const AllPhrasesPage = ({ allPhrases, flashcardPhraseIds, userFlashcards, notify }) => {
    const { addUserFlashcard, deleteUserFlashcard } = useContext(DataContext);
    const { auth } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleAddFlashcard = async (phraseId) => {
        try {
            await addUserFlashcard(phraseId);
            notify(true, "Flashcard added.");
        } catch(error) {
            notify(false, "Error adding flashcard");
        }
    };

    const handleDeleteFlashcard = async (phraseId) => {
        const flashcard = userFlashcards.find(fc => fc.phraseId === phraseId);
        
        try {
            await deleteUserFlashcard(flashcard.flashcardId);
            notify(true, "Flashcard was deleted.");
        } catch(error) {
            notify(false, error.message);
        }
    };

    return (
        <div className="all-phrases-page">
            <h2>All Phrases</h2>
            <table>
                <thead>
                    <tr>
                        <th>Phrase</th>
                        <th>Translation</th>
                        <th>Pronunciation</th>
                    </tr>
                </thead>
                <tbody>
                    {allPhrases.map((phrase) => {
                        const isSelected = flashcardPhraseIds.includes(phrase.id);
                        return (
                            <tr key={phrase.id}>
                                <td className="phrase-cell" data-label="Phrase">{phrase.haitianCreole}</td>
                                <td className="translation-cell" data-label="Translation">{phrase.english}</td>
                                <td className="pronunciation-cell" data-label="Pronunciation">{phrase.pronunciation}</td>
                                <td>
                                    <Button
                                        label={`${!auth.isAuthenticated ? "Log In" : isSelected ? "Remove flashcard" : "Add flashcard"}`}
                                        onClick={!auth.isAuthenticated ? () => navigate('/login') : !isSelected ? () => handleAddFlashcard(phrase.id) : () => handleDeleteFlashcard(phrase.id)}
                                        className="all-phrases-btn"
                                    />
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>       
        </div>
    );
};

export default AllPhrasesPage;