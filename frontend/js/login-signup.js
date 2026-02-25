
function signup() {
  document.getElementById("login-form").style.display = "none";
  document.getElementById("signupform").style.display = "block";
}
function login() {
  document.getElementById("signupform").style.display = "none";
  document.getElementById("login-form").style.display = "block";
}

const formSignup = document.getElementById("form-signup");

formSignup.addEventListener("submit", (e) => {
  e.preventDefault();
  
  const userdata = {
    
    signName: document.getElementById("sign-name").value.trim(),
    signEmail: document.getElementById("sign-email").value.trim(),
    signPassword: document.getElementById("sign-password").value.trim(),
    signRePass: document.getElementById("sign-re-password").value.trim(),
    invalidpassword: document.getElementById("invalidpass")
  }
  if (signPassword !== signRePass) {
    invalidPass.textContent = "Passwords do not match";
    return;
  } else {
    invalidPass.textContent = "";
  }

});
