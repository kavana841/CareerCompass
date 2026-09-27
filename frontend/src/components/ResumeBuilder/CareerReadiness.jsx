function CareerReadiness({
  atsResult,
  jobMatchResult,
  resume,
}) {
  // Resume completeness
  const fields = [
    "name",
    "email",
    "phone",
    "address",
    "objective",
    "degree",
    "college",
    "cgpa",
    "graduation",
    "skills",
    "projects",
    "experience",
    "certifications",
    "languages",
    "github",
    "linkedin",
    "portfolio",
  ];

  const completedFields = fields.filter(
    (field) =>
      resume[field] &&
      resume[field].toString().trim() !== ""
  ).length;

  const completenessScore = Math.round(
    (completedFields / fields.length) * 100
  );

  const atsScore = atsResult?.score || 0;
  const roleScore = jobMatchResult?.matchScore || 0;

  // Give equal importance to all three areas
  const readinessScore = Math.round(
    (atsScore + roleScore + completenessScore) / 3
  );

  if (!atsResult && !jobMatchResult) {
    return null;
  }

  return (
    <div className="career-readiness">

      <div className="readiness-header">
        <h2>🎓 Career Readiness</h2>
        <p>
          Your overall placement preparation score.
        </p>
      </div>

      <div className="readiness-score">
        <span>{readinessScore}</span>
        <small>/ 100</small>
      </div>

      <div className="readiness-progress">
        <div
          className="readiness-progress-bar"
          style={{
            width: `${readinessScore}%`,
          }}
        ></div>
      </div>

      <div className="readiness-cards">

        <div className="readiness-card">
          <span>📄</span>
          <h3>ATS Resume</h3>
          <strong>{atsScore}%</strong>
        </div>

        <div className="readiness-card">
          <span>🎯</span>
          <h3>Role Match</h3>
          <strong>{roleScore}%</strong>
        </div>

        <div className="readiness-card">
          <span>📝</span>
          <h3>Resume Complete</h3>
          <strong>{completenessScore}%</strong>
        </div>

      </div>

      <div className="readiness-message">
        {readinessScore >= 80 && (
          <p>🔥 Excellent! You're strongly prepared for placements.</p>
        )}

        {readinessScore >= 60 && readinessScore < 80 && (
          <p>🚀 Good progress! A few improvements can make you placement-ready.</p>
        )}

        {readinessScore >= 40 && readinessScore < 60 && (
          <p>💪 You're getting there! Keep improving your resume and skills.</p>
        )}

        {readinessScore < 40 && (
          <p>🌱 Keep building! Complete your resume and strengthen your skills.</p>
        )}
      </div>

    </div>
  );
}

export default CareerReadiness;