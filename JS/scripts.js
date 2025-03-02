document.addEventListener("DOMContentLoaded", function() {
    if (window.location.pathname.includes("resume.html")) {
    fetch("../resume.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to load resume.json");
            }
            return response.json();
        })
        .then(data => {
            displayEducation(data.education);
            displayExperience(data.experience);
            displayCertifications(data.certifications);
        })
        .catch(error => console.error("Error loading resume data:", error));
    }
    else {
        console.error("This script is only intended for the resume.html page.");
    }
});

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

let secretCode = "1987";
let inputCode = "";

document.addEventListener("keydown", function (event) {
    inputCode += event.key;
    if (inputCode.includes(secretCode)) {
        showEasterEgg();
        inputCode = "";
    }
});

function showEasterEgg() {
    let modal = document.createElement("div");
    modal.classList.add("easter-modal");
    modal.innerHTML = `
        <div class="modal-content">
            <a href="#" class="close" onclick="this.parentElement.parentElement.remove();">&times;</a>
            <h3>You have unlocked the Easter Egg!</h3>
        </div>`;
    document.body.appendChild(modal);
}

document.addEventListener("DOMContentLoaded", function() {
    let easterEgg = document.querySelector(".img-content");
    if (easterEgg) {
        easterEgg.addEventListener("click", function() {
            document.body.style.backgroundColor = getRandomColor();
        });
    }
    function getRandomColor() {
        let letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
});

