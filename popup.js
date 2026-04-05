document.getElementById("play").addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
  // Get text from page
  const result = await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: () => document.body.innerText
  });

  const text = result[0].result;

  chrome.tabs.sendMessage(tab.id, { command: "PLAY", text });
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
