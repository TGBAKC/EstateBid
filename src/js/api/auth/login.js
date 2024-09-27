// import { API_Auth, API_Base, API_Login } from "../data/constants";
// import { save } from "../localStorage/save";
// import { fetchData } from "./fetchData";

// export async function loginUser(email, password) {
//   // Validate email and password presence
//   if (!email || !password) {
//     console.error("Email and password are required for login.");
//     return;
//   }

//   try {
//     // Perform login request
//     const response = await fetchData(
//       `${API_Base}${API_Auth}${API_Login}`, // Constructing the login API URL
//       {
//         headers: {
//           "Content-Type": "application/json; charset=UTF-8",
//         },
//         method: "POST",
//         body: JSON.stringify({ email, password }), // Send email and password in request body
//       },
//       "login",
//     );

//     // Check if response contains data
//     if (response?.data) {
//       const { accessToken, ...profile } = response.data; // Destructure accessToken and profile
//       save("token", accessToken); // Save token to localStorage
//       save("profile", profile); // Save profile to localStorage
//     } else {
//       console.error("Login failed: No data received from the server.");
//     }
//   } catch (error) {
//     console.error("Error during login:", error);
//   }
// }

const API_Base = "https://v2.api.noroff.dev";
const API_Auth = "/auth";
const API_Login = "/login";

document.querySelector("form[name='login']").addEventListener("submit", async function (event) {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch(`${API_Base}${API_Auth}${API_Login}`, {
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    const { data } = await response.json();

    console.log("data", data);

    if (data.accessToken) {
      localStorage.setItem("token", data.accessToken);
      localStorage.setItem("profile", data);
      window.location.href = "/";
    } else {
      alert("Login failed, please try again.");
      console.error("Login failed: No data received from the server.");
    }
  } catch (error) {
    alert("Login failed, please try again.");
    console.error("Error during login:", error);
  }
});
