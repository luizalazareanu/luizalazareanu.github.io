////sliding form functionality
document.getElementById('register-btn').addEventListener('click', () => document.getElementById("wrapper").classList.add('right-panel-active'));
document.getElementById('sign-in-btn').addEventListener('click', () => document.getElementById("wrapper").classList.remove('right-panel-active'));

////Sign In form validation
var username = document.getElementById("username");
var usernameInvalid = document.getElementById("fa-fa-exclamation-user");
var usernameValid = document.getElementById("fa-fa-check-user");
var password = document.getElementById("password");
var passwordInvalid = document.getElementById("fa-fa-exclamation-pass");
var passwordValid = document.getElementById("fa-fa-check-pass");
var signInBtn = document.getElementById("login-btn");
var loginForm = document.getElementById("login-form");

//pass validation at least 1 numeric, 1 upper, 1 lower
var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/g;

function setVisibility(element,visibility){
    element.style.visibility = visibility;
}

username.addEventListener("blur", function () {
    if (username.value.length < 4) {
        setVisibility(usernameInvalid,"visible");
        setVisibility(usernameValid,"hidden");
    } else {
        setVisibility(usernameInvalid,"hidden");
        setVisibility(usernameValid,"visible");
    }
});

password.addEventListener("blur", function () {
    if (password.value.match(regex)) {
        setVisibility(passwordValid,"visible");
        setVisibility(passwordInvalid,"hidden");
    } else {
        setVisibility(passwordInvalid,"visible");
        setVisibility(passwordValid,"hidden");
    }
});

signInBtn.addEventListener("click", function (event) {
    if (usernameValid.style.visibility === "visible" && passwordValid.style.visibility === "visible") {
        loginForm.setAttribute("action", "home.html");
    } else {
        // var warning = document.createElement("p");
        // warning.innerHTML = "Username or Password is incorrect";
        // warning.style.color = "red";
        // loginForm.appendChild(warning);

        setVisibility(passwordInvalid,"visible");
        setVisibility(usernameInvalid,"visible");
        event.preventDefault();
    }
});

////Create Account form validation
var accountUsername = document.getElementById("account-username");
var email = document.getElementById("account-email");
var accountPassword = document.getElementById("account-password");
var confirmPass = document.getElementById("confirmpass");
var signUpBtn = document.getElementById("sign-up-btn");
var emailRegx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
var createAccountForm = document.getElementById("create-account-form");
var alert = document.createElement("p");

function setAlert(color, message) {
    alert.innerHTML = message;
    alert.style.color = color;
    createAccountForm.appendChild(alert);
}

function isUsernameValid() {
    if (accountUsername.value.length < 4) {
        setAlert("red", "Username has to be at least 4 chars");
        return false;
    } else {
        setAlert("green", "Username is valid");
        return true;
    }
}

function isEmailValid() {
    if (email.value.match(emailRegx)) {
        setAlert("green", "Email is valid");
        return true;
    } else {
        setAlert("red", "Email is not valid");
        return false;
    }
}

function isPasswordValid() {
    if (accountPassword.value.match(regex)) {
        setAlert("green", "Password is valid");
        return true;
    } else {
        setAlert("red", "Password has to contain at least 1 numeric, 1 upper, 1 lower");
        return false;
    }
}

function doPasswordMatch() {
    if (confirmPass.value === accountPassword.value) {
        setAlert("green", "Passwords match");
        return true;
    } else {
        setAlert("red", "Passwords don't match");
        return false;
    }
}

signUpBtn.addEventListener("click", function (event) {
    if (isUsernameValid() && isEmailValid() && isPasswordValid() && doPasswordMatch()) {
        createAccountForm.setAttribute("action", "home.html");
    } else {
        setAlert("red", "Please make sure the form is filled out correctly");
        event.preventDefault();
    }
});

accountUsername.addEventListener("blur", isUsernameValid);
email.addEventListener("blur", isEmailValid);
accountPassword.addEventListener("blur", isPasswordValid);
confirmPass.addEventListener("keyup", doPasswordMatch);

window.onload = function() {
    createAccountForm.reset();
    loginForm.reset();
};