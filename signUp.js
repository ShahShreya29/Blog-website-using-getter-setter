var user = {
  _name: "",
  _email: "",
  _confirmPassword: "",
  _password: "",
  _role: "",

  get name() {
    return this._name;
  },

  set name(value) {
    this._name = value.trim();
  },

  get email() {
    return this._email;
  },

  set email(value) {
    this._email = value.trim();
  },

  get password() {
    return this._password;
  },

  set password(value) {
    this._password = value.trim();
  },

  get confirmPassword() {
    return this._confirmPassword;
  },

  set confirmPassword(value) {
    this._confirmPassword = value.trim();
  },

  get role() {
    return this._role;
  },

  set role(value) {
    this._role = value.trim();
  },
};

function addData(e) {
  // e.preventDefault();

  // Retrieve input field values
  user.name = document.getElementById("signupUserName").value;
  user.email = document.getElementById("signupUserEmail").value;
  user.confirmPassword = document.getElementById(
    "signupUserConfirmPassword"
  ).value;
  user.password = document.getElementById("signupUserPassword").value;
  user.role = document.getElementById("userRole").value;

  var passwordError = document.getElementById("passwordError");
  var confirmPasswordError = document.getElementById("confirmPasswordError");
  var emailError = document.getElementById("emailError");

  var emailCheck = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  // Check if any field is empty
  if (
    user.name === "" ||
    user.email === "" ||
    user.confirmPassword === "" ||
    user.password === ""
  ) {
    alert("All fields are required.");
    return;
  }
  if (!user.email.match(emailCheck)) {
    emailError.innerHTML = "invalid email";
    return;
  }

  // Check if password length is exactly 8 characters
  if (user.password.length !== 8) {
    passwordError.innerHTML = "password length is exactly 8 characters";
    return;
  }

  // Check if password and confirm password match
  if (user.password !== user.confirmPassword) {
    confirmPasswordError.innerHTML = "Passwords do not match.";
    return;
  }

  // Retrieve existing user data or initialize an empty array if none exists
  var users = JSON.parse(localStorage.getItem("users")) || [];

  // Check if the user already exists
  var existingUser = users.find(function (existingUser) {
    return existingUser.email === user.email;
  });

  if (existingUser) {
    // If the email already exists, prompt the user to log in
    alert("User with this email already exists. Please log in instead.");
    return; // Exit the function to prevent duplicate signing up
  }

  users.push({
    name: user.name,
    email: user.email,
    password: btoa(user.password),
    role: user.role,
  });

  // // Store the updated array back into localStorage
  localStorage.setItem("users", JSON.stringify(users));

  sessionStorage.setItem("currentUser", user.email);
  sessionStorage.setItem("currentRole", user.role);

  alert("Signup successful for " + user.name + ". Please login to continue.");
  window.open("loginForm.html");
}
