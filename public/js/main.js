// spam is used to give error note if any one input is invalid check with user[database]

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

var login = document.getElementById("login");
login.addEventListener("click", function () {
  window.open("./main.html", "_self");
});
