// Decalre a function that sends message to background service worker
function loadPage() {
  //Send Message to background service worker
  chrome.runtime.sendMessage({ name: "fetchPrepClubWords" }, (response) => {
    //Got the response
    document.title = `${response.word}`;

    const entries = Object.entries(response.definition);

    for (const [speech, definition] of entries) {
      let describe = `${speech}: ${definition}`;

      let test = `<li class="listItem mb-2 lh-sm"><strong class="badge bg-primary bg-gradient text-capitalize fs-6">${speech}</strong><h5 class="fs-5 mt-1"> ${definition}</h5></li>`;
      document.getElementById("insert").innerHTML += test;
    }

    let test1 = `${response.word}  <a target="_blank" class="text-decoration-none" href="${response.link}"><span class="badge  fs-6 rounded-pill bg-danger">📣</a>`;

    //  Update
    document.getElementById("word").innerHTML = test1;
  });
}

//Call the function
loadPage();

let button = document.querySelector(".next");

button.addEventListener("click", function (event) {
  document.getElementById("insert").innerHTML = "";
  loadPage();
});
