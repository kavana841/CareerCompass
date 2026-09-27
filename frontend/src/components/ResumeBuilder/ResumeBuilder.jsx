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
  };
  const handleImageUpload = (e) => {
  const file = e.target.files[0];

  if (file) {
    const imageURL = URL.createObjectURL(file);
    setProfileImage(imageURL);
  }
};
const generateObjective = async () => {
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

    const data = await response.json();
    if (data.success) {
      setResume((prev) => ({
        ...prev,
        objective: data.objective,
      }));
    } else {
      alert("Failed to generate objective.");
    }
  } catch (error) {
    console.error(error);
    alert("Backend is not running! Please start the backend server.");
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
      <button
  className="back-dashboard-btn"
  onClick={() => navigate("/")}
>
  ← Back to Dashboard
</button>

      <div className="resume-header">
        <h1>📄 Professional Resume Builder</h1>
        <p>Create your ATS-friendly resume instantly.</p>
      </div>
      <TemplateSelector
        template={template}
        setTemplate={setTemplate}
    />

      <div className="resume-container">

        <ResumeForm
    resume={resume}
    handleChange={handleChange}
    handleImageUpload={handleImageUpload}
    downloadResume={downloadResume}
    generateObjective={generateObjective}
    improveSkills={improveSkills}
    analyzeResume={analyzeResume}
/>
<ATSResult atsResult={atsResult} />

<JobMatcher
  jobDescription={jobDescription}
  setJobDescription={setJobDescription}
  matchJobDescription={matchJobDescription}
  jobMatchResult={jobMatchResult}
/>

<CareerReadiness
  atsResult={atsResult}
  jobMatchResult={jobMatchResult}
  resume={resume}
/>

<ProgressTracker />

<RoleSelector
  selectedRole={selectedRole}
  setSelectedRole={setSelectedRole}
  resume={resume}
/>

        <ResumePreview
    resume={resume}
    profileImage={profileImage}
    template={template}
/>   

      </div>

    </div>
  );
}

export default ResumeBuilder;