document.addEventListener("DOMContentLoaded", init);

const API_BASE = "http://localhost:5000";

function init() {
  setupNavigation();
  loadFormData();
  loadUsers();
  loadProfile();
  setupProfileImage();
  setupLogout();
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

async function loadUsers() {
  try {
    const res = await fetch(`${API_BASE}/loginData`);
    const users = await res.json();
    renderUsers(users);
  } catch (error) {
    console.error("Error loading users:", error);
  }
}

function renderUsers(users) {
  const container = document.getElementById("userdata");
  container.innerHTML = "";

  const deactivated = JSON.parse(localStorage.getItem("deactivatedUsers")) || [];

  users.forEach(({ name, email, created_at }) => {
    const row = document.createElement("tr");

    const status = deactivated.includes(email) ? "Deactive" : "Active";

    row.innerHTML = `
      <td>${name}</td>
      <td class="email">${email}</td>
      <td>${created_at}</td>
      <td class="status-btn" style="cursor:pointer;background:#8db0b6;color:white">
        ${status}
      </td>
    `;

    const btn = row.querySelector(".status-btn");

    btn.addEventListener("click", () => toggleUserStatus(email, btn));

    container.appendChild(row);
  });
}

function toggleUserStatus(email, btn) {
  let deactivated = JSON.parse(localStorage.getItem("deactivatedUsers")) || [];

  if (btn.innerText === "Active") {
    btn.innerText = "Deactive";
    deactivated.push(email);
  } else {
    btn.innerText = "Active";
    deactivated = deactivated.filter((e) => e !== email);
  }

  localStorage.setItem("deactivatedUsers", JSON.stringify(deactivated));
}

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