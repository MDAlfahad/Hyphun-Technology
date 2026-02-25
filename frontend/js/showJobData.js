const params = new URLSearchParams(window.location.search);

const id = params.get("id");
console.log("id", id);

const posts = JSON.parse(localStorage.getItem("jobData") || []);

const post = posts.find((p) => p.title == id);
console.log(post);
if (post) {
  document.getElementById("heading").textContent = post.title;
  document.getElementById("head").textContent = post.title;
  document.getElementById("company").textContent = post.companyName;
  document.getElementById("experience").textContent = post.experience;
  document.getElementById("anuual").textContent = post.package;
  document.getElementById("date").textContent = post.startdate;
  document.getElementById("applydate").textContent = post.applydate;
  document.getElementById("type").textContent = post.type;
  document.getElementById("requirement").textContent = post.requirement;
  document.getElementById("jobdetails").textContent = post.description;
  document.getElementById("skills").textContent = post.skills;
  document.getElementById("location").textContent = post.location;
}

document.getElementById("applybtn").addEventListener("click",()=>{


window.location.href = '../html/userInrollForm.html'




})