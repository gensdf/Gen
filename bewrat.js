// User management system
let users = JSON.parse(localStorage.getItem("registeredUsers")) || [];

// Default demo user
const demoUser = { username: "Eigen", password: "Miguel" };

// Initialize with demo user if no users exist
if (users.length === 0) {
  users.push(demoUser);
  localStorage.setItem("registeredUsers", JSON.stringify(users));
}

// Form toggle functionality
document.addEventListener("DOMContentLoaded", function() {
  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");
  const toggleLink = document.getElementById("toggleLink");
  const toggleText = document.getElementById("toggleText");
  const pageTitle = document.getElementById("pageTitle");
  const pageSubtitle = document.getElementById("pageSubtitle");
  const demoCredentials = document.getElementById("demoCredentials");

  let isLoginMode = true;

  toggleLink.addEventListener("click", function(e) {
    e.preventDefault();
    isLoginMode = !isLoginMode;

    if (isLoginMode) {
      // Switch to login
      loginForm.style.display = "block";
      signupForm.style.display = "none";
      pageTitle.textContent = "Welcome Back";
      pageSubtitle.textContent = "Sign in to your account to continue";
      toggleText.innerHTML = 'Don\'t have an account? <a href="#" id="toggleLink">Sign up here</a>';
      demoCredentials.style.display = "block";
    } else {
      // Switch to signup
      loginForm.style.display = "none";
      signupForm.style.display = "block";
      pageTitle.textContent = "Create Account";
      pageSubtitle.textContent = "Sign up to get started";
      toggleText.innerHTML = 'Already have an account? <a href="#" id="toggleLink">Sign in here</a>';
      demoCredentials.style.display = "none";
    }

    // Re-attach event listener to new toggle link
    document.getElementById("toggleLink").addEventListener("click", arguments.callee);
  });
});

function login() {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;
  const error = document.getElementById("errorMsg");

  // Check if user exists in registered users
  const userExists = users.find(u => u.username === user && u.password === pass);
  
  if (userExists) {
    // Save user info to localStorage (to access later on dashboard)
    localStorage.setItem("loggedInUser", user);
    window.location.href = "index.html";
  } else {
    error.textContent = "Invalid username or password.";
  }
}

// Profile picture functions
function previewProfilePicture(event) {
  const file = event.target.files[0];
  const preview = document.getElementById("imagePreview");
  const previewImg = document.getElementById("previewImg");
  const fileUploadText = document.getElementById("fileUploadText");
  
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      previewImg.src = e.target.result;
      preview.style.display = "block";
      fileUploadText.textContent = "Change Picture";
    };
    reader.readAsDataURL(file);
  }
}

function removeProfilePicture() {
  const fileInput = document.getElementById("profilePicture");
  const preview = document.getElementById("imagePreview");
  const fileUploadText = document.getElementById("fileUploadText");
  
  fileInput.value = "";
  preview.style.display = "none";
  fileUploadText.textContent = "Choose Profile Picture";
}

function signup() {
  const username = document.getElementById("signupUsername").value;
  const password = document.getElementById("signupPassword").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const error = document.getElementById("signupErrorMsg");

  // Clear previous errors
  error.textContent = "";

  // Validation
  if (username.length < 3) {
    error.textContent = "Username must be at least 3 characters long.";
    return;
  }

  if (password.length < 6) {
    error.textContent = "Password must be at least 6 characters long.";
    return;
  }

  if (password !== confirmPassword) {
    error.textContent = "Passwords do not match.";
    return;
  }

  // Check if username already exists
  const userExists = users.find(u => u.username === username);
  if (userExists) {
    error.textContent = "Username already exists. Please choose a different one.";
    return;
  }

  // Create new user
  const newUser = { 
    username: username, 
    password: password,
    profilePicture: null
  };
  
  users.push(newUser);
  localStorage.setItem("registeredUsers", JSON.stringify(users));

  // Auto-login after successful signup
  localStorage.setItem("loggedInUser", username);
  window.location.href = "index.html";
}
