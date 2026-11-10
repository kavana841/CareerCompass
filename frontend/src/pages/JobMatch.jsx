import { useState } from "react";
import { useNavigate } from "react-router-dom";

function JobMatch() {
  const navigate = useNavigate();

  const [resume] = useState(() => {
    try {
      const savedResume = localStorage.getItem("careerCompassResume");
      return savedResume ? JSON.parse(savedResume) : null;
    } catch {
      return null;
    }
  });
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleMatch = async (e) => {
    e.preventDefault();

    if (!resume) {
      alert("Please create your resume first.");
      return;
    }

    if (!jobDescription.trim()) {
      alert("Please paste a job description.");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const response = await fetch(
        "http://localhost:5000/api/jobs/match",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            resume: resume,
            jobDescription: jobDescription,
          }),
        }
      );

      if (!response.ok) {
        let errorMessage = "Failed to match job.";
        try {
          const errorData = await response.json();
          if (errorData?.message) errorMessage = errorData.message;
        } catch {
          errorMessage = `Server error (${response.status}). Please verify the backend is running properly.`;
        }
        alert(errorMessage);
        return;
      }

      const data = await response.json();

      console.log("Job Match Response:", data);

      if (data.success) {
        setResult(data);

        localStorage.setItem(
          "careerCompassJobMatch",
          JSON.stringify(data)
        );
      } else {
        alert(data.message || "Failed to match job.");
      }
    } catch (error) {
      console.error("Job Match Error:", error);
      alert(
        "Unable to connect to backend. Please ensure the server is running on http://localhost:5000."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="job-match-page">

      <div className="job-header">

        <button onClick={() => navigate("/")}>
          ← Back to Dashboard
        </button>

        <h1>🎯 Job Match</h1>

        <p>
          Check how well your resume matches a job description.
        </p>

      </div>

      <div className="job-search-card">

        <h2>🔎 Analyze Job Match</h2>

        {!resume && (
          <p>
            ⚠️ Create your resume first before checking your job match.
          </p>
        )}

        <form onSubmit={handleMatch}>

          <label>
            Job Description
          </label>

          <textarea
            rows="10"
            placeholder="Paste the job description here..."
            value={jobDescription}
            onChange={(e) =>
              setJobDescription(e.target.value)
            }
          />

          <button
            type="submit"
            disabled={loading}
          >
            {loading
              ? "⏳ Analyzing..."
              : "🎯 Check Job Match"}
          </button>

        </form>

      </div>

      {result && (
        <div className="job-result-card">

          <h2>📊 Job Match Result</h2>

          <div className="match-score">
            <strong>
              {result.matchScore}%
            </strong>

            <span>
              Match Score
            </span>
          </div>

          <div>
            <h3>✅ Matching Skills</h3>

            {result.matchedKeywords.length > 0 ? (
              <p>
                {result.matchedKeywords.join(", ")}
              </p>
            ) : (
              <p>No matching keywords found.</p>
            )}
          </div>

          <div>
            <h3>⚠️ Missing Skills</h3>

            {result.missingKeywords.length > 0 ? (
              <p>
                {result.missingKeywords.join(", ")}
              </p>
            ) : (
              <p>
                Great! No important skills are missing. 🎉
              </p>
            )}
          </div>

        </div>
      )}

    </div>
  );
}

export default JobMatch;
