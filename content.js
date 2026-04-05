function getPageText() {
  return document.body.innerText;
}

function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  speechSynthesis.speak(utterance);
}

const text = getPageText().slice(0, 500); // limit for now
speak(text);