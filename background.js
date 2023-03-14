import { prepClubList } from "./PrepClub.js";
import { magooshList } from "./Magoosh.js";

// Number of Magoosh words
const magooshWords = 1066;

// Number of PrepClub words
const prepClubWords = 841;


// Function for getting a random number between 0 - (number-1)
function getRandomNumber(number) {
  return Math.floor(Math.random() * number);
}

// Function for capitalizing strings
function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

try {
  //Listen for messages
  chrome.runtime.onMessage.addListener(async (msg, sender, response) => {
    if (msg.name === "fetchPrepClubWords") {

      let randomNumber = getRandomNumber(prepClubWords);
  
      let word = capitalize(prepClubList[randomNumber].word);
      let link = prepClubList[randomNumber].link;
      let definition = prepClubList[randomNumber].definition;

      //Replace ' to " in definition string to make it a valid JSON 
      definition = definition.replace(/'/g, '"');
    
      //Use JSON parse to get an object
      let definitionObj = JSON.parse(definition);

      //Send response
      response({ word: word, definition: definitionObj, link: link });

    } else if (msg.name === "fetchMagooshWords") {
      
      let randomNumber = getRandomNumber(magooshWords);

      let word = magooshList[randomNumber].word;
      let partOfSpeech = magooshList[randomNumber].partOfSpeech;
      let definition = capitalize(magooshList[randomNumber].definition);
      let example = magooshList[randomNumber].example;

      //Send response
      response({
        word: word,
        partOfSpeech: partOfSpeech,
        definition: definition,
        example: example,
      });
    }
  });
} catch (e) {
  console.log("Check the error", e);
}
