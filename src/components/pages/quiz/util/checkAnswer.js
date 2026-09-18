export const checkAnswer = (userInput, correctAnswer) => {
    let plainUserInput = userInput.replace(/[^\w\s]/g, '');
    let plainAnswer = correctAnswer.replace(/[^\w\s]/g, '');

    return plainUserInput.toLowerCase() === plainAnswer.toLowerCase();
};