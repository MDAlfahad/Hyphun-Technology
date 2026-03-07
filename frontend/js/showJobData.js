let allData = [];

// Fetch all job data from server
fetch("http://localhost:5000/jobdata")
  .then((res) => res.json())
  .then((data) => {
    allData = data;
    showJobDetails(allData);
  })
  .catch((err) => console.error("Error fetching job data:", err));


function showJobDetails(data) {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  const post = data.find((p) => p.title === id);

  if (post) {
    document.getElementById("heading").textContent = post.title;
    document.getElementById("head").textContent = post.title;
    document.getElementById("company").textContent = post.companyName;
    document.getElementById("experience").textContent = post.experience;
    document.getElementById("amount").textContent = post.amount;
    document.getElementById("date").textContent = post.startDate;
    document.getElementById("applydate").textContent = post.applydate;
    document.getElementById("type").textContent = post.jobType;
    document.getElementById("requirement").textContent = post.requirement;
    document.getElementById("jobdetails").textContent = post.description;
    document.getElementById("skills").textContent = post.Skills;
    document.getElementById("location").textContent = post.location;

    document.getElementById("applybtn").addEventListener("click", () => {
      localStorage.setItem("selectedJob", JSON.stringify(post));
      // window.location.href = '../html/userInrollForm.html';
      alert("Applied Sucessfully")
      window.location.href = '../html/jobportal.html'
    });
  } else {
    console.warn("Job not found for id:", id);
  }
}