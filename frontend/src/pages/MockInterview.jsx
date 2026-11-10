function MockInterview() {
    return(
        <div className="mock-page">
            <h1>🎤 AI Mock Interview</h1>
            <p>practice interview with AI and improve your confidence before real placements.</p>
            <div className="interview-grid">
                <div className="interview-card">
                    <h2>🧑‍💻 HR Interview</h2>
                    <p>communication, confidence and personality questions.</p>
                    <button disabled>Coming soon</button>
                </div>
                <div className="interview-card">
                    <h2>💻 Technical Interview</h2>
                    <p>Programming, DSA and core subject questions.</p>
                    <button disabled>Coming soon</button>
                </div>
                <div className="interview-card">
                    <h2>⭐ Behavioral Interview</h2>
                    <p>Situational and problem-solving interview practice.</p>
                    <button disabled>Coming soon</button>
                </div>
            </div>
        </div>
    );
}
export default MockInterview;
