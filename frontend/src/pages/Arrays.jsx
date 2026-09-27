import { Link } from "react-router-dom";
function Arrays() {
 
    return(
        <div className="topic-page">
            <h1>📚Arrays</h1>
            <p>Master Array with Theory, Vidoes & Coding practice.</p>
            <div className="topic-grid">
                <div className="topic-card">
                    <h2>📝Theory Notes</h2>
                    <p>Learn the fundamentals of Arrays from beginner to advanced.</p>
                    <Link to="/coding/arrays/notes">
                    <button>Read Notes</button>
                    </Link>
                </div>
                <div className="topic-card">
                    <h2>🎥Video Tutorials</h2>
                    <p>Watch the best YouTube tutorails on Array.</p>
                    <Link to="/coding/arrays/videos">
                    <button className="array-btn">
                        🎥Watch Vidoes</button>
                    </Link>
                </div>
                <div className="topic-card">
                    <h2>💻Practice Questions</h2>
                    <p>Practice the most asked Array interview questions.</p>
                    <button>Open LeetCode</button>
                </div>
            </div>
        </div>            
    );
}
export default Arrays;