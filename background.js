let socket;

function connectWebSocket() {
  socket = new WebSocket("ws://localhost:3000");
  socket.binaryType = "arraybuffer";
  socket.onmessage = (event) => {
    if (typeof event.data === "string") {
      const msg = JSON.parse(event.data);
      if (msg.type === "END") {
        console.log("Stream finished");
        return;
      }
      return;
    }
    const buffer = event.data; // already ArrayBuffer
    const blob = new Blob([buffer], { type: "audio/mpeg" });
    chrome.runtime.sendMessage({
      type: "PLAY_CHUNK",
      blob
    });
  };
}

function startStreaming(text) {
  if (socket?.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify({ text }));
  } else {
    connectWebSocket();

    socket.onopen = () => {
      socket.send(JSON.stringify({ text }));
    };
  }
}

chrome.runtime.onMessage.addListener(async (msg, sender) => {
  if (msg.type === "START_STREAM") {
    startStreaming(msg.text);
  }
});