const generatePhrase = (phrases) => {
    let randomIndex = Math.floor(Math.random() * phrases.length);

    return phrases[randomIndex];
};

export default generatePhrase;