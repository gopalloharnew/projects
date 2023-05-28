// imports
import { getRepos } from "./getRepos.js";
import { renderRepoCards } from "./repoCard.js";
import { search } from "./search.js";

const consoleStyles = [
  "font-size: 2rem",
  "font-style: italic",
  "padding: 0.5rem",
];
console.log("%cProjects - Gopal Lohar", consoleStyles.join(";"));

// define variables and constants
// dom
const repoCardTemplate = document.querySelector(".repo-card-template");
const repoCardWraper = document.querySelector(".repo-card-wraper");
const searchInput = document.querySelector(".search-input");

// reps
let repos;

// addSkeletons
function addSkeletons(numberOfSkeletons) {
  repoCardWraper.innerHTML = "";
  for (let i = 0; i < numberOfSkeletons; i++) {
    const repoCard = repoCardTemplate.content.cloneNode(true);
    repoCardWraper.append(repoCard);
  }
}

function sortRepos(repos) {
  return repos.sort((repo1, repo2) => {
    return repo2.created_at - repo1.created_at;
  });
}

async function populateRepos() {
  repos = await getRepos();
  repos = sortRepos(repos);
  renderRepoCards(repos, repoCardWraper, repoCardTemplate);
}

// Code Running Sequence
addSkeletons(4);
populateRepos();
searchInput.addEventListener("input", () => {
  search(repos);
});
