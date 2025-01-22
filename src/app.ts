const photoInput = document.querySelector("#avatarInput") as HTMLInputElement;
const fullnameInput = document.querySelector("#fullName") as HTMLInputElement;
const emailInput = document.querySelector("#email") as HTMLInputElement;
const githubInput = document.querySelector("#github") as HTMLInputElement;
const btn = document.querySelector(".btn") as HTMLButtonElement;
const form = document.querySelector(".formm") as HTMLFormElement;


const generator = document.querySelector(".generator") as HTMLElement;
const ticket = document.querySelector(".ticket") as HTMLElement;


const congrat = document.querySelector(".congrats-name") as HTMLElement;
const emailNotification = document.querySelector(".email-text") as HTMLElement;
const ticketName = document.querySelector(".ticket-name")  as HTMLElement;
const avatar = document.querySelector(".avatar") as HTMLImageElement;
const username = document.querySelector(".git-username") as HTMLElement;


const fullnameError = document.getElementById("fullnameError") as HTMLElement;
const emailError = document.getElementById("emailError") as HTMLElement;
const githubError = document.getElementById("githubError") as HTMLElement;
const photoError = document.getElementById("photoError") as HTMLElement;


// Regex Patterns
const nameRegex = /^[a-zA-Z\s-]+$/;
const emailRegex =/^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$/;
const githubRegex = /^[a-zA-Z0-9-_]+$/;

form.addEventListener("submit", (event: Event) => {
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
    const photoFile = photoInput.files?.[0];
    if (!photoFile) {
      photoError.textContent = "Please upload a photo.";
      isValid = false;
    } else if (!["image/jpeg", "image/png"].includes(photoFile.type)) {
      photoError.textContent = "Photo must be a JPEG or PNG file.";
      isValid = false;
    } else if (photoFile.size > 500 * 1024) {
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
        avatar.src = e.target?.result as string;
        avatar.style.display = "block";
      };
      if (photoFile) {
        reader.readAsDataURL(photoFile); // This ensures photoFile is not undefined
      } else {
        console.error("Photo file is undefined.");
      }
    }


});

function generateRandomNumbers(count: number, min: number = 0, max: number = 9): number[] {
    const randomNumbers: number[] = [];
    for (let i = 0; i < count; i++) {
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    randomNumbers.push(randomNumber);
    }
    return randomNumbers;
}
// Function to render numbers to an HTML element
function renderRandomNumbers() {
    const numbers = generateRandomNumbers(5); // Generate 5 random numbers
    const outputElement = document.querySelector(".ticket-pri") as HTMLElement;

    if (outputElement) {
        outputElement.innerHTML = numbers.join("");
    } else {
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
} else {
    console.error("Refresh button not found!");
}
