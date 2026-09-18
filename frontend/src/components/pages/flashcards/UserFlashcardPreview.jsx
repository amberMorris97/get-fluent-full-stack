import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { DataContext } from "../../../context/DataContext";
import Card from "../../common/Card";

const UserFlashcardPreview = ({ flashcard, notify }) => {
    const { deleteUserFlashcard, updateUserFlashcard } = useContext(DataContext);

    const handleDeleteFlashcard = async () => {
        try {
            await deleteUserFlashcard(flashcard.flashcardId);
            notify(true, "Flashcard has been deleted.");
        } catch(error) {
            notify(false, "Error deleting flashcard.");
        }
    };

    const handleStatusClick = async (status) => {
        if (flashcard.status.toLowerCase() === status.toLowerCase()) return;

        try {
            await updateUserFlashcard(status, flashcard.flashcardId);
        } catch (error) {
            // TODO: Give feedback to user
        }
    };
  
    return (
        <Card
            type="preview"
            phrase={flashcard.phrase}
            onClick={handleStatusClick}
            onIconClick={handleDeleteFlashcard}
            flashcardId={flashcard.flashcardId}
        />
    );
};

export default UserFlashcardPreview;