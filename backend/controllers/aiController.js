export const generateObjective = (req, res) => {

    const { name, degree, skills } = req.body;

    const objective = `Motivated ${degree} student with strong knowledge of ${skills}. Passionate about learning new technologies, solving real-world problems, and contributing effectively to organizational success while continuously improving technical and professional skills.`;

    res.json({
        success: true,
        objective,
    });

};