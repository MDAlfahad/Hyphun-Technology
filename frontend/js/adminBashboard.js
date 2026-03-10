document.addEventListener("DOMContentLoaded", init);

const API_BASE = "http://localhost:5000";
function init() {
  setupNavigation();
  loadFormData();
  loadProfile();
  setupProfileImage();
  setupLogout();
  userDetails();
}

function setupNavigation() {
  const sections = document.querySelectorAll(".content-section");

  const navMap = {
    dashboard: "dashboard-box",
    form: "form-details",
    users: "users-container",
    company: "student-container",
  };

  function showSection(id) {
    sections.forEach((sec) => sec.classList.remove("active"));
    document.getElementById(id).classList.add("active");
  }

  Object.keys(navMap).forEach((btnId) => {
    document.getElementById(btnId).addEventListener("click", () => {
      showSection(navMap[btnId]);
    });
  });

  showSection("dashboard-box");
}

async function loadFormData() {
  try {
    const res = await fetch(`${API_BASE}/formSubData`);
    const data = await res.json();
    renderFormData(data);
  } catch (error) {
    console.error("Error loading form data:", error);
  }
}

function renderFormData(data) {
  const container = document.getElementById("formBoxData");
  container.innerHTML = "";

  data.forEach(({ name, position, date }) => {
    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${name}</td>
        <td>${position}</td>
        <td>${date}</td>
        <td class="approve-btn">Approve</td>
      `;

    container.appendChild(row);
  });
}

function userDetails() {
  fetch(`${API_BASE}/loginData`)
    .then((res) => res.json())
    .then((data) => {
      allData = data;
      showLoginData(allData);
    });
}

function showLoginData(data) {
  const container = document.getElementById("userdata");
  container.innerHTML = "";

  data.forEach(({ email, role, created_at, id, status }) => {
    const row = document.createElement("tr");

    if (role !== "admin") {
      row.innerHTML = `
  <td>${email}</td>
        <td>${role} </td>
        <td>${created_at}</td>
       <td class="status" onclick="togglestatus(${id}, ${status})">
        ${status === 1 ? "Active" : "Inactive"}
        
      </td>
        <td class="delete">Delete</td>
  `;
    }
    container.appendChild(row);
  });
}
function togglestatus(id, status) {
  const newStatus = status === 1 ? 0 : 1;

  fetch(`${API_BASE}/update_user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, status: newStatus }),
  })
    .then((res) => res.json())
    .then((data) => alert(data.message || "Status updated successfully"))
    .catch((err) => console.log("Failed to update data", err));
}

// -----------------logout function----------------------------

function setupLogout() {
  const btn = document.getElementById("logOutbtn");

  btn.addEventListener("click", () => {
    if (localStorage.getItem("role") === "admin") {
      localStorage.removeItem("role");
      window.location.href = "../html/loginpage.html";
    }
  });
}

function setupProfileImage() {
  const image = document.getElementById("img");
  const input = document.getElementById("imageupload");

  const savedImage = localStorage.getItem("profileImage");
  if (savedImage) image.src = savedImage;

  input.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      image.src = reader.result;
      localStorage.setItem("profileImage", reader.result);
    };

    reader.readAsDataURL(file);
  });
}

function saveProfile() {
  const profile = {
    firstname: document.getElementById("firstname").value,
    lastname: document.getElementById("lastname").value,
    email: document.getElementById("email").value,
    gender: document.querySelector('input[name="gender"]:checked')?.value || "",
    address: document.getElementById("address").value,
    phone: document.getElementById("phone").value,
    dob: document.getElementById("Dateofbirth").value,
  };

  localStorage.setItem("adminprofile", JSON.stringify(profile));
  alert("Profile saved!");
}

function loadProfile() {
  const profile = JSON.parse(localStorage.getItem("adminprofile"));

  if (!profile) return;

  document.getElementById("firstname").value = profile.firstname;
  document.getElementById("lastname").value = profile.lastname;
  document.getElementById("email").value = profile.email;
  document.getElementById("address").value = profile.address;
  document.getElementById("phone").value = profile.phone;
  document.getElementById("Dateofbirth").value = profile.dob;
}





// -----------------company form cntaner---------------------




document.getElementById("addcompany").addEventListener("click", ()=>{ 
  document.getElementById("companyform-container").style.display= 'flex'
})

document.getElementById("closebtn").addEventListener("click", ()=>{
  document.getElementById("companyform-container").style.display= 'none'
})

const form = document.getElementById("companyform");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const companydata = {
    name: document.getElementById("companyaname").value.toLowerCase(),
    email: document.getElementById("companyemail").value.toLowerCase(),
    password: document.getElementById("companypass").value.toLowerCase(),
  };

  try {
    const res = await fetch(`${API_BASE}/companyData`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(companydata)
    });

    const data = await res.json();

    alert(data.message || "Uploaded successfully");

  } catch (err) {
    console.error(err);
    alert("Upload failed");
  }
});

function getcompanydata(){
  fetch(`${API_BASE}/companyusersdata`)
  .then((res) => res.json())
  .then((data) => {
    rendercompanyData(data);
  });
}
getcompanydata()

function rendercompanyData(data) {
  const container = document.getElementById("company-data");
  container.innerHTML = "";

  data.forEach((item) => {
    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${item.name}</td>
        <td>${item.email}</td>
        <td>${item.created_at}</td> 
        <td  onclick="checkstatus(${item.id}, ${item.status})">
        ${item.status === 1 ? "Active" : "Inactive"}
      `;

    container.appendChild(row);
  });
}

function checkstatus(id, status) {
  const newStatus = status === 1 ? 0 : 1;

  fetch(`${API_BASE}/update_companyuser`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, status: newStatus }),
  })
    .then((res) => res.json())
    .then((data) => alert(data.message || "Status updated successfully"))
    .catch((err) => console.log("Failed to update data", err) );

    
getcompanydata()

}