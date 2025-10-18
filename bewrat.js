// Example credentials
const validUser = { username: "Eigen", password: "Miguel" };

function login() {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;
  const error = document.getElementById("errorMsg");

  if (user === validUser.username && pass === validUser.password) {
    // Save user info to localStorage (to access later on dashboard)
    localStorage.setItem("loggedInUser", user);
    window.location.href = "index.html";
  } else {
    error.textContent = "Invalid username or password.";
  }
}
