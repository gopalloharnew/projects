import { getRepos, GITHUB_PAGES_BASE_URL } from "./getRepos.js";
console.log("Projects - Gopal Lohar");

// define variables and constants
const repoCardTemplate = document.querySelector(".repo-card-template");
const repoCardWraper = document.querySelector(".repo-card-wraper");
const numberOfSkeletons = 4;

// addSkeletons
function addSkeletons() {
  repoCardWraper.innerHTML = "";
  for (let i = 0; i < numberOfSkeletons; i++) {
    const repoCard = repoCardTemplate.content.cloneNode(true);
    repoCardWraper.append(repoCard);
  }
}

function createRepoCard(repo) {
  const repoCard = repoCardTemplate.content.cloneNode(true);
  repoCard.querySelector(".repo-title").textContent = repo.name;
  repoCard.querySelector(".repo-description").textContent = repo.description;
  const repoLinks = repoCard.querySelectorAll(".repo-link");
  if (repo.has_pages) {
    repoLinks[0].textContent = "See It Live";
    repoLinks[0].href = GITHUB_PAGES_BASE_URL + repo.name;
  } else {
    repoLinks[0].remove();
  }
  repoLinks[1].textContent = "See Code On Github";
  repoLinks[1].href = repo.html_url;
  return repoCard;
}

function renderRepoCards(repos) {
  repoCardWraper.innerHTML = "";
  repos.forEach((repo) => {
    repoCardWraper.append(createRepoCard(repo));
  });
}

async function populateRepos() {
  const repos = await getRepos();
  renderRepoCards(repos);
}

// Code Running Sequence
addSkeletons();
populateRepos();
