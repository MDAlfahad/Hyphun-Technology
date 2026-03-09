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
      <h1>Title: ${items.title}</h1>
      <p>Company Name: ${items.companyName}</p>
      <p>Experience: ${items.experience}</p>
      <p>Job Type: ${items.jobType}</p>
      <p>Location: ${items.location}</p>
      <p>Skills Required: ${items.skills}</p>
      <p>Description: ${items.description}</p>
      <p>About Company: ${items.aboutcompany}</p>
      <p>Other Requirements: ${items.requirement}</p>
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
