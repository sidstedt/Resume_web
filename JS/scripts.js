// ***** RESUME SECTION *****
// This script loads and displays resume data from resume.json on resume.html.

document.addEventListener("DOMContentLoaded", async function() {
    if (window.location.pathname.includes("resume.html")) {
        try {
            const resumeData = await loadResumeData();
            // Populate the resume page with fetched data
            displayEducation(resumeData.education);
            displayExperience(resumeData.experience);
            displayCertifications(resumeData.certifications);
        } catch (error) {
            console.error("Error loading resume data:", error);
        }
    }
});

// Fetches resume data from resume.json
async function loadResumeData() {
    try {
        const response = await fetch("/JSON/resume.json");
        if (!response.ok) {
            throw new Error(`Failed to load resume.json: ${response.status} ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching resume.json:", error);
        displayErrorMessage("Failed to load resume data. Please try again later.");
        return null;
    }
}

// Displays education details on the resume page
function displayEducation(education) {
    let educationContainer = document.getElementById("education-list");
    if (!educationContainer) {
        console.error("Element with ID 'education-list' not found");
        return;
    }

    let eduHeader = document.createElement("h2");
    eduHeader.textContent = "Education";
    educationContainer.appendChild(eduHeader);

    education.forEach((edu, index) => {
        let eduWrapper = document.createElement("section");
        eduWrapper.classList.add('edu-wrapper', index % 2 === 0 ? 'bg-lemonchiffon' : 'bg-palegoldenrod');
        eduWrapper.setAttribute("tabindex", "0");
        // Add aria-label to the education section for accessibility
        eduWrapper.setAttribute("aria-label", `Education: ${edu.title}, ${edu.school}, ${edu.years}`);

        let eduContent = document.createElement("div");
        eduContent.classList.add('edu-content');

        let schoolTitle = document.createElement("h3");
        schoolTitle.innerHTML = `${edu.title} (${edu.years})`;
        eduContent.appendChild(schoolTitle);

        let schoolInfo = document.createElement("h4");
        schoolInfo.innerHTML = `${edu.school}, ${edu.city}`;
        eduContent.appendChild(schoolInfo);

        eduWrapper.appendChild(eduContent);
        educationContainer.appendChild(eduWrapper);
    });
}

// Displays work experience on the resume page
function displayExperience(experience) {
    let experienceContainer = document.getElementById("experience-list");
    if (!experienceContainer) {
        console.error("Element with ID 'experience-list' not found");
        return;
    }

    let lastUsedColor = '';

    let expHeader = document.createElement("h2");
    expHeader.textContent = "Experience";
    experienceContainer.appendChild(expHeader);

    experience.forEach((exp, index) => {
        let expWrapper = document.createElement("article");
        lastUsedColor = index % 2 === 0 ? 'bg-lemonchiffon' : 'bg-palegoldenrod';
        expWrapper.classList.add('exp-wrapper', lastUsedColor);
        expWrapper.setAttribute("tabindex", "0");
        // Add aria-label to the experience section for accessibility
        expWrapper.setAttribute("aria-label", `Experience: ${exp.position} at ${exp.company}, ${exp.years}`);

        let expContent = document.createElement("div");
        expContent.classList.add('exp-content');

        let companyTitle = document.createElement("h3");
        companyTitle.textContent = `${exp.company} (${exp.years})`;
        expContent.appendChild(companyTitle);

        let jobTitle = document.createElement("h4");
        jobTitle.textContent = exp.position;
        expContent.appendChild(jobTitle);

        let city = document.createElement("p");
        city.textContent = exp.city;
        expContent.appendChild(city);

        let responsibilitiesList = document.createElement("ul");
        exp.responsibilities.forEach(resp => {
            let listItem = document.createElement("li");
            listItem.textContent = resp;
            responsibilitiesList.appendChild(listItem);
        });

        expContent.appendChild(responsibilitiesList);
        expWrapper.appendChild(expContent);
        experienceContainer.appendChild(expWrapper);
    });

    let oppositeColor = lastUsedColor === 'bg-lemonchiffon' ? 'bg-palegoldenrod' : 'bg-lemonchiffon';
    sessionStorage.setItem("oppositeColor", oppositeColor);
}

function displayCertifications(certifications) {
    let certContainer = document.getElementById("certifications-list");
    if (!certContainer) {
        console.error("Element with ID 'certifications-list' not found");
        return;
    }
    
    let certificationsHeader = document.createElement("h2");
    certificationsHeader.textContent = "Certifications";
    certContainer.appendChild(certificationsHeader);

    let oppositeColor = sessionStorage.getItem("oppositeColor") || 'bg-lemonchiffon';

    let certWrapper = document.createElement("section");
    certWrapper.classList.add('cert-wrapper', oppositeColor);
    certWrapper.setAttribute("tabindex", "0");
    // Add aria-label to the certifications section for accessibility
    certWrapper.setAttribute("aria-label", "List of certifications");

    let certContent = document.createElement("div");
    certContent.classList.add('cert-content');

    let certList = document.createElement("ul");

    certifications.forEach(cert => {
        let listItem = document.createElement("li");
        listItem.textContent = cert;
        certList.appendChild(listItem);
    });

    certContent.appendChild(certList);
    certWrapper.appendChild(certContent);
    certContainer.appendChild(certWrapper);
}

function displayErrorMessage(message) {
    let errorContainer = document.createElement("div");
    errorContainer.classList.add("error-message");
    errorContainer.setAttribute("role", "alert");

    let errorSymbol = document.createElement("span");
    errorSymbol.textContent = "⚠️";
    errorSymbol.setAttribute("aria-hidden", "true");
    
    let errorText = document.createElement("span");
    errorText.textContent = message;

    errorContainer.appendChild(errorSymbol);
    errorContainer.appendChild(errorText);

    let rightSide = document.querySelector(".right-side");
    if (rightSide) {
        rightSide.appendChild(errorContainer);
    }
}