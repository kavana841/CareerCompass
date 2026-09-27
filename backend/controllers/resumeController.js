export const improveText = (req, res) => {
    console.log("🔥 Improve API HIT!");
  console.log(req.body);

  const { text, section } = req.body;

  let improved = text;

  switch (section) {
    case "skills":
      improved = `Proficient in ${text}, with strong analytical, problem-solving, and software development skills.`;
      break;

    case "projects":
      improved = `Successfully developed ${text} using modern technologies while applying software engineering principles and best coding practices.`;
      break;

    case "experience":
      improved = `Gained practical experience through ${text}, contributing effectively to team objectives while enhancing technical and communication skills.`;
      break;

    default:
      improved = text;
  }

  res.json({
    success: true,
    improved,
  });
};