addEventListener("DOMContentLoaded", (event) => {
  const dashboardBtn = document.getElementById("dashboard");
  const tablebtn = document.getElementById("tables");
  const userbtn = document.getElementById("users");
  const formBtn = document.getElementById("form");
  const studentlistbtn = document.getElementById("studentlist");
  const dashboardSection = document.getElementById("dashboard-container");
  const formSection = document.getElementById("form-details");
  const tablesection = document.getElementById("tables-container");
  const userssection = document.getElementById("users-container");
  const studentsection = document.getElementById("student-container");

  const allSections = document.querySelectorAll(".content-section");

  function hideAll() {
    allSections.forEach((section) => {
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

  // document.getElementById("logoutbtn").addEventListener("click", () => {
  //   let role = localStorage.getItem("role");

  //   if (role === "admin") {
  //     localStorage.removeItem("role");
  //     window.location.href = "../index.html";
  //   }
  // });
let allData = [];

// 1. Fetch the data once
fetch("http://localhost:5000/formSubData")
  .then((res) => res.json())
  .then((data) => {
    allData = data; 
    renderData(allData)
  });


function renderData(dataToDisplay) {
  const lists = document.getElementById("formBoxData");
  lists.innerHTML = ""; 

  dataToDisplay.forEach((items) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${items.name}</td>
      <td>${items.position}</td>
      <td>${items.date}</td>
      <td class='approve'>Approve</td>
    `;
    lists.appendChild(tr);
  });
}

const searchInput = document.getElementById("searchbar");
const positionSelect = document.getElementById("select");

function applyFilters() {
  const searchTerm = searchInput.value.toLowerCase();
  const selectedPosition = positionSelect.value.toLowerCase();

  const filtered = allData.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm);
    const matchesPosition = selectedPosition === "select" || 
                            item.position.toLowerCase() === selectedPosition;
    
    return matchesSearch && matchesPosition;
  });

  renderData(filtered);
}


searchInput.addEventListener("input", applyFilters);
positionSelect.addEventListener("change", applyFilters);

});