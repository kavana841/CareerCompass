import { useNavigate} from "react-router-dom";
import { useEffect, useState } from "react";

function Dashboard() {
  const navigate = useNavigate();
  const [resumeExists, setResumeExists] = useState(false);
  const [resume, setResume] = useState(null);
  const [progress, setProgress] = useState(null);
  const [atsScore, setAtsScore]= useState(null);
  const [jobMatchScore, setJobMatchScore]= useState(null);
  const [readinessScore, setReadinessScore]= useState(0);


 useEffect(() => {
  const savedResume = localStorage.getItem("careerCompassResume");
  const savedProgress = localStorage.getItem("careerCompassProgress");
  const savedATS = localStorage.getItem("careerCompassATS");
  const savedJobMatch = localStorage.getItem("careerCompassJobMatch");
  
  if (savedATS){
    const atsData=JSON.parse(savedATS);
    setAtsScore(atsData.score);
  }

  if (savedJobMatch){
    const jobMatchData=JSON.parse(savedJobMatch);
    setJobMatchScore(jobMatchData.matchScore);
  }

  if (savedResume) {
    const resumeData = JSON.parse(savedResume);

    setResume(resumeData);

    if (
      resumeData.name ||
      resumeData.email ||
      resumeData.skills
    ) {
      setResumeExists(true);
    }
  }

  if (savedProgress) {
    setProgress(JSON.parse(savedProgress));
  }
}, []);

  const completed = progress
    ? Object.values(progress).filter(Boolean).length
    : 0;

  const total = progress
    ? Object.keys(progress).length
    : 6;

  const progressPercentage = Math.round(
    (completed / total) * 100
  );
  const resumeScore = resume?.name ?100:0;
  const atsValue = atsScore ??0;
  const jobMatchValue = jobMatchScore ?? 0;
  const preparationValue = progressPercentage;

  const calculatedReadiness = Math.round(
    resumeScore * 0.20 +
    atsValue *0.30 +
    jobMatchValue *0.30 +
    preparationValue *0.20
  );
  useEffect(() => {
    setReadinessScore(calculatedReadiness);
  },[
    resume,
    atsScore,
    jobMatchScore,
    progressPercentage,
  ]);

  return (
    <div className="dashboard">

      <div className="dashboard-header">
        <h1>👋 Welcome to CareerCompass</h1>

        <p>
          Your journey from student to placement-ready professional.
        </p>
      </div>

      <div className="dashboard-cards">

        <div className="dashboard-card">
          <span>📄</span>
          <h3>Resume</h3>
          <strong>
            {resume?.name ? "Ready ✅" : "Not Created"}
          </strong>
        </div>

        <div
  className="dashboard-card"
  onClick={() => navigate("/resume")}
  style={{ cursor: "pointer" }}
>
  <span>📊</span>
  <h3>ATS Score</h3>

  <strong>
    {atsScore !== null
      ? `${atsScore}/100`
      : "Not Analyzed"}
  </strong>

  <p>
    {atsScore !== null
      ? "View Resume & Analyze Again"
      : "Analyze Your Resume"}
  </p>
</div>
        <div
         className="dashboard-card"
         onClick={() => navigate("/jobs")}
         style={{ cursor: "pointer" }}
>
          <span>🎯</span>
          <h3>Job Match</h3>
          <strong>
            {jobMatchScore !== null
              ? `${jobMatchScore}%`
              : "Not Analyzed"}
          </strong>
          <p>
            {jobMatchScore !== null
            ? "View Job Match"
          : "Mtch a Job"}
          </p>
        </div>

        <div className="dashboard-card">
          <span>🎓</span>
          <h3>Career Readiness</h3>
          <strong>
            {readinessScore}%
          </strong>
          <p>
            {readinessScore >= 80
            ? "🟢 Placement Ready"
           : readinessScore >= 60
      ? "🟡 Almost Ready"
      : readinessScore >= 40
      ? "🟠 Keep Improving"
      : "🔴 Getting Started"}
          </p>
        </div>

      </div>

      <div className="dashboard-progress">

        <div className="dashboard-section-header">
          <h2>📈 Your Progress</h2>

          <strong>
            {progressPercentage}%
          </strong>
        </div>

        <div className="dashboard-progress-bar">
          <div
            style={{
              width: `${progressPercentage}%`,
            }}
          ></div>
        </div>

        <p>
          {completed} of {total} preparation activities completed.
        </p>

      </div>

      <div className="quick-actions">

        <h2>🚀 Quick Actions</h2>

        <div className="action-grid">

          <button onClick={() => navigate("/resume")}>
  📄
  <span>Build Resume</span>
</button>
          <button onClick={() => navigate("/jobs")}>
            🎯
            <span>Match a Job</span>
          </button>

          <button onClick={() => navigate("/coding")}>
  💻
  <span>Practice Coding</span>
</button>

          <button>
            🧠
            <span>Take Aptitude</span>
          </button>

          <button>
            🎤
            <span>Mock Interview</span>
          </button>

          <button>
            🗺️
            <span>View Roadmap</span>
          </button>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;