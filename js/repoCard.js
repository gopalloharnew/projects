import { GITHUB_PAGES_BASE_URL } from "./getRepos.js";

function createRepoCard(repo, repoCardTemplate) {
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

export function renderRepoCards(repos, repoCardWraper, repoCardTemplate) {
  repoCardWraper.innerHTML = "";
  repos.forEach((repo) => {
    repo.repoCard = createRepoCard(repo, repoCardTemplate).children[0];
    repoCardWraper.append(repo.repoCard);
  });
}
