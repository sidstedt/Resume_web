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
        const response = await fetch("/Data/resume.json");
        if (!response.ok) {
            throw new Error(`Failed to load resume.json: ${response.status} ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        throw new Error("Error fetching resume.json: " + error.message);
    }
}

// Displays education details on the resume page
function displayEducation(education) {
    let educationContainer = document.getElementById("education-list");
    if (!educationContainer) {
        console.error("Element with ID 'education-list' not found");
        return;
    }

    education.forEach(edu => {
        let listItem = document.createElement("li");
        listItem.innerHTML = `<strong>${edu.title}</strong>, ${edu.school} (${edu.years})`;
        educationContainer.appendChild(listItem);
    });
}

// Displays work experience on the resume page
function displayExperience(experience) {
    let experienceContainer = document.getElementById("experience-list");
    if (!experienceContainer) {
        console.error("Element with ID 'experience-list' not found");
        return;
    }

    experience.forEach(exp => {
        let companyTitle = document.createElement("h3");
        companyTitle.textContent = `${exp.company} (${exp.years})`;
        experienceContainer.appendChild(companyTitle);

        let jobTitle = document.createElement("h4");
        jobTitle.textContent = exp.position;
        experienceContainer.appendChild(jobTitle);

        let responsibilitiesList = document.createElement("ul");
        exp.responsibilities.forEach(resp => {
            let listItem = document.createElement("li");
            listItem.textContent = resp;
            responsibilitiesList.appendChild(listItem);
        });

        experienceContainer.appendChild(responsibilitiesList);
    });
}

// Displays certifications on the resume page
function displayCertifications(certifications) {
    let certContainer = document.getElementById("certifications-list");
    if (!certContainer) {
        console.error("Element with ID 'certifications-list' not found");
        return;
    }

    certifications.forEach(cert => {
        let listItem = document.createElement("li");
        listItem.textContent = cert;
        certContainer.appendChild(listItem);
    });
}