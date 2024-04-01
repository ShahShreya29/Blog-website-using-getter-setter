var userData = {
  _email: "",
  _password: "",

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
};

function check(e) {
  userData.email = document.getElementById("loginUserEmail").value;
  userData.password = document.getElementById("loginPassword").value;

  var passwordError = document.getElementById("passwordError");
  var emailError = document.getElementById("emailError");
  var emailCheck = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  // Check if any field is empty
  if (userData.email === "" || userData.password === "") {
    alert("All fields are required.");
    return;
  }

  if (!userData.email.match(emailCheck)) {
    emailError.innerHTML = "invalid email";
    return;
  }

  if (userData.password.length !== 8) {
    passwordError.innerHTML = "Passwords must be 8 digits.";
    return;
  }

  // Retrieve user data array from localStorage
  var users = JSON.parse(localStorage.getItem("users")) || [];
  sessionStorage.setItem("ce", userData.email);

  // Find the user with the matching email
  var user = users.find(function (user) {
    return user.email === userData.email;
  });

  if (user) {
    // Check if passwords match
    if (user.password === btoa(userData.password)) {
      alert("Login successful for " + user.name + "!");
      window.open("blog.html", "_self");
    } else {
      alert("invalid Username or Password");
    }
  }
}
