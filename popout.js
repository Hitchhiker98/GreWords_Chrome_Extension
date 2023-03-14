// Grabbing appropriate HTML elements
let word = document.getElementById("word");
let badge = document.getElementById("badge");
let definition = document.getElementById("definition");
let example = document.getElementById("example");


function getWords() {
  chrome.runtime.sendMessage({ name: "fetchMagooshWords" }, (response) => {
    //Waits for the response

    word.innerHTML = response.word;
    badge.innerHTML = response.partOfSpeech;
    definition.innerHTML = response.definition;
    if (response.example) {
      example.innerHTML = response.example
    }

    console.log(response, "check thus");
   
  });
}

getWords();

// Add onclick event listener on the button that updates the word
let button = document.getElementById("button");
button.addEventListener("click", getWords);

// Check if extension pinned and if not update h1
(async function checkIsPinned() {
  let userSettings = await chrome.action.getUserSettings();
  if (!userSettings.isOnToolbar) {
    document.querySelector("h3").innerText =
      "Pin our extension for more use 🍓";
  }
})()

