var signupName = document.getElementById("signupName");
var signupEmail = document.getElementById("signupEmail");
var signupPassword = document.getElementById("signupPassword");
var incorrect = document.getElementById("incorrect");
var signinEmail = document.getElementById("signinEmail");
var signinPassword = document.getElementById("signinPassword");

var pathparts = location.pathname.split("/");
var baseURL = "";
for (var i = 0; i < pathparts.length - 1; i++) {
  baseURL += "/" + pathparts[i];
}
console.log(baseURL);

// to say welcome in home page
var username = localStorage.getItem("username");
if (username) {
  document.getElementById("username").innerHTML = "Welcome " + username;
}

var usersList;

if (localStorage.getItem("users") == null) {
  usersList = [];
} else {
  usersList = JSON.parse(localStorage.getItem("users"));
}

function isEmpty() {
  if (
    signupName.value == "" ||
    signupEmail.value == "" ||
    signupPassword.value == ""
  ) {
    return false;
  } else {
    return true;
  }
}

function isEmailExist() {
  for (var i = 0; i < usersList.length; i++) {
    if (usersList[i].email.toLowerCase() == signupEmail.value.toLowerCase()) {
      return false;
    }
  }
}

function signUp() {
  if (isEmpty() == false) {
    document.getElementById("exist").innerHTML =
      '<span class="text-danger m-3">All inputs is required</span>';
    return false;
  }
  var user = {
    name: signupName.value,
    email: signupEmail.value,
    password: signupPassword.value,
  };

  if (usersList.length == 0) {
    usersList.push(user);
    localStorage.setItem("users", JSON.stringify(usersList));
    document.getElementById("exist").innerHTML =
      '<span class="text-success m-3">Success</span>';
    return true;
  }
  if (isEmailExist() == false) {
    document.getElementById("exist").innerHTML =
      '<span class="text-danger m-3">email already exists</span>';
  } else {
    usersList.push(user);
    localStorage.setItem("users", JSON.stringify(usersList));
    document.getElementById("exist").innerHTML =
      '<span class="text-success m-3">Success</span>';
  }
  // clearSignUp();
}

function isLoginEmpty() {
  if (signinEmail.value == "" || signinPassword.value == "") {
    return false;
  } else {
    return true;
  }
}

function logIn() {
  if (isLoginEmpty() == false) {
    document.getElementById("incorrect").innerHTML =
      '<span class="text-danger m-3">All inputs is required</span>';
    return false;
  }

  for (var i = 0; i < usersList.length; i++) {
    if (
      signinEmail.value.toLowerCase() == usersList[i].email.toLowerCase() &&
      signinPassword.value.toLowerCase() == usersList[i].password.toLowerCase()
    ) {
      localStorage.setItem("username", usersList[i].name);

      if (baseURL == "/") {
        location.replace("https://" + location.hostname + "/home.html");
      } else {
        location.replace(baseURL + "/home.html");
      }
    } else {
      document.getElementById("incorrect").innerHTML =
        '<span class="p-2 text-danger">incorrect email or password</span>';
    }
  }
}

// function clearSignUp() {
//   signupName.value = ``;
//   signupEmail.value = ``;
//   signupPassword.value = ``;
// }

function logout() {
  localStorage.removeItem("username");
}
