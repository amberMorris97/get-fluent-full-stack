import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { DataContext } from "../../context/DataContext";
import Button from "../common/Button";
import UserFlashcardPreview from "./flashcards/UserFlashcardPreview";
import QuizScoreDisplay from "./quiz/QuizScoreDisplay";

const UserProfilePage = ({ notify }) => {
    const { auth } = useContext(AuthContext);
    const { userFlashcards, isFlashcardsLoading, userQuizScores } = useContext(DataContext);
    const [statusFilter, setStatusFilter] = useState('all');

    const filteredFlashcards = userFlashcards?.filter((flashcard) => {
        if (statusFilter === 'all') return true;
        return flashcard.status.toLowerCase() === statusFilter.toLowerCase();
    });

    if (isFlashcardsLoading) {
        return <div>Loading...</div>
    }

    const flashcardsDisplay = filteredFlashcards.map((flashcard) => {
        return <UserFlashcardPreview key={`${flashcard.flashcardId}-flashcard-preview`} flashcard={flashcard} notify={notify} />
    });
    
    return (
        <section className="user-profile-page">
            <h1>Profile</h1>
            <div className="user-profile-content-grid">
                <div className="my-flashcards-section">
                    <h2>MY FLASHCARDS</h2>
                    <div className="my-flashcards-container">
                        <div className="my-flashcards-filter-btns">
                            <Button 
                                label="All"
                                onClick={() => setStatusFilter('all')}
                                className={`${statusFilter === 'all' ? 'active' : ''} all-filter-btn`}
                            />
                            <Button 
                                label="Mastered"
                                onClick={() => setStatusFilter('MASTERED')}
                                className={`${statusFilter === 'MASTERED' ? 'active' : ''} mastered-filter-btn`}
                            />
                            <Button 
                                label="Needs Work"
                                onClick={() => setStatusFilter('NEEDS_WORK')}
                                className={`${statusFilter === 'NEEDS_WORK' ? 'active' : ''} needs-work-filter-btn`}
                            />
                        </div>
                        <div className="my-flashcards-display">
                            {flashcardsDisplay}
                        </div>
                    </div>
                </div>
                <div className="quiz-score-display-section">
                    <h2>QUIZ SCORES</h2>
                    <QuizScoreDisplay userQuizScores={userQuizScores} />
                </div>
            </div>
        </section>
    );
};

export default UserProfilePage;