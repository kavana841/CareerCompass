function MinimalTemplate({ resume }) {
  return (
    <div className="minimal-template">

      <h1>{resume.name || "Your Name"}</h1>

      <p>
        {resume.email} | {resume.phone}
      </p>

      <hr />

      <section>
        <h2>Career Objective</h2>
        <p>{resume.objective}</p>
      </section>

      <section>
        <h2>Education</h2>

        <p><strong>{resume.degree}</strong></p>
        <p>{resume.college}</p>
        <p>{resume.cgpa}</p>
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
        <h2>Languages</h2>
        <p>{resume.languages}</p>
      </section>

    </div>
  );
}

export default MinimalTemplate;