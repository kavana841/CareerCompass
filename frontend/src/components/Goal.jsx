import { Link } from "react-router-dom";
function Goal() {
    return(
        <section id="goal" className="goal">
            <h2>Choose your Goal</h2>
            <p> Select what you want to improve today.</p>
            <div className="goal-grid">
                
                    <Link to="/practice" className="goal-card">
                    <h3>💼 Placement Preparation</h3>
                    <p> Master coding, aptitude and inetrviews.</p>
                </Link>
                <Link to="/english" className="goal-card">
                    <h3>🗣 Spoken English</h3>
                    <p> Improve fluency and communication.</p>
                </Link>
                <Link to="/resume" className="goal-card">
                    <h3>📄 Resume Builder</h3>
                    <p> Create an ATS-friendly professional resume.</p>
                </Link>
            </div>

        </section>
    );
}
export default Goal;