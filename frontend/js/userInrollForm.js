window.onload = function () {

  const form = document.getElementById("form");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

     const user = localStorage.getItem("role");

    if (user != "user" && user != "admin") {
      alert("Don't have account! Create account First");
      window.location.href = "../html/loginpage.html";
      return;
    }

    const formData = {
      name: document.getElementById("name").value,
      type: document.getElementById("selctitem").value,
      email: document.getElementById("email").value,
      position: document.getElementById("position").value,
      city: document.getElementById("city").value,
      landmark: document.getElementById("landmark").value,
      address: document.getElementById("address").value,
      birthdate: document.getElementById("birthdate").value,
      tel: document.getElementById("tel").value,
      choosefile: document.getElementById("choosefile").files[0]?.name,
      id: new Date().toDateString(),
    };
   
    
    window.location.href = "../index.html";
  });
};
