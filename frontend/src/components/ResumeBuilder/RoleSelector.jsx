const roles = {
  "Frontend Developer": [
    "html",
    "css",
    "javascript",
    "react",
    "git",
  ],

  "Java Developer": [
    "java",
    "sql",
    "spring boot",
    "rest api",
    "git",
  ],

  "Python Developer": [
    "python",
    "sql",
    "git",
    "rest api",
    "mongodb",
  ],

  "Data Analyst": [
    "python",
    "sql",
    "excel",
    "data analysis",
    "machine learning",
  ],

  "AI/ML Engineer": [
    "python",
    "machine learning",
    "artificial intelligence",
    "sql",
    "data structures",
  ],

  "Backend Developer": [
    "node.js",
    "express",
    "sql",
    "mongodb",
    "rest api",
  ],
};

function RoleSelector({
  selectedRole,
  setSelectedRole,
  resume,
}) {
  const resumeText = Object.values(resume)
    .filter((value) => typeof value === "string")
    .join(" ")
    .toLowerCase();

  const roleSkills = selectedRole ? roles[selectedRole] : [];

  const matchedSkills = roleSkills.filter((skill) =>
    resumeText.includes(skill)
  );

  const missingSkills = roleSkills.filter(
    (skill) => !resumeText.includes(skill)
  );
  const roleMatchScore =
  roleSkills.length > 0
    ? Math.round((matchedSkills.length / roleSkills.length) * 100)
    : 0;

  return (
    <div className="role-selector">
      <h2>🎯 Target Job Role</h2>

      <p>
        Select the role you're preparing for and see which relevant skills
        are already present in your resume.
      </p>

      <select
        value={selectedRole}
        onChange={(e) => setSelectedRole(e.target.value)}
      >
        <option value="">Select a target role</option>

        {Object.keys(roles).map((role) => (
          <option key={role} value={role}>
            {role}
          </option>
        ))}
      </select>

      {selectedRole && (
        <div className="role-analysis">

            <div className="role-score">
  <span>{roleMatchScore}%</span>
  <p>Role Match</p>
</div>

<div className="role-progress">
  <div
    className="role-progress-bar"
    style={{ width: `${roleMatchScore}%` }}
  ></div>
</div>

          <h3>📌 {selectedRole}</h3>

          <h4>✅ Skills Found</h4>

          <div className="keyword-list">
            {matchedSkills.length > 0 ? (
              matchedSkills.map((skill) => (
                <span className="keyword-tag" key={skill}>
                  {skill}
                </span>
              ))
            ) : (
              <p>No matching skills detected.</p>
            )}
          </div>

          <h4>⚠️ Skills to Consider</h4>

          <div className="keyword-list">
            {missingSkills.length > 0 ? (
              missingSkills.map((skill) => (
                <span className="missing-keyword-tag" key={skill}>
                  {skill}
                </span>
              ))
            ) : (
              <p>🎉 Your resume contains all listed role skills!</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default RoleSelector;