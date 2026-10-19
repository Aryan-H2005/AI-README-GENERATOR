export const buildPrompt = (project) => `
You are an expert open-source developer.

Generate a high-quality README.md in Markdown.

Project Name: ${project.name}
Description: ${project.description}
Tech Stack: ${project.techStack}
Features: ${project.features}
Installation: ${project.installation}
Usage: ${project.usage}
License: ${project.license}

Rules:
- Return ONLY valid Markdown.
- Do not wrap the output in triple backticks.
- Use proper headings (#, ##).
- Add emojis where appropriate.
- Add badges for technologies if relevant.
- Include examples for installation and usage.
- Keep the README clean and professional.
`;
