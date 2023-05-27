import { getRepos, GITHUB_PAGES_BASE_URL } from "./getRepos.js";
console.log("Projects - Gopal Lohar");

// define variables and constants
const repoCardTemplate = document.querySelector(".repo-card-template");
const repoCardWraper = document.querySelector(".repo-card-wraper");
const searchInput = document.querySelector(".search-input");
const numberOfSkeletons = 4;

let repos;

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
    repo.repoCard = createRepoCard(repo).children[0];
    repoCardWraper.append(repo.repoCard);
  });
}

async function populateRepos() {
  repos = await getRepos();
  renderRepoCards(repos);
}

// Code Running Sequence
addSkeletons();
populateRepos();
searchInput.addEventListener("input", () => {
  const searchQuery = searchInput.value;
  const searchRegex = new RegExp(`(${searchQuery})`, "gi");
  repos.forEach((repo) => {
    if (searchRegex.test(repo.name) || searchRegex.test(repo.description)) {
      repo.repoCard.classList.remove("hidden");
      repo.repoCard.querySelector(".repo-title").innerHTML = repo.name.replace(
        searchRegex,
        "<mark>$1</mark>"
      );
      repo.repoCard.querySelector(".repo-description").innerHTML =
        repo.description?.replace(searchRegex, "<mark>$1</mark>");
    } else {
      repo.repoCard.classList.add("hidden");
    }
  });
});
