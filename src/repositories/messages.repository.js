import MessagesDao from "../dao/messages.mongo.dao.js"

class MessagesRepository {
  constructor(dao = new MessagesDao()) {
    this.dao = dao
  }

  async getConversations() {
    return await this.dao.getAll()
  }

  async getConversationById(id) {
    return await this.dao.getById(id)
  }

  async createConversation(data) {
    return await this.dao.create(data)
  }

  async updateConversation(id, data) {
    return await this.dao.update(id, data)
  }
}

export default MessagesRepository
