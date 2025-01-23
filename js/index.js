var siteName = document.getElementById("siteName");
var siteUrl = document.getElementById("siteUrl");
var errorUrl = document.querySelector("p");
var siteList = [];

if (localStorage.getItem("favSite") !== null) {
  siteList = JSON.parse(localStorage.getItem("favSite"));
  displaySite();
  console.log(siteList)
} 

// Function to add site-name & site-url and store the array in local storage
function addSite() {
  if (!siteName.value.trim() && !siteUrl.value.trim()) {
    window.alert("Please fill in both fields.");
    return;
  } else if (!siteName.value.trim()) {
    window.alert("Please fill in the site name.");
    return;
  } else if (!siteUrl.value.trim()) {
    window.alert("Please fill in the site URL.");
    return;
  }
  var favSite = {
    name: siteName.value,
    url: siteUrl.value,
  };

  if (siteList.some((site) => site.name === favSite.name)) {
    window.alert("This site name exists , PLease choose another name ");
    return;
  } else if (!isValidUrl) {
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
    bookmarkList += `<tr class=" border-bottom p-2">
            <td class="text-center align-middle">${i + 1}</td>
            <td class="text-center text-capitalize align-middle">${siteList[i].name}</td>
            <td class="text-center align-middle" ><button onclick="visitSite(${i})" class="btn btn-visit "><i class="fa-solid fa-eye pe-1"></i>Visit</button></td>
            <td class="text-center align-middle" ><button onclick="deleteSite(${i})" class="btn btn-delete"><i class="fa-solid fa-trash pe-1"></i>Delete</button></td>
          </tr>`;
  }
  document.getElementById("tableBody").innerHTML = bookmarkList;
  siteUrl.classList.remove("is-invalid", "is-valid");
}

// Function to reset form
function resetSite() {
  siteName.value = "";
  siteUrl.value = "";
}

// Function to delete & store the new array in the local storage to display it whenever you open the page
function deleteSite(index) {
  if (window.confirm("Are you sure you want to delete this site?")) {
    siteList.splice(index, 1);
    displaySite();
    localStorage.setItem("favSite", JSON.stringify(siteList));
  }
}

// Function to visit site and open it in a new tab
function visitSite(index) {
  let url = siteList[index].url;
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    url = "https://" + url;
  }
  window.open(url, "_blank");
}
// Function to validate url of the website
var isValidUrl;
function validateUrl() {
  var urlRegex =
    /^(https?:\/\/)(?:www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(?:\/[^\s]*)?\s*$/;
  if (siteUrl.value.length === 0) {
    siteUrl.classList.remove("is-invalid", "is-valid");
    errorUrl.classList.add("d-none")
    return;
  }
  isValidUrl = urlRegex.test(siteUrl.value);
  if (isValidUrl) {
    siteUrl.classList.remove("is-invalid");
    siteUrl.classList.add("is-valid");
    errorUrl.classList.add("d-none");
  } else {
    siteUrl.classList.add("is-invalid");
    siteUrl.classList.remove("is-valid");
    errorUrl.classList.remove("d-none");
  }
}
siteUrl.addEventListener("input", validateUrl);






