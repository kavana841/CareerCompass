function TemplateSelector({ template, setTemplate }) {
  return (
    <div className="template-selector">

      <h2>Choose Resume Template</h2>

      <div className="template-buttons">

        <button
          className={template === "modern" ? "active-template" : ""}
          onClick={() => setTemplate("modern")}
        >
          🎨 Modern
        </button>

        <button
          className={template === "professional" ? "active-template" : ""}
          onClick={() => setTemplate("professional")}
        >
          💼 Professional
        </button>

        <button
          className={template === "minimal" ? "active-template" : ""}
          onClick={() => setTemplate("minimal")}
        >
          📄 Minimal
        </button>

      </div>

    </div>
  );
}

export default TemplateSelector;