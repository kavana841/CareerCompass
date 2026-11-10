export const generateObjective = async (req, res) => {
  const name = typeof req.body?.name === "string" ? req.body.name.trim().slice(0, 100) : "";
  const degree = typeof req.body?.degree === "string" ? req.body.degree.trim().slice(0, 160) : "";
  const skills = typeof req.body?.skills === "string" ? req.body.skills.trim().slice(0, 600) : "";

  if (!degree || !skills) {
    return res.status(400).json({
      success: false,
      message: "Add your degree and skills before generating an objective.",
    });
  }

  if (!process.env.OPENAI_API_KEY) {
    return res.status(503).json({
      success: false,
      code: "AI_NOT_CONFIGURED",
      message: "AI generation is not configured. Add OPENAI_API_KEY to backend/.env.",
    });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-6-astra",
        instructions: "Write one concise, professional resume objective in first person implied (do not use I or my). Use only the candidate details provided. Do not invent accomplishments, qualifications, years of experience, or expertise. Return only the objective, in 1 to 2 sentences.",
        input: JSON.stringify({ name, degree, skills }),
      }),
      signal: AbortSignal.timeout(30000),
    });

    const result = await response.json();
    if (!response.ok) {
      const message = response.status === 401
        ? "The AI API key was rejected. Check OPENAI_API_KEY in backend/.env."
        : response.status === 429
          ? "The AI service is rate limited or out of quota. Check your API account."
          : "The AI service could not generate an objective right now.";
      return res.status(502).json({ success: false, message });
    }

    const objective = (result.output || [])
      .flatMap((item) => item.content || [])
      .filter((item) => item.type === "output_text")
      .map((item) => item.text)
      .join("\n")
      .trim();

    if (!objective) {
      return res.status(502).json({
        success: false,
        message: "The AI service returned an empty objective. Please try again.",
      });
    }

    return res.json({ success: true, objective });
  } catch (error) {
    const timedOut = error?.name === "TimeoutError";
    return res.status(502).json({
      success: false,
      message: timedOut
        ? "AI generation timed out. Please try again."
        : "Could not connect to the AI service. Check the backend connection and try again.",
    });
  }
};
