import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router';
import generatePhrase from '../../utils/generatePhrase';
import Button from '../common/Button';
import Card from '../common/Card';
import parseFlashcards from '../../utils/parseFlashcards';
import Modal from '../common/Modal';
import { DataContext } from '../../context/DataContext';

const FlashcardPage = ({ notify }) => {
    const navigate = useNavigate();
    const [flipped, setFlipped] = useState(false);
    
    const { userFlashcards, isFlashcardsLoading, deleteUserFlashcard, fetchUserFlashcards } = useContext(DataContext);
    
    const [currentFlashcardPhrase, setCurrentFlashcardPhrase] = useState(null);
    const [currentFlashcardId, setCurrentFlashcardId] = useState(null);

    useEffect(() => {
        if (userFlashcards?.length > 0) setCurrentFlashcardPhrase(generatePhrase(userFlashcards, setCurrentFlashcardId).phrase);
    }, [userFlashcards]);

    const handleFlipState = () => {
        setFlipped(!flipped);
    };

    const handleNextFlashcard = () => {
        if (flipped) {
            /** make sure translation is not revealed before flip animation finishes */
            setTimeout(() => {
                setCurrentFlashcardPhrase(generatePhrase(userFlashcards, setCurrentFlashcardId).phrase);
            }, 200);
        } else {
            setCurrentFlashcardPhrase(generatePhrase(userFlashcards, setCurrentFlashcardId).phrase);
        }

        setFlipped(false);
    };

    const removeFlashcard = async () => {
        try {
            await deleteUserFlashcard(currentFlashcardId);
            notify(true, "Flashcard was deleted");

            fetchUserFlashcards();
        } catch(error) {
            notify(false, "Error deleting flashcard. Please try again.");
        }
        setFlipped(false);
    };

    if (isFlashcardsLoading) {
        return <div>Loading...</div>
    };

    if (!userFlashcards || userFlashcards.length === 0 || !currentFlashcardPhrase) {
        return (
            <div className="no-flashcards">
                <Card flipped={flipped} onClick={handleFlipState} />
                <Button label="Get Fluent" onClick={() => navigate('/')} />
            </div>
        );
    }

    return (
        <div className="flashcard-page">
            <h2>Your Flashcards</h2>
            <span className="tap-to-flip">{"(TAP TO FLIP)"}</span>
           
            <div className={`flashcard-wrapper ${flipped ? 'flipped' : ''}`}>
                <Card 
                    phrase={currentFlashcardPhrase} 
                    flipped={flipped} 
                    onClick={handleFlipState}
                    handleRemoveFlashcard={removeFlashcard}
                    type={'flashcards'}
                />
            </div>
        

            <div className='flashcard-btns'>
                <Button label="Next" className="next-flashcard-btn btn" onClick={handleNextFlashcard} />
                <Button label="Remove from flashcards" className="remove-flashcard-btn btn" onClick={removeFlashcard} />
            </div>
          
        </div>
    );
};

export default FlashcardPage;