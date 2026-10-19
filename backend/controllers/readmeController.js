import model from "../config/gemini.js";
import { buildPrompt } from "../services/promptService.js";
import { getRepositoryData } from "../services/githubService.js";
import Readme from "../models/Readme.js";

export const generateReadme = async (req, res) => {
  try {
    let project = req.body;

    if (project.githubUrl) {
      const repo = await getRepositoryData(project.githubUrl);

      project = {
        ...project,
        name: repo.name,
        description: repo.description,
        techStack: repo.language,
      };
    }

    const prompt = buildPrompt(project);

    const result = await model.generateContent(prompt);

    const markdown = result.response.text();

    // Save to MongoDB
    const savedReadme = await Readme.create({
      projectName: project.name,
      markdown: markdown,
    });

    res.status(200).json({
      success: true,
      projectName: project.name,
      generatedAt: savedReadme.createdAt,
      readme: markdown,
      data: savedReadme,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getHistory = async (req, res) => {
  const history = await Readme.find().sort({
    createdAt: -1,
  });

  res.json({
    success: true,

    data: history,
  });
};

export const deleteReadme = async (req, res) => {
  await Readme.findByIdAndDelete(req.params.id);

  res.json({
    success: true,

    message: "Deleted Successfully",
  });
};
