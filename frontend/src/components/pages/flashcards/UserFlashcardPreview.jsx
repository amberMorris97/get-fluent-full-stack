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
        if (flashcard.status.toLowerCase() === status.toLowerCase()) {
            return notify(false, "Flashcard already set as: " + (status === 'NEEDS_WORK' ? 'NEEDS WORK' : 'MASTERED'));
        }
        try {
            await updateUserFlashcard(status, flashcard.flashcardId);
            notify(true, "Flashcard status updated: " + (status === 'NEEDS_WORK' ? 'NEEDS WORK' : 'MASTERED'));
        } catch (error) {
            notify(false, "Error updating flashcard");
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