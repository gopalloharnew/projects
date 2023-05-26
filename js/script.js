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

// Code Running Sequence
addSkeletons();
