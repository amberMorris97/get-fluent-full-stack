const generatePhrase = (phrases, callback) => {
    let randomIndex = Math.floor(Math.random() * phrases.length);
    
    if (callback) callback(phrases[randomIndex].flashcardId);
    
    return phrases[randomIndex];
};

export default generatePhrase;