"use strict";
const photoInput = document.querySelector("#avatarInput");
const fullnameInput = document.querySelector("#fullName");
const emailInput = document.querySelector("#email");
const githubInput = document.querySelector("#github");
const btn = document.querySelector(".btn");
const form = document.querySelector(".formm");
const generator = document.querySelector(".generator");
const ticket = document.querySelector(".ticket");
const congrat = document.querySelector(".congrats-name");
const emailNotification = document.querySelector(".email-text");
const ticketName = document.querySelector(".ticket-name");
const avatar = document.querySelector(".avatar");
const username = document.querySelector(".git-username");
const fullnameError = document.getElementById("fullnameError");
const emailError = document.getElementById("emailError");
const githubError = document.getElementById("githubError");
const photoError = document.getElementById("photoError");
// Regex Patterns
const nameRegex = /^[a-zA-Z\s-]+$/;
const emailRegex = /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$/;
const githubRegex = /^[a-zA-Z0-9-_]+$/;
form.addEventListener("submit", (event) => {
    var _a;
    event.preventDefault();
    // Reset error messages
    fullnameError.textContent = "";
    emailError.textContent = "";
    githubError.textContent = "";
    photoError.textContent = "";
    let isValid = true;
    // Full Name Validation
    if (!nameRegex.test(fullnameInput.value)) {
        fullnameError.textContent = "Full name must contain only letters, spaces and hypens.";
        isValid = false;
    }
    // Email Validation
    if (!emailRegex.test(emailInput.value)) {
        emailError.textContent = "Please enter a valid email address.";
        isValid = false;
    }
    // GitHub Username Validation
    if (!githubRegex.test(githubInput.value)) {
        githubError.textContent = "GitHub username can only contain letters, numbers, and dashes.";
        isValid = false;
    }
    // Photo Validation
    const photoFile = (_a = photoInput.files) === null || _a === void 0 ? void 0 : _a[0];
    if (!photoFile) {
        photoError.textContent = "Please upload a photo.";
        isValid = false;
    }
    else if (!["image/jpeg", "image/png"].includes(photoFile.type)) {
        photoError.textContent = "Photo must be a JPEG or PNG file.";
        isValid = false;
    }
    else if (photoFile.size > 500 * 1024) {
        photoError.textContent = "Photo must not exceed 1500KB.";
        isValid = false;
    }
    // If all inputs are valid, render the output
    if (isValid) {
        generator.style.display = "none";
        ticket.style.display = "flex";
        congrat.textContent = `${fullnameInput.value}!`;
        emailNotification.textContent = `${emailInput.value}`;
        ticketName.textContent = `${fullnameInput.value}`;
        username.textContent = `${githubInput.value}`;
        renderRandomNumbers();
        // Testing
        console.log("Full Name:", fullnameInput.value);
        console.log("Email:", emailInput.value);
        console.log("GitHub Username:", githubInput.value);
        console.log("Photo File:", photoFile);
        // Display the photo
        const reader = new FileReader();
        reader.onload = function (e) {
            var _a;
            avatar.src = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result;
            avatar.style.display = "block";
        };
        if (photoFile) {
            reader.readAsDataURL(photoFile); // This ensures photoFile is not undefined
        }
        else {
            console.error("Photo file is undefined.");
        }
    }
});
function generateRandomNumbers(count, min = 0, max = 9) {
    const randomNumbers = [];
    for (let i = 0; i < count; i++) {
        const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        randomNumbers.push(randomNumber);
    }
    return randomNumbers;
}
// Function to render numbers to an HTML element
function renderRandomNumbers() {
    const numbers = generateRandomNumbers(5); // Generate 5 random numbers
    const outputElement = document.querySelector(".ticket-pri");
    if (outputElement) {
        outputElement.innerHTML = numbers.join("");
    }
    else {
        console.error("Output element not found!");
    }
}
// Select the button element
const refreshButton = document.getElementById("refreshButton");
// Add a click event listener to the button
if (refreshButton) {
    refreshButton.addEventListener("click", () => {
        // Refresh the page
        window.location.reload();
    });
}
else {
    console.error("Refresh button not found!");
}
