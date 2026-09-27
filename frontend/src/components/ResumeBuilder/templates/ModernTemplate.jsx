function ModernTemplate({ resume, profileImage }) {
  return (
    <div className="modern-template">

      <div className="modern-header">

        <img
          src={
            profileImage
              ? profileImage
              : "https://placehold.co/130x130/png"
          }
          alt="Profile"
          className="profile-image"
        />

        <div>

          <h1>{resume.name || "Your Name"}</h1>

          <p>{resume.email || "your@email.com"}</p>

          <p>{resume.phone || "+91 XXXXX XXXXX"}</p>

          <p>{resume.address || "Your Address"}</p>

        </div>

      </div>

      <section>

        <h2>🎯 Career Objective</h2>

        <p>
          {resume.objective ||
            "Your career objective will appear here."}
        </p>

      </section>

      <section>

        <h2>🎓 Education</h2>

        <p><strong>Degree:</strong> {resume.degree}</p>

        <p><strong>College:</strong> {resume.college}</p>

        <p><strong>CGPA:</strong> {resume.cgpa}</p>

        <p><strong>Graduation:</strong> {resume.graduation}</p>

      </section>

      <section>

        <h2>💻 Skills</h2>

        <p>{resume.skills}</p>

      </section>

      <section>

        <h2>📂 Projects</h2>

        <p>{resume.projects}</p>

      </section>

      <section>

        <h2>💼 Experience</h2>

        <p>{resume.experience}</p>

      </section>

      <section>

        <h2>🏆 Certifications</h2>

        <p>{resume.certifications}</p>

      </section>

      <section>

        <h2>🌍 Languages</h2>

        <p>{resume.languages}</p>

      </section>

      <section>

        <h2>🔗 Professional Links</h2>

        <p><strong>GitHub:</strong> {resume.github}</p>

        <p><strong>LinkedIn:</strong> {resume.linkedin}</p>

        <p><strong>Portfolio:</strong> {resume.portfolio}</p>

      </section>

    </div>
  );
}

export default ModernTemplate;