document.addEventListener("DOMContentLoaded", function () {
    if (window.location.pathname.includes("portfolio.html")) {
        fetchGitHubRepos();
    }
});

const repoContainer = document.getElementsByClassName("right-side")[0];

async function fetchGitHubRepos() {
    const username = "sidstedt";
    const url = `https://api.github.com/users/${username}/repos`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Failed to fetch repos. Status: ${response.status}`);

        const repos = await response.json();
        const latestRepos = getSixRepos(repos);
        displayRepos(latestRepos);
    } catch (error) {
        console.error("Error fetching GitHub repositories:", error);
    }
}

function displayRepos(repos) {
    let numberTrack = 1;

    repos.forEach(repo => {
        const repoName = repo.name;
        const repoDescription = repo.description || "No description available.";
        const repoURL = repo.html_url;

        const repoHTML = `
            <div class="portfolio-item">
                <h3>${repoName.replace(/_/g, " ")}</h3>
                <div class="button">
                    <a href="#project${numberTrack}">View More</a>
                </div>
            </div>
            <!-- Modal (hidden) -->
            <div id="project${numberTrack}" class="modal">
                <div class="modal-content">
                    <a href="#" class="close">&times;</a>
                    <h3>${repoName.replace(/_/g, " ")}</h3><br>
                    <p>${repoDescription}</p><br>
                    <a href="${repoURL}" target="_blank">View on GitHub</a>
                </div>
            </div>`;

        repoContainer.innerHTML += repoHTML;
        numberTrack++;
    });
}

function getSixRepos(repos) {
    return repos
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .slice(0, 6);
}
