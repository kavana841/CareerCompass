function Hero() {
    const goToGoal = () => {
        const section= document.getElementById("goal");
        section?.scrollIntoView({
            behavior:"smooth",
            block:"start",
        });
    };
    return(
     <section className="hero">
        <div className="hero-content">
            <h1>Build Your Dream Career with
                <span>CareerCompass</span>
            </h1>
            <p>Your AI-powered placement preparation platform.
                Learn coding, Aptitude, Interview skills, Resume building, and Spoken English - All in one place.</p> 
                <div className="hero-buttons">
                    <button className="primary-btn"
                    onClick={goToGoal}
                    >
                        🚀 Get Started
                    </button>
                    <button className="secondary-btn"
                    onClick={() => window.location.href="/roadmap"}>
                        📍Explore Roadmap
                    </button>
                </div>
                <div className="hero-stats">
                <div>
                <h2>500+</h2>
                <p>Practice Questions</p>
                </div>
                <div>
                    <h2>50+</h2>
                    <p>Learning Topics</p>
                </div>
                <div>
                    <h2>AI</h2>
                    <p>Mock Interview</p>
                </div>
             </div>
       </div>
    </section>
);
}
export default Hero;
           