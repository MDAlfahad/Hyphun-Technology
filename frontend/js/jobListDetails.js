window.onload = function () {
  const jobpreview = document.getElementById("joblist");


  let allData =[]

  fetch("http://localhost:5000/jobdata")
  .then((res) => res.json())
  .then((data)=>{
    allData = data;
    showData(allData)
  });
  function showData(data) {

  jobpreview.innerHTML = "";

  
  allData.forEach((items) => {
    const title = document.createElement("div");

    title.innerHTML = `
    <h1>${items.title}</h1>
    <p>${items.companyName}</p>
    <hr >
    <p class ='location'> <i class='fa-solid fa-location'></i> ${items.location}</p>
    <p>${items.Skills}</p>
    <p class='detail'>View Details <i class='fa-solid fa-arrow-right' style='margin-left:20px;'></i></p>
    `;

    title.style.cursor = "pointer";

    title.onclick = () => {
      window.location.href = `../html/showJobData.html?id=${items.title}`;
    };

    jobpreview.appendChild(title);
  });
  }

};


const menuBtn = document.getElementById("bar");
const navSmall = document.querySelector(".mobileRes");
const loginbtn = document.getElementById("login-btn");
const showbtn = document.getElementById("box-container");

document.getElementById("login-btn").addEventListener("click", () => {
  window.location.href = './html/loginpage.html'
});

document.getElementById("bar").addEventListener("click", () => {
  document.querySelector(".mobileRes").classList.toggle("show");
});

const useRole = localStorage.getItem("role");
if (useRole === "user") {
  document.getElementById("login-btn").style.display = "none";
  document.getElementById("dashbard").style.display = "block";
  document.getElementById("admindashboard").style.display = "none";
}
if (useRole === "admin"){
  document.getElementById("login-btn").style.display = "none";
  document.getElementById("dashbard").style.display = "none";
  document.getElementById("admindashboard").style.display = "block";
}
