// imports
import { getRepos } from "./getRepos.js";
import { renderRepoCards } from "./repoCard.js";
import { search } from "./search.js";

console.log("Projects - Gopal Lohar"); // Todo: make it look sexy

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
    return repo2.updated_at - repo1.updated_at; // Todo: check what's problem with quiz app
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
