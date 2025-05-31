var allSite = JSON.parse(localStorage.getItem("site")) || [];
var btnAdd = document.getElementById("addSite");

var siteName = document.getElementById("book-mark");
var siteUrl = document.getElementById("Website-url");

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
  var regex = /\w{3,}\.(com|net|org)\/?$/;

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


  siteName.style.border = "";
  siteUrl.style.border = "";

  if (siteName.value === "" || siteUrl.value === "") {
    alert("Please fill in all fields");

    return;
  }

  if (siteName.value.length < 3) {
    alert("Site Name must be 3 characters or more");
    siteName.style.border = "2px solid red";
    return;
  }

  var site = {
    id: currentIndex === -1 ? allSite.length + 1 : allSite[currentIndex].id, 
       name: siteName.value,
    url: siteUrl.value,
  };

if (currentIndex === -1) {
    // إضافة عنصر جديد
    allSite.push(site);
  } else {
    // تعديل عنصر موجود
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
