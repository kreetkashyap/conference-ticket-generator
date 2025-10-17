 document.addEventListener("DOMContentLoaded", () => {
      const formContainer = document.querySelector(".form-container");
      const ticketContainer = document.querySelector(".ticket-container");
      const generateBtn = document.querySelector("button[type='submit']");
      const avatarInput = document.getElementById("avatar");
      const nameInput = document.querySelector("input[name='name']");
      const emailInput = document.querySelector("input[name='email']");
      const usernameInput = document.querySelector("input[name='username']");

      const nameError = document.getElementById("name-error");
      const emailError = document.getElementById("email-error");
      const usernameError = document.getElementById("username-error");
      const avatarError = document.getElementById("avatar-error");

      let uploadedAvatar = "";

      // Avatar validation
      avatarInput.addEventListener("change", (e) => {
        const file = e.target.files[0]; 
        avatarError.textContent = "";
        if (!file) return;

        const validTypes = ["image/png", "image/jpeg"];
        if (!validTypes.includes(file.type)) {
          avatarError.textContent = "Please upload a JPG or PNG file.";
          avatarInput.value = "";
          return;
        }

        if (file.size > 500 * 1024) {
          avatarError.textContent = "File size exceeds 500KB.";
          avatarInput.value = "";
          return;
        }

        const reader = new FileReader();
        reader.onload = function (event) {
          uploadedAvatar = event.target.result;
        };
        reader.readAsDataURL(file);
      });

      // Email regex
      function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      }

      // Form validation
      generateBtn.addEventListener("click", (e) => {
        e.preventDefault();

        // Reset errors
        nameError.textContent = "";
        emailError.textContent = "";
        usernameError.textContent = "";

        let isValid = true;

        if (!nameInput.value.trim()) {
          nameError.textContent = "Full name is required.";
          isValid = false;
        }

        if (!emailInput.value.trim()) {
          emailError.textContent = "Email is required.";
          isValid = false;
        } else if (!isValidEmail(emailInput.value.trim())) {
          emailError.textContent = "Enter a valid email address.";
          isValid = false;
        }

        if (!usernameInput.value.trim()) {
          usernameError.textContent = "Github username is required.";
          isValid = false;
        }

        if (!isValid) return;

        // Hide form and button
        formContainer.style.display = "none";
        generateBtn.style.display = "none";

        // Create ticket content
        ticketContainer.innerHTML = `
          <div class="ticket">
            <h2>Congrats, <span class="highlight-name">${nameInput.value.trim()}</span>!! Your ticket is ready.</h2>
            <p>We've emailed your ticket to <span class="highlight-email">${emailInput.value.trim()}</span> and will send updates in the run up to the event.</p>
            <div class="ticket-body">
              <div class="ticket-top">
                <img src="assets/images/logo-full.svg" class="ticket-logo">
                <p>Jan 31, 2025 / Austin, TX</p>
              </div>
              <div class="ticket-bottom">
                <img src="${uploadedAvatar || 'assets/images/image-avatar.jpg'}" class="ticket-avatar" alt="Avatar">
                <div class="ticket-info">
                  <p><strong>${nameInput.value.trim()}</strong></p>
                  <p>
                  <img src="assets/images/icon-github.svg" class="github-icon">
                  @${usernameInput.value.trim()}</p>
                </div>  
              </div>
              <span class="ticket-number">#01609</span>
            </div>
          </div>
        `;
        ticketContainer.style.display = "flex";
      });
    });