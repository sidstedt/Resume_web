document.addEventListener("DOMContentLoaded", function () {
    if (window.location.pathname.includes("portfolio.html")) {
        loader(fetchGitHubRepos);
    }
});

// Container to display the fetched repositories on the portfolio page
const repoContainer = document.getElementsByClassName("right-side")[0];

// Function to fetch the repositories from the GitHub API
async function fetchGitHubRepos() {
    const username = "sidstedt";
    const url = `https://api.github.com/users/${username}/repos`;
    // Get the current time before fetching the repositories
    const startTime = Date.now();

    try {
        // Fetch the repositories from the GitHub API
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Failed to fetch repos. Status: ${response.status}`);
        
        const repos = await response.json();
        const latestRepos = getSixRepos(repos);
        // Calculate the time it took to fetch the repositories
        const fetchDuration = Date.now() - startTime;
        const remainingTime = Math.max(2000 - fetchDuration, 0);
        // Display the fetched repositories on the portfolio page
        setTimeout(() => {
            displayRepos(latestRepos);
            removeLoader();
        }, remainingTime); // Ensure the loader is displayed for at least 2 seconds
    } catch (error) {
        console.error("Error fetching GitHub repositories:", error);
        removeLoader();
    }
}

// Function to display the fetched repositories on the portfolio page
function displayRepos(repos) {
    let numberTrack = 1;
    // Loop through the fetched repositories and display them on the portfolio page
    repos.forEach(repo => {
        const repoName = repo.name;
        const repoDescription = repo.description || "No description available.";
        const repoURL = repo.html_url;

        const repoHTML = `
            <div class="portfolio-item">
                <h3>${repoName.replace(/_/g, " ")}</h3>
                <div class="button">
                    <a href="#project${numberTrack}" onclick="showRepoModal(${numberTrack}); return false;">View More</a>
                </div>
            </div>
            <!-- Modal (hidden) -->
            <div id="project${numberTrack}" class="modal">
                <div class="modal-content">
                    <a href="#" class="close" onclick="hideRepoModal(${numberTrack}); return false;">&times;</a>
                    <h3>${repoName.replace(/_/g, " ")}</h3><br>
                    <p>${repoDescription}</p><br>
                    <a href="${repoURL}" target="_blank">View on GitHub</a>
                </div>
            </div>`;

        repoContainer.innerHTML += repoHTML;
        numberTrack++;
    });
}

// Function to show repository modals with fade-in effect
function showRepoModal(projectId) {
    let modal = document.getElementById(`project${projectId}`);
    if (modal) {
        // Apply fade-in effect
        modal.classList.add("show");
        // Ensure it's not hidden
        modal.classList.remove("hide");
    }
}

// Function to hide repository modals with fade-out effect
function hideRepoModal(projectId) {
    let modal = document.getElementById(`project${projectId}`);
    if (modal) {
        modal.classList.add("hide");
        // Hide after transition
        setTimeout(() => {
            modal.classList.remove("show");
        }, 500); // Wait for fade-out animation
    }
}

// Function to sort the fetched repositories by date and store only the 6 newest ones
function getSixRepos(repos) {
    return repos
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .slice(0, 6);
}

// Loader function to display a loading spinner while fetching data from the GitHub API
function loader(callback) {
    // Create the loader
    let loader = document.createElement("div");
    loader.classList.add("loader");
    // Create the spinner
    let spinner = document.createElement("div");
    spinner.classList.add("spinner");
    loader.appendChild(spinner);
    // Append the loader to the body
    document.body.appendChild(loader);
    // Call the callback function to fetch the data
    if (callback) callback();
}
// Remove the loading spinner once the data has been fetched
function removeLoader() {
    // Remove the loader
    let loader = document.querySelector(".loader");
    if (loader) {
        loader.style.opacity = 0;
        setTimeout(() => {
            loader.remove();
            // Select the content
            let content = document.querySelector(".right-side");
            // Display the content
            if (content) content.style.display = "block";
        }, 500);
    }
}
