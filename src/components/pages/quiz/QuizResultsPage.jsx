import { useLocation, useNavigate } from "react-router";
import Button from "../../common/Button";

const QuizResultsPage = () => {
    const location = useLocation();
    const navigate = useNavigate();

    if (!location.state) {
        return navigate('/');
    }

    const { score, total } = location.state;
    const percent = Math.round((score / total) * 100);

    return (
        <div className="quiz-results-page">
            <h1>Quiz Results</h1>
            <div className="quiz-results-content-box">
                <div 
                    className="score-circle"
                     style={{
                        background: percent === 100 ? '#8bc34a'
                        : percent === 0 
                            ? '#e0574f'
                            : `conic-gradient(#8bc34a 0% ${percent}%, #e0574f ${percent}% 100%)`
                     }}
                >
                    <div className="score-circle-inner">
                        <span>{percent}%</span>
                    </div>
                </div>
                <p className="score-subtext">{score} out of {total} correct</p>
                <div className="quiz-result-btns">
                    <Button
                        label="Profile"
                        onClick={() => navigate('/profile')}
                    />
                    <Button
                        label="New Quiz"
                        onClick={() => navigate('/quiz')}
                    />
                </div>
            </div>
        </div>
    );
};

export default QuizResultsPage;