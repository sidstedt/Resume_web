document.addEventListener("DOMContentLoaded", async function () {
    if (window.location.pathname.includes("wcag.html")) {
        try {
            const wcagData = await loadWCAGData();
            displayWCAG(wcagData);
        } catch (error) {
            console.error("Error loading resume data:", error);
        }
    }
});

async function loadWCAGData() {
    try {
        const response = await fetch("/JSON/wcag.json");
        if (!response.ok) {
            throw new Error(`Failed to load wcag.json: ${response.status} ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching wcag.json:", error);
        displayErrorMessage("Failed to load WCAG data. Please try again later.");
        return null;
    }
}

function displayWCAG(data) {
    let wcagContainer = document.getElementById("wcag-section");
    if (!wcagContainer) {
        console.error("Element with ID 'wcag-list' not found");
        return;
    }

    let wcagHeader = document.createElement("h2");
    wcagHeader.textContent = "Web Content Accessibility Guidelines (WCAG)";
    wcagContainer.appendChild(wcagHeader);

    data.forEach((wcag, index) => {
        let wcagWrapper = document.createElement("section");
        wcagWrapper.classList.add('wcag-wrapper', index % 2 === 0 ? 'bg-lemonchiffon' : 'bg-palegoldenrod');
        wcagWrapper.setAttribute("tabindex", "0");
        wcagWrapper.setAttribute("aria-label", `WCAG: ${wcag.title}, ${wcag.description}`);

        let wcagContent = document.createElement("div");
        wcagContent.classList.add('wcag-content');

        let wcagTitle = document.createElement("h3");
        wcagTitle.innerHTML = `${wcag.title}`;
        wcagContent.appendChild(wcagTitle);

        let wcagDescription = document.createElement("p");
        wcagDescription.innerHTML = `${wcag.description}`;
        wcagContent.appendChild(wcagDescription);

        wcagWrapper.appendChild(wcagContent);
        wcagContainer.appendChild(wcagWrapper);
    });
}
