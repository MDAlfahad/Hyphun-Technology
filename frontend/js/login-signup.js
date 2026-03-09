function signup() {
  document.getElementById("signupform").style.display = "block";
  document.getElementById("login-form").style.display = "none";
}
function login() {
  document.getElementById("login-form").style.display = "block";
  document.getElementById("signupform").style.display = "none";
}

const formSignup = document.getElementById("form-signup");

  formSignup.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("sign-name").value.trim();
    const email = document.getElementById("sign-email").value.trim();
    const password = document.getElementById("sign-password").value.trim();
    const repass = document.getElementById("sign-re-password").value.trim();
    const invalidPass = document.getElementById("invalidpass");

    if (password !== repass) {
      invalidPass.textContent = "Passwords do not match";
      return;
    } else {
      invalidPass.textContent = "";
    }

    fetch("http://localhost:5000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name, 
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Server Response:", data);
        alert(data.message);
      })
      .catch((err) => {
        console.log("Error:", err);
      });

    login();
  });

const formlogin = document.getElementById("form-login");

formlogin.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value.trim();
  const invalidPass = document.getElementById("invalidlogin");

  fetch("http://localhost:5000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => res.json())
    .then((data) => {
       if(data.status != 1){
        alert("You are restrected")
        return
       }
      if (data.message === "login sucessfull") {
        localStorage.setItem("role", data.role);
        localStorage.setItem("name", data.name);
      } else {
        invalidPass.textContent = " invlaid Email or password";
      }
    });

  let role = localStorage.getItem("role");
  if (role === "admin") {
    window.location.href = "../html/adminDashboard.html";
  } else if (role === "user") {
    window.location.href = "../index.html";
  }
})
