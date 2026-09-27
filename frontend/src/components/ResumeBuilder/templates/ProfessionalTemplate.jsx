function ProfessionalTemplate({ resume }) {
  return (
    <div className="professional-template">

      <div className="professional-header">

        <h1>{resume.name || "Your Name"}</h1>

        <div className="contact-info">
          <span>{resume.email || "your@email.com"}</span>
          <span>{resume.phone || "+91 XXXXX XXXXX"}</span>
          <span>{resume.linkedin || "LinkedIn"}</span>
        </div>

      </div>

      <hr />

      <section>
        <h2>Career Objective</h2>
        <p>{resume.objective}</p>
      </section>

      <section>
        <h2>Education</h2>

        <p><strong>{resume.degree}</strong></p>
        <p>{resume.college}</p>
        <p>CGPA : {resume.cgpa}</p>
        <p>Graduation : {resume.graduation}</p>

      </section>

      <section>
        <h2>Skills</h2>
        <p>{resume.skills}</p>
      </section>

      <section>
        <h2>Projects</h2>
        <p>{resume.projects}</p>
      </section>

      <section>
        <h2>Experience</h2>
        <p>{resume.experience}</p>
      </section>

      <section>
        <h2>Certifications</h2>
        <p>{resume.certifications}</p>
      </section>

      <section>
        <h2>Languages</h2>
        <p>{resume.languages}</p>
      </section>

    </div>
  );
}

export default ProfessionalTemplate;