// ***** EASTER EGG SECTION *****

// Activates the Easter Egg when the secret code "1337" is entered
let secretCode = "1337";
let inputCode = "";

document.addEventListener("keydown", function (event) {
    inputCode += event.key;
    if (inputCode.includes(secretCode)) {
        activateEasterEgg();
        inputCode = "";
    }
});

// ***** FUNCTION: Activate Easter Egg *****
function activateEasterEgg() {
    // Show the modal
    showEasterEggModal();

    if (!document.querySelector(".emoji")) {
        createSmiley();
        localStorage.setItem("smileyActive", "true");
    }
}

function createSmiley() {
    let leftSide = document.querySelector(".left-side");
    if (!leftSide) return;

    let emojiContainer = document.createElement("div");
    emojiContainer.classList.add("emoji");
    emojiContainer.setAttribute("aria-label", "Smiling face emoji");
    emojiContainer.setAttribute("role", "eyes tracking");
    emojiContainer.setAttribute("aria-labelledby", "Smiley face that tracks mouse movement, click to remove");
    emojiContainer.innerHTML = `
        <div class='eyes'>
            <div class='eye'><div class='pupil'></div></div>
            <div class='eye'><div class='pupil'></div></div>
        </div>`;

    // Add click event to remove the smiley
    emojiContainer.addEventListener("click", function () {
        emojiContainer.remove();
        localStorage.removeItem("smileyActive");
    });
    // Append the smiley to the left side
    leftSide.appendChild(emojiContainer);
    // Enable eye tracking
    eyeTracking();

}

// ***** FUNCTION: Show Easter Egg Modal *****
function showEasterEggModal() {
    let modal = document.createElement("div");
    modal.classList.add("modal");
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-labelledby", "easterEggTitle");
    modal.setAttribute("aria-describedby", "easterEggDescription");
    modal.innerHTML = `
        <div class="modal-content">
            <a href="#" class="close" onclick="hideEasterEggModal(this);">&times;</a>
            <h3>You have unlocked the Easter Egg! 🎉</h3>
            <p>A hidden feature has been activated!</p>
        </div>`;
    
    document.body.appendChild(modal);

    setTimeout(() => {
        modal.classList.add("show");
    }, 50);
}

// Function to fade out and remove modal
function hideEasterEggModal(closeButton) {
    let modal = closeButton.closest(".modal");
    if (modal) {
        modal.classList.add("hide");

        setTimeout(() => {
            modal.remove();
        }, 500);
    }
}
// Check if the smiley was active before and recreate it
document.addEventListener("DOMContentLoaded", function () {
    if (localStorage.getItem("smileyActive")) {
        createSmiley();
    }
});

// ***** FUNCTION: Eye Tracking (Pupils Follow Cursor) *****
function eyeTracking() {
    let timeoutId;

    document.addEventListener("mousemove", function(event) {
        clearTimeout(timeoutId);

        let eyes = document.querySelectorAll('.eye');
        eyes.forEach(eye => {
            let pupil = eye.querySelector('.pupil');
            let eyeRect = eye.getBoundingClientRect();
            let eyeCenterX = eyeRect.left + eyeRect.width / 2;
            let eyeCenterY = eyeRect.top + eyeRect.height / 2;
            let deltaX = event.pageX - eyeCenterX;
            let deltaY = event.pageY - eyeCenterY;

            let isInsideEye = (
                event.pageX >= eyeRect.left &&
                event.pageX <= eyeRect.right &&
                event.pageY >= eyeRect.top &&
                event.pageY <= eyeRect.bottom
            );

            if (isInsideEye) {
                let distanceFromCenter = Math.sqrt(deltaX ** 2 + deltaY ** 2);
                let maxSquintDistance = eyeRect.width / 5;

                if (distanceFromCenter < maxSquintDistance) {
                    pupil.style.transform = `translate(0, 0)`;
                } else {
                    let squintFactor = 0.3;
                    pupil.style.transform = `translate(${deltaX * squintFactor}px, ${deltaY * squintFactor}px)`;
                }
            } else {
                let angle = Math.atan2(deltaY, deltaX);
                let maxMove = 10;
                pupil.style.transform = `translate(${Math.cos(angle) * maxMove}px, ${Math.sin(angle) * maxMove}px)`;
            }
        });

        timeoutId = setTimeout(() => {
            eyes.forEach(eye => {
                let pupil = eye.querySelector('.pupil');
                pupil.style.transition = "transform 0.3s ease-out";
                pupil.style.transform = "translate(0, 0)";
            });
        }, 750);
    });
}


// ***** EASTER EGG: BACKGROUND COLOR CHANGE *****
// Click on the image to change the background color randomly
document.addEventListener("DOMContentLoaded", function() {
    let easterEgg = document.querySelector(".img-content");

    if (easterEgg) {
        easterEgg.addEventListener("click", function() {
            document.body.style.background = `radial-gradient(circle, ${getRandomColor()} 15%, ${getRandomColor()}) 100%`;
        });
    }

    // Generates a random hex color
    function getRandomColor() {
        let letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
});

// ***** MODAL CLOSE ON ESCAPE KEY *****
document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
        let openModal = document.querySelector(".modal.show");
        if (openModal) {
            openModal.classList.add("hide");
            setTimeout(() => openModal.classList.remove("show"), 500);
        }
    }
});