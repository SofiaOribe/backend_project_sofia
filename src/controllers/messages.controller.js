
import MessagesService from "../services/messages.service.js"

const messagesServiceInstance = new MessagesService()

class MessagesController {
  static async getConversationsController(req, res, next) {
    try {
      const conversations = await messagesServiceInstance.getConversations()

      return res.status(200).json(conversations)
    } catch (error) {
      return res.status(500).json({
        message: error.message || "Error al obtener las conversaciones",
      })
    }
  }

  static async getConversationByIdController(req, res, next) {
    try {
      const id = req.params.id
      const conversation = await messagesServiceInstance.getConversationById(id)

      return res.status(200).json(conversation)
    } catch (error) {
      return res.status(500).json({
        message:
          error.message ||
          `Error al obtener la conversación con ID: ${req.params.id}`,
      })
    }
  }

  static async sendMessageController(req, res, next) {
    try {
      const userId = req.params.id
      const { userName, ...messageData } = req.body

      const conversation = await messagesServiceInstance.sendMessage(
        userId,
        userName,
        messageData,
      )

      return res.status(200).json({
        message: "Mensaje enviado correctamente",
        conversation,
      })
    } catch (error) {
      return res.status(500).json({
        message: error.message || "Error al enviar el mensaje",
      })
    }
  }
}

export default MessagesController
