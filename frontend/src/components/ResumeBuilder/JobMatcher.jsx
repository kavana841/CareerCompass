function JobMatcher({
  jobDescription,
  setJobDescription,
  matchJobDescription,
  jobMatchResult,
}) {
  return (
    <div className="job-matcher">
      <h2>🎯 Job Description Matcher</h2>

      <p>
        Paste a job description below to see how well your resume matches
        the role.
      </p>

      <textarea
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
        placeholder="Paste the job description here..."
        rows="10"
      />

      <button
        type="button"
        className="primary-btn"
        onClick={matchJobDescription}
      >
        🎯 Match My Resume
      </button>

      {jobMatchResult && (
        <div className="job-match-result">
          <h3>Job Match Score</h3>

          <div className="job-score">
            {jobMatchResult.matchScore}%
          </div>

          <h3>✅ Matched Skills</h3>

          <div className="keyword-list">
            {jobMatchResult.matchedKeywords?.length > 0 ? (
              jobMatchResult.matchedKeywords.map((keyword, index) => (
                <span className="keyword-tag" key={index}>
                  {keyword}
                </span>
              ))
            ) : (
              <p>No matching keywords found.</p>
            )}
          </div>

          <h3>⚠️ Missing Skills</h3>

          <div className="keyword-list">
            {jobMatchResult.missingKeywords?.length > 0 ? (
              jobMatchResult.missingKeywords.map((keyword, index) => (
                <span className="missing-keyword-tag" key={index}>
                  {keyword}
                </span>
              ))
            ) : (
              <p>🎉 No important missing keywords detected!</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default JobMatcher;