import { useState, useEffect, useContext } from 'react';
import generatePhrase from '../../utils/generatePhrase';
import Card from '../common/Card';
import Button from '../common/Button';
import Modal from '../common/Modal';
import { DataContext } from '../../context/DataContext';
import { AuthContext } from '../../context/AuthContext';

const HomePage = () => {
    const { allPhrases, setAllPhrases, addUserFlashcard } = useContext(DataContext);
    const { auth, setAuth } = useContext(AuthContext);
    const [currentPhrase, setCurrentPhrase] = useState(generatePhrase(allPhrases));
    
    const [isOpen, setIsOpen] = useState(false);
    const [alreadyExistsModalOpen, setAlreadyExistsModalOpen] = useState(false);


    const handleGetNewPhrase = () => {
        setCurrentPhrase(generatePhrase(allPhrases));
    };

    const addToFlashCards = async () => {
        /** check if the current phrase is already a flashcard, if so notify the user and return */
        const { email } = auth;
        try {
            await addUserFlashcard(email, currentPhrase.id);
            setIsOpen(true);
        } catch(error) {
            if (error.response?.status === 409) {
                setAlreadyExistsModalOpen(true);
            }
        } 
    };

    return (
        <section className='home-page'>
            {!currentPhrase ? (
                <div>Loading...</div>
             ) : (
                <>
                    <h1 className='title'>Pick up a new phrase everyday</h1>
                    <span className='sub-title'>Learn phrases in Haitian Creole</span>
                    <Card
                        type={'phrases'}
                        phrase={currentPhrase}
                        handleAddFlashcard={addToFlashCards}
                    />
                    <Modal className="flashcard-popup" open={isOpen} onClose={() => setIsOpen(false)}>
                        <span>Flashcard has been added!</span>
                    </Modal>
                    <Modal className="flashcard-popup" open={alreadyExistsModalOpen} onClose={() => setAlreadyExistsModalOpen(false)}>
                        <span>Flashcard already exists!</span>
                    </Modal>
                    <div className='home-page-btns'>
                        <Button label="Next phrase" className="next-phrase-btn btn" onClick={handleGetNewPhrase} />
                        <Button label="Add to flashcards" className="add-flashcard-btn btn" onClick={addToFlashCards} />
                    </div>
              </>
            )}
        </section>
    );
};

export default HomePage;