import { useState } from "react";

function BackendTest() {
  const [result, setResult] = useState("");

  const testAPI = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/ai/generate-objective",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: "Kavana",
            degree: "Computer Science Engineering",
            skills: "Java, React, SQL",
          }),
        }
      );

      const data = await response.json();

      setResult(data.objective);
    } catch (error) {
      console.error(error);
      setResult("Failed to connect to backend");
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>Backend API Test</h1>

      <button onClick={testAPI}>
        Test AI API
      </button>

      <br /><br />

      <p>{result}</p>
    </div>
  );
}

export default BackendTest;