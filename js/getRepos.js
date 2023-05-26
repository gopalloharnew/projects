// URL
const GITHUB_API_PROFILE_URL = "https://api.github.com/users/gopalloharnew";
const GITHUB_API_REPOS_URL = "https://api.github.com/users/gopalloharnew/repos";

// fetchData
async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) return false;
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error.message);
  }
}

// getRepos
export async function getRepos() {
  const profileData = await fetchData(GITHUB_API_PROFILE_URL);
  const publicReposURL = `${GITHUB_API_REPOS_URL}?per_page=${profileData.public_repos}`;
  let repos = await fetchData(publicReposURL);
  return repos;
}
