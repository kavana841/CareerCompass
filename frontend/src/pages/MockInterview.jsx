function MockInterview() {
    return(
        <div className="mock-page">
            <h1>🎤 AI Mock Interview</h1>
            <p>practice interview with AI and improve your confidence before real placements.</p>
            <div className="interview-grid">
                <div className="interview-card">
                    <h2>🧑‍💻 HR Interview</h2>
                    <p>communication, confidence and personality questions.</p>
                    <button>Start HR Interview</button>
                </div>
                <div className="interview-card">
                    <h2>💻 Technical Interview</h2>
                    <P>Programming, DSA and core subject questions.</P>
                    <button>Start Technical Interview</button>
                </div>
                <div className="interview-card">
                    <h2>⭐ Behavioral Interview</h2>
                    <p>Situational and problem-solving interview practice.</p>
                    <button>Start Behavioral Interview</button>
                </div>
            </div>
        </div>
    );
}
export default MockInterview;