// RESUME SECTION

document.addEventListener("DOMContentLoaded", async function() {
    if (window.location.pathname.includes("resume.html")) {
        try {
            const resumeData = await loadResumeData();
            displayEducation(resumeData.education);
            displayExperience(resumeData.experience);
            displayCertifications(resumeData.certifications);
        } catch (error) {
            console.error("Error loading resume data:", error);
        }
    }
});

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

// EASTER EGG SECTION

let secretCode = "1337";
let inputCode = "";

document.addEventListener("keydown", function (event) {
    inputCode += event.key;
    if (inputCode.includes(secretCode)) {
        showEasterEgg();
        inputCode = "";
        eyeTracking();
    }
});

// EASTER EGG EMOJI

function showEasterEgg() {
    let modal = document.createElement("div");
    modal.classList.add("easter-modal");
    modal.innerHTML = `
        <div class="modal-content">
            <a href="#" class="close" onclick="this.parentElement.parentElement.remove();">&times;</a>
            <h3>You have unlocked the Easter Egg!</h3>
            <div class="emoji" >
                <div class='eyes'>
                    <div class='eye'>
                        <div class='pupil'></div>
                    </div>
                    <div class='eye'>
                        <div class='pupil'></div>
                    </div>
                </div>
            </div>
        </div>`;
    document.body.appendChild(modal);

    setTimeout(eyeTracking, 1000);
}

function eyeTracking() {
    document.addEventListener("mousemove", function(event) {
        let eyes = document.querySelectorAll('.eye');
        eyes.forEach(eye => {
            let pupil = eye.querySelector('.pupil');

            let eyeRect = eye.getBoundingClientRect();
            let eyeCenterX = eyeRect.left + eyeRect.width / 2;
            let eyeCenterY = eyeRect.top + eyeRect.height / 2;

            let deltaX = event.pageX - eyeCenterX;
            let deltaY = event.pageY - eyeCenterY;

            let angle = Math.atan2(deltaY, deltaX);

            let maxMove = 20;
            let moveX = Math.cos(angle) * maxMove;
            let moveY = Math.sin(angle) * maxMove;

            pupil.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    });
}

// EASTER EGG COLOR CHANGE

document.addEventListener("DOMContentLoaded", function() {
    let easterEgg = document.querySelector(".img-content");
    if (easterEgg) {
        easterEgg.addEventListener("click", function() {
            document.body.style.backgroundColor = getRandomColor();
            document.getElementsByClassName("right-side")[0].style.backgroundColor = getRandomColor();
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
