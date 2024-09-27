document.getElementById("logout").addEventListener("click", (e) => {
  e.preventDefault();
  localStorage.removeItem("token");
  localStorage.removeItem("profile");
  window.location.href = "/src/Auth/login.html";
});
