import { Link } from "react-router-dom";
function Practice() {
    return(
        <div className="practice-page">
            <h1>Practice hub</h1>
            <p>Choose a category to start practicing.</p>
            <div className="practice-grid">
                <Link to="/coding" className="practice-card">
                    <h2>💻 Coding Practice</h2>
                    <p>DSA, LeetCode, HackerRank and more.</p>
                </Link>
                <Link to="/aptitude" className="practice-card">
                    <h2>🧠 Aptitude</h2>
                    <p> Quantitavie, logical and verbal.</p>
                </Link>
                <Link to="subjects" className="practice-card">
                    <h2>📚 Core subjects</h2>
                    <p>DBMS, OS, CN, OOP and DSA.</p>
                </Link>
                <Link to="interview" className="practice-card">
                    <h2>🎤 Interview questions</h2>
                    <p>HR and Technical questions. </p>
                </Link>
                <Link to="/mock-interview" className="practice-card">
                <h2>🎤 AI Mock Interview</h2>
                <p>Practice HR, Technical and Behavioral Interviews. </p>
                </Link>
            </div>
        </div>
    );
}
export default Practice;