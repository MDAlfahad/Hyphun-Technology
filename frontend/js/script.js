const menuBtn = document.getElementById("bar");
const navSmall = document.querySelector(".mobileRes");
const loginbtn = document.getElementById("login-btn");
const showbtn = document.getElementById("box-container");

document.getElementById("login-btn").addEventListener("click", () => {
  showbtn.classList.toggle("hide");
});

document.getElementById("applybtn").addEventListener("click", () => {
  window.location.href = "./html/userInrollForm.html";
});

document.getElementById("bar").addEventListener("click", () => {
  document.querySelector(".mobileRes").classList.toggle("show");
});

fetch("companies.json")
  .then((response) => response.json())
  .then((data) => {
    const container = document.getElementById("companylist");

    data.forEach((Companies) => {
      const card = document.createElement("div");
      card.classList.add("comapyCard");

      card.innerHTML = `
        <h2>${Companies.companyName}</h2>
        <hr>
        <P>${Companies.description}</p>
        <h4>${Companies.positionsRequired}</h4>
        <button onclick="window.location.href = '#">Apply</button>
        </div>
        `;
      container.appendChild(card);
    });
  });

const userRole = localStorage.getItem("role");
if (userRole == "user") {
  document.getElementById("login").style.display = "none";
  document.getElementById("dashbard").style.display = "block";
  document.getElementById("admindashboard").style.display = "block";
}
if (userRole === "admin"){
  document.getElementById("login").style.display = "none";
  document.getElementById("dashbard").style.display = "none";
  document.getElementById("admindashboard").style.display = "block";
}


