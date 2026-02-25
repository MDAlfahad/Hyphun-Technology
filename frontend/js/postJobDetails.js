window.onload = function () {
  document.getElementById("postjob").addEventListener("click", () => {
    document.getElementById("jobform").style.display = "flex";
  });

  document.getElementById("closebtn").addEventListener("click", () => {
    document.getElementById("jobform").style.display = "none";
  });

  const form = document.getElementById("jobform");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const jobData = {
      title: document.getElementById("title").value,
      companyName: document.getElementById("companyName").value,
      // experience: document.getElementById("experience").value,
      // startdate: document.getElementById("startDate").value,
      // package: document.getElementById("package").value,
      type: document.getElementById("jobType").value,
      location: document.getElementById("location").value,
      // skills: document.getElementById("skills").value,
      // description: document.getElementById("description").value,
      // requirement:document.getElementById("requirement").value,
      // applydate: document.getElementById('applydate').value,
      // aboutcompany: document.getElementById("aboutcompany").value,
      // postData: new Date().toLocaleDateString(),
    };

    fetch('http://localhost:5000/add-job', {
      method: "POST", 
      headers: {
      "Content-Type": "application/json"
      },
      body: JSON.stringify(jobData)
    })
    .then(res =>res.text())
    .then(msg=> alert(msg));
  });

};

//   const jobList = document.getElementById("postedJobData");
//   const JobListData = JSON.parse(localStorage.getItem("jobData")) || [];

//   function ShowJobList(data) {
//     jobList.innerHTML = " ";

//     data.forEach((items) => {
//       let divdata = document.createElement("div");
//       divdata.innerHTML += `
//     <h1>Title: ${items.title}</h1>
//     <p>Company Name: ${items.companyName}</p>
//     <p>Experience: ${items.experience}</p>
//     <p>Job Type: ${items.type}</p>
//     <p>Location: ${items.location}</p>
//     <p>Skills Required: ${items.skills}</p>
//     <p>Description: ${items.description}</p>

//     `;
//       jobList.appendChild(divdata);
//     });
//   }
//   ShowJobList(JobListData);

//   const jobTypeFilter = document.getElementById("jobTypeFilter");

//   jobTypeFilter.addEventListener("change", (e) => {
//     const JoblistData = e.target.value;
//     if (JoblistData === "") {
//       ShowJobList(JobListData);
//     } else {
//       const filtered = JobListData.filter((job) => job.type === JoblistData);
//       ShowJobList(filtered);
//     }
//   });

//   const searchInput = document.getElementById("searchbar");

//   searchInput.addEventListener("input", (e) => {
//     const searchValue = e.target.value.toLowerCase();

//     const filterdSearchValue = JobListData.filter(
//       (job) =>
//         job.title.toLowerCase().includes(searchValue) ||
//         job.type.toLowerCase().includes(searchValue) ||
//         job.skills.toLowerCase().includes(searchValue),
//     );

//     ShowJobList(filterdSearchValue);
//   });
// };
