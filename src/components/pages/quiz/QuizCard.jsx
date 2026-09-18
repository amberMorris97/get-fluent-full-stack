import Button from "../../common/Button";
import Input from "../../common/forms/inputs/Input";
import ProgressBar from "./ProgressBar";

const QuizCard = ({ quizStarted, handleStartQuiz, questions, currentIndex, userAnswer, handleInputChange, handleSubmitAnswer, showNext, handleNextQuestion, submitting }) => {
    const phrase = questions[currentIndex]?.phrase;
    return (
        <div className="quiz-content-box">
            <img src="./images/get_fluent_logo.svg" alt="logo" height="125" width="125" />
            {!quizStarted ? (
                <Button
                    label="Start Quiz"
                    onClick={handleStartQuiz}
                    className="start-quiz-btn"
                />
            ) : (
                <>
                    <div className="quiz-progress-bar"></div>
                    <ProgressBar percent={Math.floor(((currentIndex + 1) / questions.length) * 100)} />
                    <span>{`${currentIndex + 1}/${questions.length}`}</span>
                    <h2>Type the English translation for:</h2>
                    <div className="quiz-ht-phrase">
                        <h2>{phrase.haitianCreole}</h2>
                    </div>
                    <Input
                        id={`${questions[currentIndex].id}-question-user-input`}
                        type="textarea"
                        label="Type your answer here..."
                        value={userAnswer}
                        handleChange={handleInputChange}
                        classes="question-answer-input"
                    />
                    <Button 
                        label={showNext ? "Next" : "Submit Answer"}
                        onClick={showNext ? handleNextQuestion : handleSubmitAnswer}
                        disabled={submitting || userAnswer.length <= 0}
                        className="quiz-action-btn"
                    />
                </>
            )}
            
        </div>
    );
};

export default QuizCard;