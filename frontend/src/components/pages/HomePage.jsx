import { useState, useContext } from 'react';
import generatePhrase from '../../utils/generatePhrase';
import Card from '../common/Card';
import Button from '../common/Button';
import { DataContext } from '../../context/DataContext';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router';

const HomePage = ({ notify }) => {
    const navigate = useNavigate();

    const { allPhrases, addUserFlashcard } = useContext(DataContext);
    const { auth } = useContext(AuthContext);

    const [currentPhrase, setCurrentPhrase] = useState(generatePhrase(allPhrases));

    const handleGetNewPhrase = () => {
        setCurrentPhrase(generatePhrase(allPhrases));
    };

    const addToFlashCards = async () => {
        /** check if the current phrase is already a flashcard, if so notify the user and return */
        try {
            await addUserFlashcard(currentPhrase.id);
            notify(true, 'Flashcard added!');
        } catch(error) {
            if (error.response?.status === 409) {
                notify(false, 'Flashcard already exists!');
            } else {
                notify(false, 'Error adding flashcard.');
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
                    <div className='home-page-btns'>
                        <Button label="Next phrase" className="next-phrase-btn btn" onClick={handleGetNewPhrase} />
                        <Button label={auth.isAuthenticated ? 'Add to flashcards' : 'Log In'} className="add-flashcard-btn btn" onClick={auth.isAuthenticated ? addToFlashCards : () => navigate('/login')} />
                    </div>
              </>
            )}
        </section>
    );
};

export default HomePage;