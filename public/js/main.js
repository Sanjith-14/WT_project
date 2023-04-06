const togglePassword = document.getElementById("togglePassword");
const password = document.getElementById("password");
togglePassword.addEventListener("click", () => {
  const type =
    password.getAttribute("type") === "password" ? "text" : "password";
  password.setAttribute("type", type);
  togglePassword.className =
    password.getAttribute("type") === "password"
      ? "bi bi-eye-slash icon"
      : "bi bi-eye icon";
});

function switchVisible() {
  const x = document.getElementById("loginModule");
  const y = document.getElementById("forgotpassModule");
  if (x) {
    if (x.style.display == "none") {
      x.style.display = "block";
      y.style.display = "none";
    } else {
      y.style.display = "Block";
      x.style.display = "none";
    }
  }
}

const validateEmail = () => {
  const emailElement = document.getElementById("email");
  const email = emailElement.value;
  var regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email.trim() == "") {
    return "Email can't be empty";
  }
  if (!String(email).match(regex)) {
    return "Invalid email";
  }
  return "";
};

const validatePassword = () => {
  const passwordElement = document.getElementById("password");
  const password = passwordElement.value;
  if (password.trim() == "") {
    return "Password can't be empty";
  }
  return "";
};

const validateForm = () => {
  const emailError = document.getElementById("emailError");
  const emailErrorText = validateEmail();
  emailError.innerText = emailErrorText;
  const passwordError = document.getElementById("passwordError");
  const passwordErrorText = validatePassword();
  passwordError.innerText = passwordErrorText;
  return emailErrorText === "" && passwordErrorText === "";
};

const loginForm = document.getElementById("loginForm");
loginForm.addEventListener("submit", (event) => {
  console.log("Submit");
  if (!validateForm()) event.preventDefault();
});
