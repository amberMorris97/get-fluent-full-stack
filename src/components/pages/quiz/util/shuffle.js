export function shuffle(array) {
    console.log(array)
    return [...array].sort(() => Math.random() - 0.5);
};