const keywordsList = [
  // Multi-word keywords (checked first to avoid sub-keyword duplication)
  { id: "artificial intelligence", patterns: ["artificial intelligence", "ai"] },
  { id: "machine learning", patterns: ["machine learning", "ml"] },
  { id: "data structures", patterns: ["data structures", "dsa"] },
  { id: "algorithms", patterns: ["algorithms"] },
  { id: "spring boot", patterns: ["spring boot", "springboot"] },
  { id: "rest api", patterns: ["rest api", "restful api", "rest apis"] },

  // Single-word / technology keywords
  { id: "node.js", patterns: ["node.js", "nodejs", "node js", "node"] },
  { id: "javascript", patterns: ["javascript", "js"] },
  { id: "typescript", patterns: ["typescript", "ts"] },
  { id: "c++", patterns: ["c++", "cpp"] },
  { id: "python", patterns: ["python"] },
  { id: "java", patterns: ["java"] },
  { id: "react", patterns: ["react", "react.js", "reactjs"] },
  { id: "angular", patterns: ["angular", "angularjs"] },
  { id: "express", patterns: ["express", "express.js", "expressjs"] },
  { id: "mongodb", patterns: ["mongodb", "mongo"] },
  { id: "sql", patterns: ["sql", "mysql", "postgresql", "postgres"] },
  { id: "docker", patterns: ["docker"] },
  { id: "aws", patterns: ["aws", "amazon web services"] },
  { id: "github", patterns: ["github"] },
  { id: "git", patterns: ["git"] },
  { id: "html", patterns: ["html", "html5"] },
  { id: "css", patterns: ["css", "css3"] },
  { id: "api", patterns: ["api", "apis"] },
];

const escapeRegExp = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const extractKeywords = (text) => {
  if (!text || typeof text !== "string") return [];

  let workingText = text.toLowerCase();
  const matched = [];

  for (const item of keywordsList) {
    let found = false;
    for (const pattern of item.patterns) {
      const escaped = escapeRegExp(pattern);
      const regex = new RegExp(`(?<![a-zA-Z0-9_])${escaped}(?![a-zA-Z0-9_])`, "gi");

      if (regex.test(workingText)) {
        found = true;
        // Mask out the matched occurrence so shorter sub-keywords are not falsely triggered
        workingText = workingText.replace(regex, " ");
      }
    }
    if (found) {
      matched.push(item.id);
    }
  }

  return matched;
};

export const matchJobDescription = (req, res) => {
  const { resume, jobDescription } = req.body;

  if (!resume || !jobDescription) {
    return res.status(400).json({
      success: false,
      message: "Resume and job description are required.",
    });
  }

  const resumeText = Object.values(resume)
    .filter((value) => typeof value === "string")
    .join(" ");

  const jobKeywords = extractKeywords(jobDescription);
  const resumeKeywords = extractKeywords(resumeText);

  const matchedKeywords = jobKeywords.filter((keyword) =>
    resumeKeywords.includes(keyword)
  );

  const missingKeywords = jobKeywords.filter(
    (keyword) => !resumeKeywords.includes(keyword)
  );

  let matchScore = 0;

  if (jobKeywords.length > 0) {
    matchScore = Math.round(
      (matchedKeywords.length / jobKeywords.length) * 100
    );
  }

  res.json({
    success: true,
    matchScore,
    matchedKeywords,
    missingKeywords,
  });
};