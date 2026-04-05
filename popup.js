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

document.getElementById("speed").addEventListener("change", async (e) => {
  // add way to change the selected properties in the options of select in html tag in popup.html
  const options = document.getElementById("speed").options;
  for (const option of options) {
    option.selected = option.value === e.target.value;
  }
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.tabs.sendMessage(tab.id, { command: "RATE", value: parseFloat(e.target.value) });
});
