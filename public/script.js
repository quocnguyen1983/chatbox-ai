async function sendMessage() {
  const input = document.getElementById("user-input");
  const chatBox = document.getElementById("chat-box");

  const userText = input.value;
  if (!userText) return;

  chatBox.innerHTML += `<div class="user">Bạn: ${userText}</div>`;
  input.value = "";

  const loadingId = "loading";
  chatBox.innerHTML += `<div class="bot" id="${loadingId}">AI đang suy nghĩ...</div>`;

  const response = await fetch("/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: userText })
  });

  const data = await response.json();

  document.getElementById(loadingId).remove();
  chatBox.innerHTML += `<div class="bot">AI: ${data.reply}</div>`;

  chatBox.scrollTop = chatBox.scrollHeight;
}
