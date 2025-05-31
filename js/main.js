var allSite = JSON.parse(localStorage.getItem("site")) || [];
var btnAdd = document.getElementById("addSite");
var btnReset=document.getElementById("reset");



var siteName = document.getElementById("book-mark");
var siteUrl = document.getElementById("Website-url");

  var regex = /^(https?:\/\/)?(www\.)?\w{2,}\.(com|net|org)\/?$/;

  btnReset.addEventListener("click",function(){

    siteName.value="";
    siteUrl.value="";
      siteName.style.border = "";
  siteUrl.style.border = "";

})
siteName.addEventListener("input", function () {
  if (siteName.value.trim() == "") {
    siteName.style.border = "";
  } else if (siteName.value.trim().length < 3) {
    siteName.style.border = "3px solid red";
  } else {
    siteName.style.border = "3px solid green";
  }
});
siteUrl.addEventListener("input", function () {

  if (siteUrl.value.trim() == "") {
    siteUrl.style.border = "";
  } else if (regex.test(siteUrl.value)) {
    siteUrl.style.border = "3px solid green";
  } else {
    siteUrl.style.border = "3px solid red";
  }
});


var currentIndex = -1;
btnAdd.onclick = function () {




  if (siteName.value === "" || siteUrl.value === "") {
    showModal("Please fill in all fields");
    return;
  }

  if (siteName.value.length < 3) {
    showModal("Site Name must be 3 characters or more");    siteName.style.border = "2px solid red";
    return alert("wrong URL");
  }

  var site = {
    id: currentIndex === -1 ? allSite.length + 1 : allSite[currentIndex].id, 
       name: siteName.value,
    url: siteUrl.value,
  };
  if (!regex.test(siteUrl.value)) {
        showModal("Please enter a valid URL ending with .com, .net or .org");
return;
}

if (currentIndex === -1) {
    allSite.push(site);
  } else {
    allSite[currentIndex] = site;
    currentIndex = -1;
    btnAdd.textContent = "Submit";
  }  localStorage.setItem("site", JSON.stringify(allSite));
  displaySite();

  siteName.value = "";
  siteUrl.value = "";
};

function displaySite() {
  x = "";
  y = allSite.map((site, index) => {
    x += `
    
    <tr>
    <td> ${site.id}</td>
    <td> ${site.name}</td>
        <td><a href="${site.url}" target="_blank" class="btn btn-success">Visit</a></td>
            <td> <button onClick="removeSite(${index})" class = "btn btn-danger">Delete</button>
                              <button onClick="editSite(${index})" class="btn btn-warning ms-2">Edit</button>

            </td>
    </tr>
    
    `;
  });
  document.getElementById("content").innerHTML = x;
}

function removeSite(index) {
  allSite.splice(index, 1);
  localStorage.setItem("site", JSON.stringify(allSite));
  displaySite();
}
displaySite();
function editSite(index) {
  siteName.value = allSite[index].name;
  siteUrl.value = allSite[index].url;
  currentIndex = index;
  btnAdd.textContent = "Update";
}



function showModal(message) {
  document.getElementById("modalMsg").textContent = message;
  var modal = new bootstrap.Modal(document.getElementById("errorModal"));
  modal.show();
}


