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
    <p>${items.skills}</p>
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
