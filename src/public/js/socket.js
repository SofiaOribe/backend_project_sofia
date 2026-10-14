/* global io, document, window */
const socket = io()

// Chat
const sendBtn = document.getElementById("sendBtn")
const chatInput = document.getElementById("chatInput")
const messagesList = document.getElementById("messages")

sendBtn.addEventListener("click", () => {
  const message = chatInput.value

  if (message.trim() !== "") {
    socket.emit("mensaje_cliente", message)
    chatInput.value = ""
  }
})

socket.on("mensaje_servidor", (data) => {
  const li = document.createElement("li")
  li.textContent = data
  messagesList.appendChild(li)
})
