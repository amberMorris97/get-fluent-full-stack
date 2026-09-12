const parseFlashcards = (storage) => Object.entries(storage).map(flashcard => JSON.parse(flashcard[1]));

export default parseFlashcards;