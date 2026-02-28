window.onload = function () {

  const form = document.getElementById("form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

     const user = localStorage.getItem("role");

    if (user != "user" && user != "admin") {
      alert("Don't have account! Create account First");
      window.location.href = "../html/loginpage.html";
      return;
    }

    const formData = new FormData();

    formData.append("name", document.getElementById("name").value);
    formData.append("type", document.getElementById("selctitem").value);
    formData.append("email", document.getElementById("email").value);
    formData.append("position", document.getElementById("position").value);
    formData.append("city", document.getElementById("city").value);
    formData.append("landmark", document.getElementById("landmark").value);
    formData.append("address", document.getElementById("address").value);
    formData.append("birthdate", document.getElementById("birthdate").value);
    formData.append("tel", document.getElementById("tel").value);


  
     await fetch("http://localhost:5000/formData",{
      method: 'POST',
      body: formData,
    })
    .then((res)=>res.json())
    .then((data)=>{
      console.log("server response:", data)
    alert(data.message);
    })
   alert('Uploaded')

  });
};
