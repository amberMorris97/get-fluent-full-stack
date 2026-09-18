import { useContext } from "react";
import { useNavigate } from "react-router";
import QuizScore from "./QuizScore";
import { DataContext } from "../../../context/DataContext";
import Button from "../../common/Button";

const QuizScoreDisplay = () => {
    const { userQuizScores, quizScoresPage, nextQuizScoresPage, prevQuizScoresPage, quizScoreHasNext } = useContext(DataContext);
    const navigate = useNavigate();
   
    const renderQuizScore = userQuizScores?.reverse().map((score) => {
        return <QuizScore key={`${score.id}-quiz-score`} score={score.score} length={score.quizLength} createdAt={score.createdAt} />
    });

    const handleTakeQuiz = () => {
        navigate('/quiz');
    };

    return (
        <div className="quiz-score-display-box">
            {renderQuizScore}
            <div className="quiz-score-display-pagination-btns">
                <Button
                    label="Previous"
                    onClick={prevQuizScoresPage}
                    disabled={quizScoresPage === 0}
                />
                <Button
                    label="Next"
                    onClick={nextQuizScoresPage}
                    disabled={!quizScoreHasNext}
                />
            </div>
            <div className="take-quiz-btn-container">
                <Button
                label="Take Quiz"
                onClick={handleTakeQuiz}
                className="quiz-score-take-quiz-btn"
                />
            </div>
        </div>
    );
};

export default QuizScoreDisplay;