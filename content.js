let utterance = null;
let rate = 1;
let currentText = "";

function startSpeech(text, speed = 1) {

  chrome.runtime.sendMessage({
    type: "START_STREAM",
    text: document.body.innerText.slice(0, 1000) // limit to first 1000 chars for now
  });
}

function pauseSpeech() {
  if (speechSynthesis.speaking) speechSynthesis.pause();
}

function resumeSpeech() {
  if (speechSynthesis.paused) speechSynthesis.resume();
}

function changeRate(newRate) {
  console.log("Changing rate to:", newRate);
  rate = newRate;
  if (utterance) {
    startSpeech(currentText, rate);
  }
}

// Listen for messages from popup
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  switch(msg.command) {
    case "PLAY":
      startSpeech(msg.text, rate);
      break;
    case "PAUSE":
      pauseSpeech();
      break;
    case "RESUME":
      resumeSpeech();
      break;
    case "RATE":
      changeRate(msg.value);
      break;
    default:
      console.log("Unknown command:", msg.command);
  }
});