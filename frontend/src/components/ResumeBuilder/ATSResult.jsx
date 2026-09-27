function ATSResult({ atsResult }) {
  if (!atsResult) {
    return null;
  }

  const getScoreMessage = (score) => {
    if (score >= 80) return "Excellent! Your resume is ATS-friendly.";
    if (score >= 60) return "Good start! A few improvements can make it stronger.";
    if (score >= 40) return "Your resume needs some improvements.";
    return "Your resume needs significant improvements.";
  };

  return (
    <div className="ats-result">
      <div className="ats-header">
        <h2>📊 ATS Resume Analysis</h2>
        <p>{getScoreMessage(atsResult.score)}</p>
      </div>

      <div className="ats-score">
        <span>{atsResult.score}</span>
        <small>/ 100</small>
      </div>

      <div className="ats-progress">
        <div
          className="ats-progress-bar"
          style={{ width: `${atsResult.score}%` }}
        ></div>
      </div>
      <h3>🔑 Detected Technical Keywords</h3>

<div className="keyword-list">
  {atsResult.matchedKeywords?.length > 0 ? (
    atsResult.matchedKeywords.map((keyword, index) => (
      <span className="keyword-tag" key={index}>
        {keyword}
      </span>
    ))
  ) : (
    <p>No technical keywords detected.</p>
  )}
</div>

      <h3>Resume Checklist</h3>

      <div className="ats-checks">
        {atsResult.checks?.map((check, index) => (
          <div className="ats-check" key={index}>
            <span>
              {check.status === "pass" ? "✅" : "⚠️"}
            </span>

            <span>{check.name}</span>
          </div>
        ))}
      </div>

      <h3>💡 Suggestions</h3>

      {atsResult.suggestions?.length > 0 ? (
        <ul className="ats-suggestions">
          {atsResult.suggestions.map((suggestion, index) => (
            <li key={index}>{suggestion}</li>
          ))}
        </ul>
      ) : (
        <p>🎉 No major issues found!</p>
      )}
    </div>
  );
}

export default ATSResult;