const searchInput = document.querySelector(".search-input");

// Todo: how to escape regex characters
export function search(repos) {
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
}
