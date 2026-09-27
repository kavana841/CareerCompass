import { useEffect, useState } from "react";

function ProgressTracker() {
  const [progress, setProgress] = useState(() => {
    const saved = localStorage.getItem("careerCompassProgress");

    return saved
      ? JSON.parse(saved)
      : {
          resume: false,
          ats: false,
          jobMatch: false,
          coding: false,
          aptitude: false,
          interview: false,
        };
  });

  useEffect(() => {
    localStorage.setItem(
      "careerCompassProgress",
      JSON.stringify(progress)
    );
  }, [progress]);

  const completed = Object.values(progress).filter(Boolean).length;
  const total = Object.keys(progress).length;

  const percentage = Math.round((completed / total) * 100);

  const toggleProgress = (item) => {
    setProgress((prev) => ({
      ...prev,
      [item]: !prev[item],
    }));
  };

  const items = [
    {
      key: "resume",
      icon: "📄",
      title: "Resume Builder",
      description: "Create your professional resume",
    },
    {
      key: "ats",
      icon: "📊",
      title: "ATS Analysis",
      description: "Analyze your resume score",
    },
    {
      key: "jobMatch",
      icon: "🎯",
      title: "Job Matching",
      description: "Match your resume with jobs",
    },
    {
      key: "coding",
      icon: "💻",
      title: "Coding Practice",
      description: "Improve your programming skills",
    },
    {
      key: "aptitude",
      icon: "🧠",
      title: "Aptitude Practice",
      description: "Prepare for aptitude tests",
    },
    {
      key: "interview",
      icon: "🎤",
      title: "Mock Interview",
      description: "Practice interview questions",
    },
  ];

  return (
    <div className="progress-tracker">
      <div className="progress-header">
        <h2>📈 Career Progress</h2>

        <p>
          Track your preparation journey and become placement ready.
        </p>
      </div>

      <div className="overall-progress">
        <div className="progress-number">
          <strong>{percentage}%</strong>
          <span>Completed</span>
        </div>

        <div className="progress-bar">
          <div
            className="progress-bar-fill"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>

      <div className="progress-items">
        {items.map((item) => (
          <div
            className={`progress-item ${
              progress[item.key] ? "completed" : ""
            }`}
            key={item.key}
          >
            <div className="progress-icon">
              {item.icon}
            </div>

            <div className="progress-info">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>

            <button
              type="button"
              onClick={() => toggleProgress(item.key)}
            >
              {progress[item.key]
                ? "✓ Completed"
                : "Mark Complete"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProgressTracker;