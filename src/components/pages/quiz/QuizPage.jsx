import { useState, useEffect, useContext, use } from "react";
import { useNavigate } from "react-router";
import { DataContext } from "../../../context/DataContext";
import QuizCard from "./QuizCard";
import { checkAnswer } from "./util/checkAnswer";
import { shuffle } from "./util/shuffle";
import { ModalContext } from "../../../context/ModalContext";

const QuizPage = ({ notify }) => {
    const navigate = useNavigate();
    const { userFlashcards, isLoading, submitQuizScore } = useContext(DataContext);
    const { handleOpenModal } = useContext(ModalContext);

    const [submitting, setSubmitting] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showNext, setShowNext] = useState(false);
    const [score, setScore] = useState(0);
    const [userAnswer, setUserAnswer] = useState('');
    const [quizStarted, setQuizStarted] = useState(false);

    useEffect(() => {
        if (userFlashcards) {
            setQuestions(shuffle(userFlashcards).slice(0, 10));
        }
    }, [userFlashcards]);

    const modalContent = () => {
        const { phrase } = questions[currentIndex];
        const questionInfo = `"${phrase.haitianCreole}" means "${phrase.english}"`;

        return ( 
            <div className="quiz-modal-content">
                <p>{questionInfo}</p>
            </div>
        );
    };

    const handleStartQuiz = () => {
        setQuizStarted(true);
        setCurrentIndex(0);
    };

    const handleInputChange = (e) => {
        setUserAnswer(e.target.value);
    };

    const handleNextQuestion = async () => {
        if (currentIndex === questions.length - 1) {
            setSubmitting(true);
            try {
                await submitQuizScore(score, questions.length);
                notify(true, "Quiz submitted successfully");
                navigate('/quizResults', { state: { score, total: questions.length } });
            } catch(error) {
                notify(false, "Error submitting your score. Please try again.");
            } 
        } else {
            setCurrentIndex(currentIndex + 1);
            setUserAnswer('');
            setShowNext(false);
        }
    };

    const handleSubmitAnswer = (e) => {
        e.preventDefault();
        if (checkAnswer(userAnswer, questions[currentIndex].phrase.english)) {
            handleOpenModal(modalContent, 'CORRECT', 'quiz');
            setScore(prev => prev + 1); 
        } else {
            handleOpenModal(modalContent, 'WRONG', 'quiz');
        }

        setShowNext(true);
    };

    if (isLoading || !userFlashcards) {
        return (
            // TODO: Implement loading spinner
            <div>Loading...</div>
        );
    };
   
    return (
        <div className="quiz-page">
            <h1>Flashcard Quiz</h1>
            <QuizCard 
                questions={questions}
                currentIndex={currentIndex}
                handleInputChange={handleInputChange}
                handleSubmitAnswer={handleSubmitAnswer}
                handleNextQuestion={handleNextQuestion}
                showNext={showNext}
                userAnswer={userAnswer}
                submitting={submitting}
                quizStarted={quizStarted}
                handleStartQuiz={handleStartQuiz}
            />
        </div>
    );
};

export default QuizPage;
