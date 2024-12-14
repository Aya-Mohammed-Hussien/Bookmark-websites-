var siteName = document.getElementById("siteName");
var siteUrl = document.getElementById("siteUrl");
var errorUrl = document.querySelector("p");
var siteList = [];

if (localStorage.getItem("favSite") !== null) {
  siteList = JSON.parse(localStorage.getItem("favSite"));
  displaySite();
} else {
  siteList = [];
}

// Function to add site-name & site-url and store the array in local storage
function addSite() {
  var favSite = {
    name: siteName.value,
    url: siteUrl.value,
  };

  if (siteList.some((site) => site.name === favSite.name)) {
    window.alert("This site name exists , PLease choose another name ");
    return;
  } else if (isValidUrl !== siteUrl.value) {
    errorUrl.classList.remove("d-none");
    return;
  }
  siteList.push(favSite);
  localStorage.setItem("favSite", JSON.stringify(siteList));
  displaySite();
  resetSite();
}

// Function to  manipulate the DOM to display the table content.
function displaySite() {
  var bookmarkList = ``;
  for (var i = 0; i < siteList.length; i++) {
    bookmarkList += `<tr class="d-flex flex-row align-items-center justify-content-around border-bottom p-2">
            <td>${i + 1}</td>
            <td class="text-capitalize align-middle">${siteList[i].name}</td>
            <td><button onclick="visitSite(${i})" class="btn btn-visit"><i class="fa-solid fa-eye pe-1"></i>Visit</button></td>
            <td><button onclick="deleteSite(${i})" class="btn btn-delete"><i class="fa-solid fa-trash pe-1"></i>Delete</button></td>
          </tr>`;
  }
  document.getElementById("tableBody").innerHTML = bookmarkList;
}

// Function to reset form
function resetSite() {
  siteName.value = "";
  siteUrl.value = "";
}

// Function to delete & store the new array in the local storage to display it whenever you open the page
function deleteSite(index) {
  siteList.splice(index, 1);
  displaySite();
  localStorage.setItem("favSite", JSON.stringify(siteList));
}

// Function to visit site and open it in a new tab
function visitSite(index) {
  window.open(siteList[index].url, "_blank");
}
// Function to validate url of the website

var isValidUrl;
function validateUrl() {
  var urlRegex =
    /^(https?:\/\/)(?:www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(?:\/[^\s]*)?$/;
  if (siteUrl.value.length === 0) {
    siteUrl.classList.remove("is-invalid", "is-valid");
    return;
  }
  isValidUrl = urlRegex.test(siteUrl.value);
  if (isValidUrl) {
    siteUrl.classList.remove("is-invalid");
    siteUrl.classList.add("is-valid");
  } else {
    siteUrl.classList.add("is-invalid");
    siteUrl.classList.remove("is-valid");
  }
}
siteUrl.addEventListener("input", validateUrl);
