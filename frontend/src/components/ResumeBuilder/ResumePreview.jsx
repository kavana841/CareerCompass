import ModernTemplate from "./templates/ModernTemplate";
import ProfessionalTemplate from "./templates/ProfessionalTemplate";
import MinimalTemplate from "./templates/MinimalTemplate";
function ResumePreview({
    resume,
    profileImage,
    template
}) {
  return (
    <div
      id="resume-preview"
      className="resume-preview"
    >
      {template === "modern" && (
        <ModernTemplate
          resume={resume}
          profileImage={profileImage}
        />
      )}
      {template === "professional" && (
  <ProfessionalTemplate
    resume={resume}
    profileImage={profileImage}
  />
)}
{template === "minimal" && (
  <MinimalTemplate
    resume={resume}
  />
)}
    </div>
  );
}

export default ResumePreview;