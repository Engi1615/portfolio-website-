
// this function is for navigation bar tongle
function toggleMenu() {
  const nav = document.getElementById("navLinks");
  nav.classList.toggle("active");
}


// here is the animation code
window.onload = function () {
  VANTA.NET({
    el: ".vanta-bg",
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.00,
    minWidth: 200.00,
    scale: 1.00,
    scaleMobile: 1.00,
    color: 0x000000,
    backgroundColor: 0xf9fafb,
    points: 10.0,
    maxDistance: 25.0,
    spacing: 18.0,
    showDots: true,
    mouseEase: 0.2
  });
};
const skills = ["Software Developer", "Web Developer", "Freelancer"];
const skillText = document.getElementById("skillText");

let skillIdx = 0;
let charIdx = 0;
let typing = true;

function typeSkill() {
  const currentSkill = skills[skillIdx];

  if (typing) {
    if (charIdx <= currentSkill.length) {
      skillText.textContent = currentSkill.substring(0, charIdx);
      charIdx++;
      setTimeout(typeSkill, 100);
    } else {
      typing = false;
      setTimeout(typeSkill, 1000); // wait before erasing
    }
  } else {
    if (charIdx >= 0) {
      skillText.textContent = currentSkill.substring(0, charIdx);
      charIdx--;
      setTimeout(typeSkill, 50);
    } else {
      typing = true;
      skillIdx = (skillIdx + 1) % skills.length;
      setTimeout(typeSkill, 500);
    }
  }
}

window.addEventListener("load", () => {
  // Start typing animation
  setTimeout(typeSkill, 2200); // Wait until initial texts animate
});

// this code is for the handle the submission of the form

const form = document.getElementById('contactForm');
const messageBox = document.getElementById('form-message');

form.addEventListener('submit', async function (e) {
  e.preventDefault();

  // Get form values
  const name = form.name.value.trim();
  const email = form._replyto.value.trim();
  const message = form.message.value.trim();

  // Validate inputs
  if (!name) {
    showMessage("❗ Please enter your name.", "error");
    return;
  }

  if (!validateEmail(email)) {
    showMessage("❗ Please enter a valid email address.", "error");
    return;
  }

  if (!message || message.length < 10) {
    showMessage("❗ Message should be at least 10 characters long.", "error");
    return;
  }

  // Proceed with form submission
  const formData = new FormData(form);

  try {
    const response = await fetch(form.action, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      showMessage("✅ Thank you! Your message has been sent.", "success");
      form.reset();
    } else {
      const data = await response.json();
      showMessage(data.error || "❌ Oops! Something went wrong. Try again.", "error");
    }
  } catch (error) {
    showMessage("❌ Network error. Please check your connection.", "error");
  }
});

// Helper: Show messages
function showMessage(msg, type) {
  messageBox.textContent = msg;
  messageBox.className = `form-message ${type}`;
}

// Helper: Email validation
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}




