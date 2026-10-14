import MessagesRepository from "../repositories/messages.repository.js"

class MessagesService {
  constructor(repository = new MessagesRepository()) {
    this.repository = repository
  }

  async getConversations() {
    return await this.repository.getConversations()
  }
  async getConversationById(id) {
    const conversation = await this.repository.getConversationById(id)
    if (!conversation) throw new Error(`La conversacion con ${id} no fue encontrada`)
    return conversation
  }

  async sendMessage(userId, userName, messageData) {
    const { sender, text } = messageData

    if (!userId || !userName || !sender || !text?.trim()) {
      throw new Error("Faltan datos obligatorios para enviar el mensaje")
    }

    const conversation = await this.repository.getConversationById(userId)

    if (!conversation) {
      return await this.repository.createConversation({
        _id: userId,
        user: userName,
        admin: "Admin",
        messages: [
          {
            sender,
            text: text.trim(),
            createdAt: new Date(),
          },
        ],
      })
    }

    return await this.repository.updateConversation(userId, {
      sender,
      text: text.trim(),
      createdAt: new Date(),
    })
  }
}

export default MessagesService
