let isPlaying = false;
const audioQueue = [];

chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type === "PLAY_CHUNK") {
    audioQueue.push(msg.blob);

    if (!isPlaying && audioQueue.length > 2) {
      playNext();
    }
  }
});

function playNext() {
  if (audioQueue.length === 0) {
    isPlaying = false;
    return;
  }

  isPlaying = true;

  const blob = audioQueue.shift();
  const url = URL.createObjectURL(blob);

  const audio = new Audio(url);
  audio.onended = () => {
    URL.revokeObjectURL(url);
    playNext();
  };
  audio.play().catch(err => console.error("Audio play error:", err));
}

document.getElementById("play").addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
  // Get text from page
  // const result = await chrome.scripting.executeScript({
  //   target: { tabId: tab.id },
  //   func: () => document.body.innerText
  // });

  // const text = result[0].result;

  chrome.tabs.sendMessage(tab.id, { command: "PLAY" });
});

document.getElementById("pause").addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.tabs.sendMessage(tab.id, { command: "PAUSE" });
});

document.getElementById("resume").addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.tabs.sendMessage(tab.id, { command: "RESUME" });
});

document.getElementById("speedRange").addEventListener("change", async (e) => {
  console.log("Speed changed to:", e.target.value);
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.tabs.sendMessage(tab.id, { command: "RATE", value: parseFloat(e.target.value) });
});
