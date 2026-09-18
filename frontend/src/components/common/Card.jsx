import Button from './Button';
import IconButton from './IconButton';

const Card = ({ type, phrase, flipped, onClick, flashcardId, onIconClick }) => {
    if (!phrase) {
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
    }

    const { id, english, haitianCreole, pronunciation } = phrase;

    const renderPronunciation = ( <span className="phrase-pronunciation">{pronunciation}</span> );

    if (type === 'flashcards') {
        return (
            <div className={`card flashcard ${flipped ? 'flipped' : ''}`} onClick={onClick}>
                <div className="card-inner flashcard-inner">
                    <div className="flashcard-front">
                        <h3>{haitianCreole}</h3>
                        {renderPronunciation}
                    </div>
                    <div className="flashcard-back">
                        <h3>{english}</h3>
                    </div>
                </div>
            </div>
        );
    } else if (type === 'phrases') {
        return (
            <div className="card phrase-card">
                <div className="card-inner phrase-card-inner">
                    <h3>{haitianCreole}</h3>
                    <h4>{english}</h4>
                    {renderPronunciation}
              </div>
            </div>
        );
    } else if (type === 'preview') {
        return (
            <div className="preview-card">
                <div className="preview-card-inner">
                    <IconButton
                        id={`${flashcardId}-preview-del`}
                        ariaLabel="Delete"
                        handleClick={onIconClick}>
                        <i className="fa-solid fa-trash"></i>
                    </IconButton>
                    <h2>{haitianCreole}</h2>
                    <h3>{english}</h3>
                    {renderPronunciation}
                    <div className='flashcard-status-box'>
                        <i className='fa-solid fa-circle-check preview-card-check' onClick={() => onClick('MASTERED')}></i>
                        <i className='fa-solid fa-circle-xmark preview-card-x' onClick={() => onClick('NEEDS_WORK')}></i>
                        <Button
                            label="Mastered"
                            onClick={() => onClick('MASTERED')}
                            className='status-btn mastered-btn'
                        />
                        <Button
                            label="Needs work"
                            onClick={() => onClick('NEEDS_WORK')}
                            className='status-btn needs-work-btn'
                        />
                    </div>
                </div>
            </div>
        );
    }
};

export default Card;