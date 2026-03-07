
const image = document.getElementById("img");
const input = document.getElementById("imageupload");

const saved = localStorage.getItem("profileImage");
if (saved) image.src = saved;

input.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();

  reader.onload = function () { 
    const dataUrl = reader.result;

    image.src = dataUrl;

    localStorage.setItem("profileImage", dataUrl);
  };
  reader.readAsDataURL(file);
});


document.getElementById('logoutbtn').addEventListener("click", ()=>{

  const role = localStorage.getItem('role')
  
if(role === "user" || role ==="admin"){
localStorage.removeItem("role")
window.location.href = "../index.html"
}
})




function saveProfile() {
  const firstname = document.getElementById("firstname").value;
  const lastname = document.getElementById("lastname").value;
  const email = document.getElementById("email").value;
  const male = document.getElementById("male").value;
  const female = document.getElementById("female").value;
  const address = document.getElementById("address").value;
  const phone = document.getElementById("phone").value;
  const Dateofbirth = document.getElementById("Dateofbirth").value;
  
  const data = {
    firstname : firstname,
    lastname : lastname,
    email: email,
    male : male,
    female: female,
    address: address,
    phone: phone,
    Dateofbirth: Dateofbirth
  }

  localStorage.setItem("userporfileData", JSON.stringify(data));


  alert("Profile saved!");
}

function loadProfile() {
  const userprofiledata = JSON.parse(localStorage.getItem("userporfileData"))
  const discard = document.getElementById("activebtn")
  if (userprofiledata) {
    document.getElementById("firstname").value = userprofiledata.firstname;
    document.getElementById("lastname").value = userprofiledata.lastname;
    document.getElementById("email").value = userprofiledata.email;
    document.getElementById("male").value = userprofiledata.male;
    document.getElementById("female").value = userprofiledata.female;
    document.getElementById("address").value = userprofiledata.address;
    document.getElementById("phone").value = userprofiledata.address;
    document.getElementById("Dateofbirth").value = userprofiledata.Dateofbirth;
  } else if(discard){
    alert("Profile Not Saved")
  }
  
}

window.onload = loadProfile;



addEventListener("DOMContentLoaded", (event)=>{
  const profilebtn = document.getElementById("prfilebtn");
  const formbtn = document.getElementById("formbtn");
  const helpbtn = document.getElementById("helpbtn");
  const privacybtn = document.getElementById("privacybtn");


  const profile = document.getElementById("profileContainer");
  const form = document.getElementById("showFormContainer");
  const help = document.getElementById("contactSection");
  const privacy = document.getElementById("privavyContainer"); 
  const allSection = document.querySelectorAll('.content-section')

  function hideAll(){
    allSection.forEach((section)=>{
      section.classList.remove("active");
    });
  }

  profile.classList.add('active');

  profilebtn.addEventListener("click", ()=>{
    hideAll()
    profile.classList.add("active")
  })
  formbtn.addEventListener("click", ()=>{
    hideAll()
    form.classList.add("active")
  })
  helpbtn.addEventListener("click", ()=>{
    hideAll()
    help.classList.add("active")
  })
  privacybtn.addEventListener("click", ()=>{
    hideAll()
    privacy.classList.add("active")
  })

})