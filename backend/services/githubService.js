import axios from "axios";

export const getRepositoryData = async (repoUrl) => {
  const parts = repoUrl.split("/");

  const owner = parts[3];
  const repo = parts[4];

  const api = `https://api.github.com/repos/${owner}/${repo}`;

  const { data } = await axios.get(api);

  return {
    name: data.name,
    description: data.description,
    language: data.language,
    stars: data.stargazers_count,
    forks: data.forks_count,
  };
};
