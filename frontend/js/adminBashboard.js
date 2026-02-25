const dashboardBtn = document.getElementById("dashboard");
const tablebtn = document.getElementById("tables")
const userbtn = document.getElementById("users")
const formBtn = document.getElementById("form");
const studentlistbtn = document.getElementById("studentlist");
const dashboardSection = document.getElementById("dashboard-container");
const formSection = document.getElementById("form-details");
const tablesection = document.getElementById("tables-container");
const userssection = document.getElementById("users-container");
const studentsection = document.getElementById("student-container");

const allSections = document.querySelectorAll(".content-section");


function hideAll() {
  allSections.forEach(section => {
    section.classList.remove("active");
  });
}


dashboardSection.classList.add("active");

dashboardBtn.addEventListener("click", () => {
  hideAll();
  dashboardSection.classList.add("active");
});

formBtn.addEventListener("click", () => {
  hideAll();
  formSection.classList.add("active");
});
tablebtn.addEventListener("click", () => {
  hideAll();
  tablesection.classList.add("active");
});
userbtn.addEventListener("click", () => {
  hideAll();
  userssection.classList.add("active");
});
studentlistbtn.addEventListener("click", () => {
  hideAll();
  studentsection.classList.add("active");
});