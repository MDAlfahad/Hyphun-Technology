document.getElementById("postjob").addEventListener("click", () => {
  document.getElementById("jobform").style.display = "flex";
});

document.getElementById("closebtn").addEventListener("click", () => {
  document.getElementById("jobform").style.display = "none";
});

const form = document.getElementById("jobform");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const jobData = new FormData();

  jobData.append("title", document.getElementById("title").value);
  jobData.append("companyName", document.getElementById("companyName").value);
  jobData.append("experience", document.getElementById("experience").value);
  jobData.append("startDate", document.getElementById("startDate").value);
  jobData.append("package", document.getElementById("package").value);
  jobData.append("jobType", document.getElementById("jobType").value);
  jobData.append("location", document.getElementById("location").value);
  jobData.append("skills", document.getElementById("skills").value);
  jobData.append("description", document.getElementById("description").value);
  jobData.append("requirement", document.getElementById("requirement").value);
  jobData.append("applydate", document.getElementById("applydate").value);
  jobData.append("aboutcompany", document.getElementById("aboutcompany").value);

  await fetch("http://localhost:5000/jobformdata", {
    method: "POST",
    body: jobData,
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      alert("uploaded");
    });
});

const jobList = document.getElementById("postedJobData");

let allData = [];

fetch("http://localhost:5000/jobdata")
  .then((res) => res.json())
  .then((data) => {
    allData = data;
    showData(allData);
  });

function showData(data) {
  jobList.innerHTML = "";

  data.forEach((items) => {
    const divdata = document.createElement("div");

    divdata.innerHTML = `
      <h1><span style='font-weight:600;'>Title:</span> ${items.title}</h1>
      <p><span style='font-weight:600;'>Company Name:</span> ${items.companyName}</p>
      <p><span style='font-weight:600;'>Experience:</span> ${items.experience}</p>
      <p><span style='font-weight:600;'>Job Type:</span> ${items.jobType}</p>
      <p><span style='font-weight:600;'>Location:</span> ${items.location}</p>
      <p><span style='font-weight:600;'> Skills Required: </span>${items.Skills}</p>
      <p class="description"><span style='font-weight:600;'>Description:</span> ${items.description}</p>
      <p class="aboutcompany"><span style='font-weight:600;'>About Company:</span> ${items.aboutcompany}</p>
      <p> <span style='font-weight:600;'>Other Requirements:</span> ${items.otherRequirement}</p>
      <hr/>
    `;

    jobList.appendChild(divdata);
  });
}

const searchInput = document.getElementById("searchbar");
const positionSelect = document.getElementById("jobTypeFilter");

function applyFilters() {
  const searchTerm = searchInput.value.toLowerCase();
  const selectedPosition = positionSelect.value.toLowerCase();

  const filtered = allData.filter((items) => {
    const matchesSearch =
      items.title && items.title.toLowerCase().includes(searchTerm);

    const matchesPosition =
      selectedPosition === "select" ||
      (items.jobType && items.jobType.toLowerCase() === selectedPosition);

    return matchesSearch && matchesPosition;
  });

  showData(filtered);
}

searchInput.addEventListener("input", applyFilters);
positionSelect.addEventListener("change", applyFilters);

const dashbordbtn = document.getElementById("dashboardbtn");
const applicantbtn = document.getElementById("applicantbtn");
// const logoutbtn = document.getElementById("logoutbtn");

const companyDashboard = document.getElementById("companyDashboard");
const applicationContainer = document.getElementById("applicationContainer");

const container = document.querySelectorAll(".container-section");

function hideAll() {
  container.forEach((section) => {
    section.classList.remove("active");
  });
}

companyDashboard.classList.add("active");

dashbordbtn.addEventListener("click", () => {
  hideAll();
  companyDashboard.classList.add("active");
});
applicantbtn.addEventListener("click", () => {
  hideAll();
  applicationContainer.classList.add("active");
});

// -------------------------------application list section -----------------------------

let applicantdata = [];
fetch("http://localhost:5000/formSubData")
  .then((res) => res.json())
  .then((data) => {
    applicantdata = data;
    showapplicantData(applicantdata);
  });

function showapplicantData(display) {
  const data = document.getElementById("formBoxData");
  data.innerHTML = "";

  display.forEach((items) => {
    let row = document.createElement("tr");
    row.innerHTML = ` 
      <td>${items.name}</td>
      <td>${items.position}</td>
      <td>${items.date}</td>
      <td>pending</th>
    `;
    data.appendChild(row)
  });
}



fetch('http://localhost:5000/user-count')
  .then(response => response.json())
  .then(data => {
    document.getElementById('userCount').innerText = data.total_users;
  })
  .catch(err => console.error(err));  