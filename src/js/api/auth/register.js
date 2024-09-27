const API_Base = "https://v2.api.noroff.dev";
const API_Auth = "/auth";
const API_Register = "/register";

document.getElementById("registerForm").addEventListener("submit", function (event) {
  event.preventDefault();
  alert("Registering...");
  const userName = document.getElementById("name").value;
  const userEmail = document.getElementById("email").value;
  const userPassword = document.getElementById("password").value;
  const userConfirmPassword = document.getElementById("confirm-password").value;
  if (userEmail.endsWith("@stud.noroff.no")) {
    if (userPassword === userConfirmPassword) {
      fetch(`${API_Base}${API_Auth}${API_Register}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
        },
        body: JSON.stringify({ name: userName, email: userEmail, password: userPassword }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("data", data);
          if (data.errors) {
            data.errors.forEach((error) => {
              document.getElementById("error-message").textContent += `${error.message}\n`;
              setTimeout(() => {
                if (error.message === "Profile already exists") {
                  window.location.href = "login.html";
                }
              }, 3000);
            });
            return;
          }
          alert("Registration successful!");
          window.location.href = "login.html";
        })
        .catch((error) => {
          console.error("Error during registration:", error);
          document.getElementById("error-message").textContent = "Registration failed, please try again later";
        });
    } else {
      document.getElementById("error-message").textContent = "Passwords do not match";
    }
  } else {
    document.getElementById("error-message").textContent = "Registration not allowed for this email domain";
  }
});
