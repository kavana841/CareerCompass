const technicalKeywords = [
    "javascript",
    "java",
    "python",
    "c",
    "c++",
    "react",
    "node",
    "node.js",
    "html",
    "css",
    "sql",
    "mongodb",
    "express",
    "git",
    "github",
    "typescript",
    "angular",
    "docker",
    "aws",
    "machine learning",
    "data structures",
    "algorithms",
];
export const analyzeResume = (req, res) => {
  const { resume } = req.body;
  const allResumeText = Object.values(resume)
  .filter((value) => typeof value === "string")
  .join(" ")
  .toLowerCase();

const matchedKeywords = technicalKeywords.filter((keyword) =>
  allResumeText.includes(keyword)
);

  if (!resume) {
    return res.status(400).json({
      success: false,
      message: "Resume data is required.",
    });
  }

  let score = 0;
  const checks = [];
  const suggestions = [];
  if (matchedKeywords.length < 3) {
  suggestions.push(
    "Add more relevant technical keywords such as programming languages, frameworks, databases, and development tools."
  );
}

  // 1. Contact Information — 10 points
  const contactComplete =
    resume.name &&
    resume.email &&
    resume.phone;

  if (contactComplete) {
    score += 10;
    checks.push({
      name: "Contact Information",
      status: "pass",
    });
  } else {
    checks.push({
      name: "Contact Information",
      status: "warning",
    });

    suggestions.push(
      "Complete your name, email address, and phone number."
    );
  }

  // 2. Career Objective — 10 points
  if (resume.objective && resume.objective.trim().length >= 30) {
    score += 10;
    checks.push({
      name: "Career Objective",
      status: "pass",
    });
  } else {
    checks.push({
      name: "Career Objective",
      status: "warning",
    });

    suggestions.push(
      "Add a clear career objective describing your goals and strengths."
    );
  }

  // 3. Education — 15 points
  if (
    resume.degree &&
    resume.college &&
    resume.cgpa &&
    resume.graduation
  ) {
    score += 15;
    checks.push({
      name: "Education",
      status: "pass",
    });
  } else {
    checks.push({
      name: "Education",
      status: "warning",
    });

    suggestions.push(
      "Complete your degree, college, CGPA, and graduation year."
    );
  }

  // 4. Skills — 15 points
  if (resume.skills && resume.skills.trim().length >= 10) {
    score += 15;
    checks.push({
      name: "Skills",
      status: "pass",
    });
  } else {
    checks.push({
      name: "Skills",
      status: "warning",
    });

    suggestions.push(
      "Add relevant technical and professional skills."
    );
  }

  // 5. Projects — 20 points
  if (resume.projects && resume.projects.trim().length >= 30) {
    score += 20;
    checks.push({
      name: "Projects",
      status: "pass",
    });
  } else {
    checks.push({
      name: "Projects",
      status: "warning",
    });

    suggestions.push(
      "Add detailed projects and mention the technologies you used."
    );
  }

  // 6. Experience — 15 points
  if (resume.experience && resume.experience.trim().length >= 20) {
    score += 15;
    checks.push({
      name: "Experience",
      status: "pass",
    });
  } else {
    checks.push({
      name: "Experience",
      status: "warning",
    });

    suggestions.push(
      "Add internships, work experience, or relevant practical experience."
    );
  }

  // 7. Certifications — 5 points
  if (
    resume.certifications &&
    resume.certifications.trim().length >= 5
  ) {
    score += 5;
    checks.push({
      name: "Certifications",
      status: "pass",
    });
  } else {
    checks.push({
      name: "Certifications",
      status: "warning",
    });

    suggestions.push(
      "Consider adding relevant certifications."
    );
  }

  // 8. Professional Links — 5 points
  if (
    resume.github ||
    resume.linkedin ||
    resume.portfolio
  ) {
    score += 5;
    checks.push({
      name: "Professional Links",
      status: "pass",
    });
  } else {
    checks.push({
      name: "Professional Links",
      status: "warning",
    });

    suggestions.push(
      "Add your GitHub, LinkedIn, or portfolio link."
    );
  }

  // 9. Languages — 5 points
  if (resume.languages && resume.languages.trim().length >= 3) {
    score += 5;
    checks.push({
      name: "Languages",
      status: "pass",
    });
  } else {
    checks.push({
      name: "Languages",
      status: "warning",
    });

    suggestions.push(
      "Add the languages you can communicate in."
    );
  }

  res.json({
    success: true,
    score,
    checks,
    suggestions,
    matchedKeywords,
  });
};