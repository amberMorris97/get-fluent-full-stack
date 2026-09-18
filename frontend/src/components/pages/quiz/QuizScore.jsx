import { useNavigate } from "react-router";

const QuizScore = ({ createdAt, score, length }) => {
    const navigate = useNavigate();

    const isoString = createdAt;
    const date = new Date(isoString);

    const formattedDate = new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric'
    }).format(date);

    return (
        <div className="quiz-score" onClick={() => navigate('/quizResults', { state: { score, total: length } })}>
            <h4>{formattedDate}</h4>
            <h4>{score}/{length}</h4>
        </div>
    );
};

export default QuizScore;