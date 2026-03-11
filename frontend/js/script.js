const menuBtn = document.getElementById("bar");
const navSmall = document.querySelector(".mobileRes");
const loginbtn = document.getElementById("login-btn");
const showbtn = document.getElementById("box-container");

document.getElementById("login-btn").addEventListener("click", () => {
  window.location.href = './html/loginpage.html'
});

document.getElementById("applybtn").addEventListener("click", () => {
  window.location.href = "./html/jobportal.html";
});

document.getElementById("bar").addEventListener("click", () => {
  document.querySelector(".mobileRes").classList.toggle("show");
});

fetch("companies.json")
  .then((response) => response.json())
  .then((data) => {
    const container = document.getElementById("companylist");

    data.forEach((company) => {
      const card = document.createElement("div");
      card.classList.add("companyCard");

      card.innerHTML = `
        <img src="${company.img}" alt="Company Logo" class="companyLogo">
        <hr>
        <p>${company.description}</p>
        <h4>Open Positions:</h4>
        <ul>
          ${company.positionsRequired
            .map(position => `<li>${position}</li>`)
            .join("")}
        </ul>
        <button onclick="window.location.href='#'">Apply</button>
      `;

      container.appendChild(card);
    });
  })

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

let allData = [];
fetch("http://localhost:5000/jobdata")
  .then((res)=>res.json())
  .then((data=>{
    allData = data
    renderData(allData);
  }))

  function renderData(dataToDisplay){
  const container = document.getElementById("joblist-card");
  container.innerHTML = "";

  dataToDisplay.forEach(items => {
    const card = document.createElement("div");
    card.classList.add("job-card");

    card.innerHTML = `
      <h1>${items.title}</h1>
      <p>${items.companyName}</p>
      <h2>${items.jobType}</h2>
      <h2>₹${items.amount}</h2>
      <p>${items.Skills}</p>
      <button id='buttonbtn'>View Details</button>
    `;
    container.appendChild(card);

    document.getElementById("buttonbtn").addEventListener("click",  ()=>{
      window.location.href =`./html/showJobData.html?id=${items.title}`;
    });
    
  });
}

const container = document.getElementById("joblist-card");

function scrollLeft() {
  container.scrollBy({ left: -320, behavior: "smooth" });
}
function scrollRight() {
  container.scrollBy({ left: 320, behavior: "smooth" });
}

function updateActiveCard() {
  const cards = document.querySelectorAll(".job-card");
  const containerCenter = container.scrollLeft + container.offsetWidth / 2;

  cards.forEach(card => card.classList.remove("active"));

  let closestCard = null;
  let closestDistance = Infinity;

  cards.forEach(card => {
    const cardCenter = card.offsetLeft + card.offsetWidth / 2;
    const distance = Math.abs(containerCenter - cardCenter);
    if (distance < closestDistance) {
      closestDistance = distance;
      closestCard = card;
    }
  });

  if (closestCard) closestCard.classList.add("active");
}


container.addEventListener("scroll", updateActiveCard);
setTimeout(updateActiveCard, 100); 


// -------------------contactsection------------------- 
const contactform = document.getElementById("contactForm");

contactform.addEventListener("submit", (e)=>{
  e.preventDefault();

  const contactData = {
    name: document.getElementById("contactname").value,
    email: document.getElementById("contactemail").value,
    phone: document.getElementById("contactphone").value,
    textarea: document.getElementById("contacttext").value,
  }

  localStorage.setItem("contactform", JSON.stringify(contactData)) || []

  alert('Form Submitted Sucessfully ')
  location.reload()
})
