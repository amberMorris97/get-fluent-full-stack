const generatePhrase = (phrases, callback) => {
    if (!Array.isArray(phrases) || phrases.length === 0) return null;
    
    let randomIndex = Math.floor(Math.random() * phrases.length);
    
    if (callback) callback(phrases[randomIndex].flashcardId);
    
    return phrases[randomIndex];
};

export default generatePhrase;