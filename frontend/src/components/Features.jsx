function Features() {
    return(
        <section id="features" className="features">
            <h2>Everything you need in one platform</h2>
            <div className="feature-grid">
                <div className="feature-card"
                onClick={() => 
                    document
                    .getElementById("roadmap")
                    .scrollIntoView({ behavior: "smooth", })
                }
                >
                    <h3>📚 Roadmap</h3>
                    <p>Semester-wise placement preparation.</p>
                </div>
                <div className="feature-card">
                    <h3>💻 Coding Practice.</h3>
                    <p>Practice coding questions regularly.</p>
                </div>
                <div className="feature-card">
                    <h3>📝 Aptitude Test</h3>
                    <p>Improve logical and quantitative skills.</p>
                </div>
                <div className= "feature-card">
                    <h3>🎤 AI Mock Interview</h3>
                    <p>Practice interviews with AI.</p>
                </div>
                <div className="feature-card">
                    <h3>📄 Resume Checker</h3>
                    <p>Build and improve your resume.</p>
                </div>
                <div className="feature-card">
                    <h3>📈 Progress Tracker</h3>
                    <p>Track your larning journey.</p>
                </div>
            </div>
        </section>
    );
}
export default Features;
