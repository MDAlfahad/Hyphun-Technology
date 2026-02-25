
const menuBtn = document.getElementById("bar");
const navSmall = document.querySelector(".mobileRes");
const loginbtn = document.getElementById("login-btn");
const showbtn = document.getElementById('box-container')

document.getElementById("login-btn").addEventListener("click", ()=>{
    showbtn.classList.toggle('hide')

})

document.getElementById("applybtn").addEventListener("click", () => {
  window.location.href = "./html/userInrollForm.html";
});

menuBtn.addEventListener("click", () => {
  if (navSmall.style.transform === "translateX(0%)") {
    navSmall.style.transform = "translateX(100%)";
  } else {
    navSmall.style.transform = "translateX(0%)";
  }

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
        <button onclick="window.location.href = './html/userInrollForm.html'">Apply</button>
        </div>
        `;
      container.appendChild(card);
    });
  });
