function ResumeForm({
  resume,
  handleChange,
  handleImageUpload,
  downloadResume,
  generateObjective,
  improveSkills,
  analyzeResume
}) {
  return (
    <div className="resume-form">

      {/* Personal Information */}
      <h2>👤 Personal Information</h2>

      <input
        type="text"
        name="name"
        placeholder="Full Name"
        value={resume.name}
        onChange={handleChange}
      />

      <input
        type="email"
        name="email"
        placeholder="Email Address"
        value={resume.email}
        onChange={handleChange}
      />

      <input
        type="text"
        name="phone"
        placeholder="Phone Number"
        value={resume.phone}
        onChange={handleChange}
      />

      <textarea
        name="address"
        placeholder="Address"
        rows="3"
        value={resume.address}
        onChange={handleChange}
      />
    
      <label className="upload-label">
  Profile Photo
</label>

<input
  type="file"
  accept="image/*"
  onChange={handleImageUpload}
/>

      {/* Career Objective */}
      <h2>🎯 Career Objective</h2>

      <textarea
        name="objective"
        placeholder="Write your career objective..."
        rows="4"
        value={resume.objective}
        onChange={handleChange}
      />
      <button 
      type="button"
      className="primary-btn"
      onClick={generateObjective}
    >
      Generate with AI
    </button>

      {/* Education */}
      <h2>🎓 Education</h2>

      <input
        type="text"
        name="degree"
        placeholder="Degree"
        value={resume.degree}
        onChange={handleChange}
      />

      <input
        type="text"
        name="college"
        placeholder="College Name"
        value={resume.college}
        onChange={handleChange}
      />

      <input
        type="text"
        name="cgpa"
        placeholder="CGPA"
        value={resume.cgpa}
        onChange={handleChange}
      />

      <input
        type="text"
        name="graduation"
        placeholder="Graduation Year"
        value={resume.graduation}
        onChange={handleChange}
      />

      {/* Skills */}
      <h2>💻 Skills</h2>

      <textarea
        name="skills"
        placeholder="Java, Python, React, Node.js..."
        rows="4"
        value={resume.skills}
        onChange={handleChange}
      />
      <button
  type="button"
  className="primary-btn"
  onClick={improveSkills}
>
  ✨ Improve Skills with AI
</button>

      {/* Projects */}
      <h2>📂 Projects</h2>

      <textarea
        name="projects"
        placeholder="Describe your projects..."
        rows="5"
        value={resume.projects}
        onChange={handleChange}
      />

      {/* Experience */}
      <h2>💼 Experience</h2>

      <textarea
        name="experience"
        placeholder="Internships or Work Experience"
        rows="5"
        value={resume.experience}
        onChange={handleChange}
      />

      {/* Certifications */}
      <h2>🏆 Certifications</h2>

      <textarea
        name="certifications"
        placeholder="AWS, Coursera, Google..."
        rows="4"
        value={resume.certifications}
        onChange={handleChange}
      />

      {/* Languages */}
      <h2>🌍 Languages</h2>

      <input
        type="text"
        name="languages"
        placeholder="English, Kannada, Hindi"
        value={resume.languages}
        onChange={handleChange}
      />

      {/* Links */}
      <h2>🔗 Professional Links</h2>

      <input
        type="text"
        name="github"
        placeholder="GitHub URL"
        value={resume.github}
        onChange={handleChange}
      />

      <input
        type="text"
        name="linkedin"
        placeholder="LinkedIn URL"
        value={resume.linkedin}
        onChange={handleChange}
      />

      <input
        type="text"
        name="portfolio"
        placeholder="Portfolio Website"
        value={resume.portfolio}
        onChange={handleChange}
      />
      <button
  type="button"
  className="primary-btn"
  onClick={analyzeResume}
>
  📊 Analyze Resume
</button>

      <button  className="download-btn"
      onClick={downloadResume}>
        Download Resume
      </button>

    </div>
  );
}

export default ResumeForm;