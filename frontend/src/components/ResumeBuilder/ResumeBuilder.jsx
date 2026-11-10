import { useState, useEffect } from "react";
import { useNavigate} from "react-router-dom";
import ResumeForm from "./ResumeForm";
import ResumePreview from "./ResumePreview";
import "../../styles/resume.css";
import TemplateSelector from "./TemplateSelector";
import ATSResult from "./ATSResult";
import JobMatcher from "./JobMatcher";
import RoleSelector from "./RoleSelector";
import CareerReadiness from "./CareerReadiness";
import ProgressTracker from "../ProgressTracker";

function ResumeBuilder() {
  const navigate = useNavigate();
  const [resume, setResume] =  useState(() => {
  const savedResume = localStorage.getItem("careerCompassResume");

  return savedResume
    ? JSON.parse(savedResume)
    : {
       name: "",
        email: "",
        phone: "",
        address: "",
        objective: "",

        degree: "",
        college: "",
        cgpa: "",
        graduation: "",

        skills: "",
        projects: "",
        experience: "",
        certifications: "",
        languages: "",

        github: "",
        linkedin: "",
        portfolio: "",
    };
  });
  const [profileImage, setProfileImage] = useState(null);
  const [template, setTemplate] = useState("modern");

  useEffect(() => {
  localStorage.setItem(
    "careerCompassResume",
     JSON.stringify(resume)
    );
}, [resume]);

  const [atsResult, setAtsResult] = useState(null);
  const [isGeneratingObjective, setIsGeneratingObjective] = useState(false);
  const [objectiveMessage, setObjectiveMessage] = useState(null);

  const [, setProgress] = useState(() => {
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
const updateProgress = (item) => {
  setProgress((prev) => {
    const updated = {
      ...prev,
      [item]: true,
    };

    localStorage.setItem(
      "careerCompassProgress",
      JSON.stringify(updated)
    );

    return updated;
  });
};
  const [jobDescription, setJobDescription]= useState("");
  const [jobMatchResult, setJobMatchResult] = useState(null);
  const [selectedRole, setSelectedRole]= useState("");

  const handleChange = (e) => {
    setResume({
      ...resume,
      [e.target.name]: e.target.value,
    });
    updateProgress("resume");
    if (e.target.name === "degree" || e.target.name === "skills") {
      setObjectiveMessage(null);
    }
  };
  const handleImageUpload = (e) => {
  const file = e.target.files[0];

  if (file) {
    const imageURL = URL.createObjectURL(file);
    setProfileImage(imageURL);
  }
};
const generateObjective = async () => {
  if (!resume.degree.trim() || !resume.skills.trim()) {
    setObjectiveMessage({
      type: "error",
      text: "Add your degree and skills first so the objective can be tailored to you.",
    });
    return;
  }

  setIsGeneratingObjective(true);
  setObjectiveMessage(null);
  try {
    const response = await fetch(
      "http://localhost:5000/api/ai/generate-objective",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: resume.name,
          degree: resume.degree,
          skills: resume.skills,
        }),
      }   
    );

    const data = await response.json().catch(() => ({}));
    if (response.ok && data.success && data.objective) {
      setResume((prev) => ({
        ...prev,
        objective: data.objective,
      }));
      updateProgress("resume");
      setObjectiveMessage({ type: "success", text: "AI objective added. Review it and make it your own." });
    } else {
      throw new Error(data.message || "AI generation is unavailable right now.");
    }
  } catch (error) {
    const objective = `Motivated ${resume.degree.trim()} candidate with skills in ${resume.skills.trim()}. Ready to apply these strengths to practical projects, solve problems thoughtfully, and grow through collaboration.`;
    setResume((prev) => ({ ...prev, objective }));
    updateProgress("resume");
    const reason = error instanceof TypeError
      ? "The AI service could not be reached."
      : error.message;
    setObjectiveMessage({
      type: "warning",
      text: `${reason} A local draft was added. To enable AI-generated writing, start the backend and set OPENAI_API_KEY in backend/.env.`,
    });
  } finally {
    setIsGeneratingObjective(false);
  }
};
const improveSkills = async () => {
  console.log("Improve Skills button clicked");
  try {
    const response = await fetch(
      "http://localhost:5000/api/resume/improve",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: resume.skills,
          section: "skills",
        }),
      }
    );

    const data = await response.json();

    if (data.success) {
      setResume((prev) => ({
        ...prev,
        skills: data.improved,
      }));
    }
  } catch (error) {
    console.error(error);
    alert("Unable to improve skills.");
  }
};
const analyzeResume = async () => {
  try {
    const response = await fetch(
      "http://localhost:5000/api/ats/analyze",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          resume: resume,
        }),
      }
    );

    const data = await response.json();
    console.error("ATS Response:", data);

    if (data.success) {
     setAtsResult(data);
     updateProgress("ats");

     localStorage.setItem(
      "careerCompassATS",
      JSON.stringify({
        score:data.score,
        checks: data.checks,
        suggestions:data.suggestions,
      })
     );
    }else{
      alert("Failed to analyze resume.");
    }
  } catch (error) {
    console.error("ATS Error:", error);
    alert("Unable to analyze resume. Please make sure the backend is running.");
  }
};
const matchJobDescription = async () => {
  if (!jobDescription.trim()) {
    alert("Please paste a job description first.");
    return;
  }

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
      let errorMessage = "Unable to match job description.";
      try {
        const errorData = await response.json();
        if (errorData?.message) errorMessage = errorData.message;
      } catch {
        errorMessage = `Server responded with status ${response.status}. Please verify the backend is running properly.`;
      }
      alert(errorMessage);
      return;
    }

    const data = await response.json();

    console.log("Job Match Result:", data);

    if (data.success) {
      setJobMatchResult(data);
      updateProgress("jobMatch");
    } else {
      alert(data.message || "Unable to match the job description.");
    }
  } catch (error) {
    console.error("Job Match Error:", error);
    alert(
      "Unable to match job description. Please make sure the backend is running on http://localhost:5000."
    );
  }
};
const downloadResume = () => {
  const originalTitle = document.title;
  const sanitizedName = resume?.name
    ? resume.name.trim().replace(/[^a-zA-Z0-9_-]/g, "_")
    : "Resume";
  document.title = `${sanitizedName}_Resume`;
  window.print();
  document.title = originalTitle;
};

  return (
    <div className="resume-page">
      <div className="resume-topbar">
        <button className="back-dashboard-btn" onClick={() => navigate("/")}>
          <span aria-hidden="true">←</span> Dashboard
        </button>
        <span className="resume-save-status"><span /> Saved on this device</span>
      </div>

      <header className="resume-intro">
        <span className="resume-eyebrow">CAREERCOMPASS · RESUME STUDIO</span>
        <h1>Build a resume that gets noticed</h1>
        <p>Add your details, choose a style, and see your resume update as you work.</p>
      </header>

      <div className="resume-workspace">
        <section className="resume-editor-column" aria-label="Resume editor">
          <div className="resume-tool-card resume-template-card">
            <div className="resume-card-heading">
              <span className="resume-step">01</span>
              <div><h2>Choose a template</h2><p>Pick a style for your resume.</p></div>
            </div>
            <TemplateSelector template={template} setTemplate={setTemplate} />
          </div>

          <div className="resume-form-card">
            <div className="resume-card-heading">
              <span className="resume-step">02</span>
              <div><h2>Your information</h2><p>Complete each section to build your profile.</p></div>
            </div>
            <ResumeForm
              resume={resume}
              handleChange={handleChange}
              handleImageUpload={handleImageUpload}
              downloadResume={downloadResume}
              generateObjective={generateObjective}
              isGeneratingObjective={isGeneratingObjective}
              objectiveMessage={objectiveMessage}
              improveSkills={improveSkills}
              analyzeResume={analyzeResume}
            />
          </div>
        </section>

        <aside className="resume-preview-column">
          <div className="resume-preview-label">
            <div><span className="resume-eyebrow">LIVE PREVIEW</span><h2>Your resume</h2></div>
            <span className="resume-preview-page">A4</span>
          </div>
          <ResumePreview resume={resume} profileImage={profileImage} template={template} />
          <p className="resume-preview-note">Your information stays in this browser until you clear it.</p>
        </aside>
      </div>

      <section className="resume-insights" aria-labelledby="resume-insights-title">
        <div className="resume-insights-heading">
          <span className="resume-eyebrow">NEXT STEPS</span>
          <h2 id="resume-insights-title">Strengthen your application</h2>
          <p>Compare your skills with a role and check how your resume is performing.</p>
        </div>
        <div className="resume-insights-grid">
          <RoleSelector selectedRole={selectedRole} setSelectedRole={setSelectedRole} resume={resume} />
          <ATSResult atsResult={atsResult} />
          <JobMatcher
            jobDescription={jobDescription}
            setJobDescription={setJobDescription}
            matchJobDescription={matchJobDescription}
            jobMatchResult={jobMatchResult}
          />
          <CareerReadiness atsResult={atsResult} jobMatchResult={jobMatchResult} resume={resume} />
        </div>
        <ProgressTracker />
      </section>

    </div>
  );
}

export default ResumeBuilder;
