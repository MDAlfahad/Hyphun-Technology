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

