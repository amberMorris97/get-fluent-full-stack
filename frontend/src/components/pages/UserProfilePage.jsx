import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { DataContext } from "../../context/DataContext";
import Button from "../common/Button";
import UserFlashcardPreview from "./flashcards/UserFlashcardPreview";

const UserProfilePage = () => {
    const { auth } = useContext(AuthContext);
    const { userFlashcards, isFlashcardsLoading } = useContext(DataContext);
    const [statusFilter, setStatusFilter] = useState('all');

    const filteredFlashcards = userFlashcards?.filter((flashcard) => {
        console.log(flashcard.status)
        if (statusFilter === 'all') return true;
        return flashcard.status.toLowerCase() === statusFilter;
    });

    if (isFlashcardsLoading) {
        return <div>Loading...</div>
    }

    const flashcardsDisplay = filteredFlashcards.map((flashcard) => {
        return <UserFlashcardPreview flashcard={flashcard} />
    });    
    
    return (
        <section className="user-profile-page">
            <div className="user-profile-content-box">
                <div className="user-profile-content-box-btns">
                    <Button 
                        label="All"
                        onClick={() => setStatusFilter('all')}
                    />
                    <Button 
                        label="Mastered"
                        onClick={() => setStatusFilter('mastered')}
                    />
                    <Button 
                        label="Needs Review"
                        onClick={() => setStatusFilter('needs_work')}
                    />
                </div>
                <div className="user-flashcards-box">
                    {flashcardsDisplay}
                </div>
            </div>
        </section>
    );
};

export default UserProfilePage;