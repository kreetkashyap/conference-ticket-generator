document.addEventListener("DOMContentLoaded", () => {
  const formContainer = document.querySelector(".form-container");
  const ticketContainer = document.querySelector(".ticket-container");
  const generateBtn = document.querySelector("button[type='submit']");
  const avatarInput = document.getElementById("avatar");
  const nameInput = document.querySelector("input[name='name']");
  const emailInput = document.querySelector("input[name='email']");
  const usernameInput = document.querySelector("input[name='username']");

  let uploadedAvatar = "";

  // Upload image
  avatarInput.addEventListener("change", (e) => {
    const file = e.target.files[0]; 
    if (!file) return;

    const validTypes = ["image/png", "image/jpeg"];
    if (!validTypes.includes(file.type)) {
      alert("Please upload a JPG or PNG file.");
      avatarInput.value = "";
      return;
    }

    if (file.size > 500 * 1024) {
      alert("File size exceeds 500KB.");
      avatarInput.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onload = function (event) {
      uploadedAvatar = event.target.result;
    };
    reader.readAsDataURL(file);
  });

  // Generate Ticket
  generateBtn.addEventListener("click", () => {
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const username = usernameInput.value.trim();

    if (!name || !email || !username) {
      alert("Please fill in all fields.");
      return;
    }

    // Hide form and button
    formContainer.style.display = "none";
    generateBtn.style.display = "none";

    // Create ticket content
    ticketContainer.innerHTML = `
      <div class="ticket">
        
        <h2>Congrats, ${name}! Your ticket is ready.</h2>
        <p>We've emailed your ticket to <b>${email}</b> and will send updates in the run up to the event.</p>
        <div class="ticket-body">
          <img src="${uploadedAvatar || 'assets/images/image-avatar.jpg'}" class="ticket-avatar" alt="Avatar">
          <div class="ticket-info">
            <p><strong>${name}</strong></p>
            <p>@${username}</p>
          </div>
        </div>
      </div>
    `;

    // Show ticket
    ticketContainer.style.display = "flex";
  });
});
