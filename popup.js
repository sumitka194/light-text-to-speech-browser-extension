document.getElementById("play").addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["content.js"]
  });
});

document.getElementById("pause").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      func: () => speechSynthesis.pause()
    });
  });
});

document.getElementById("speed").addEventListener("change", (e) => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      func: (speed) => {
        speechSynthesis.rate = speed;
      },
      args: [parseFloat(e.target.value)]
    });
  });
});