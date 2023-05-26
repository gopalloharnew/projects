// URL
const GITHUB_API_PROFILE_URL = "https://api.github.com/users/gopalloharnew";
const GITHUB_API_REPOS_URL = "https://api.github.com/users/gopalloharnew/repos";
export const GITHUB_PAGES_BASE_URL = "https://gopalloharnew.github.io/";

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
  let repos;

  try {
    const profileData = await fetchData(GITHUB_API_PROFILE_URL);
    const publicReposURL = `${GITHUB_API_REPOS_URL}?per_page=${profileData.public_repos}`;
    repos = await fetchData(publicReposURL);
  } catch (error) {
    console.log(error.message);
  }
  return repos;
}
