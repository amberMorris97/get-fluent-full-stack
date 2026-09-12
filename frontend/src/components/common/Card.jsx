import Button from './Button';

const Card = ({ type, phrase, flipped, onClick }) => {
    if (type === 'flashcards') {
        return (
            <div className={`card flashcard ${flipped ? 'flipped' : ''}`} onClick={onClick}>
                <div className="card-inner flashcard-inner">
                    <div className="flashcard-front">
                        <h3>{phrase.phrase}</h3>
                        <span className="phrase-pronunciation">{phrase.pronunciation}</span>
                    </div>
                    <div className="flashcard-back">
                        <h3>{phrase.translation}</h3>
                    </div>
                </div>
            </div>
        );
    } else if (type === 'phrases') {
        return (
            <div className="card phrase-card">
                <div className="card-inner phrase-card-inner">
                    <h3>{phrase.haitianCreole}</h3>
                    <h4>{phrase.english}</h4>
                    <span className="phrase-pronunciation">{phrase.pronunciation}</span>
              </div>
            </div>
        );
    } else {
        return (
            <div className={`card flashcard ${flipped ? 'flipped' : ''}`} onClick={onClick}>
                <div className="flashcard-inner">
                    <div className="flashcard-front">
                        <h3>No flashcards yet.</h3>
                    </div>
                    <div className="flashcard-back">
                        <h4>Go add some!</h4>
                    </div>
                </div>
            </div>
        );
    };
};

export default Card;