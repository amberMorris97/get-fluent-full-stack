import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { DataContext } from "../../../context/DataContext";

const UserFlashcardPreview = ({ flashcard }) => {
    const { deleteUserFlashcard } = useContext(DataContext);

    const handleDeleteFlashcard = async () => {
        try {
            await deleteUserFlashcard(flashcard.flashcardId);
        } catch(error) {
            // TODO: handle error gracefully using modal context
            console.error(error);
        }
    }
  
    return (
        <div className="user-flashcard-preview">
            <button onClick={handleDeleteFlashcard}>
                <FontAwesomeIcon icon="fa-solid fa-trash" />
            </button>
            <h2>{flashcard.phrase.haitianCreole}</h2>
            <h3>{flashcard.phrase.english}</h3>
            <h5 className="phrase-pronunciation">{flashcard.phrase.pronunciation}</h5>
            <div className="flashcard-status-box">
                <FontAwesomeIcon icon="fa-solid fa-circle-check" />
                <h6>Mastered</h6>
                <FontAwesomeIcon icon="fa solid fa-circle-xmark" />
                <h6>Needs Work</h6>
            </div>
        </div>
    );
};

export default UserFlashcardPreview;