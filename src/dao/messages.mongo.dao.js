import messagesModel from "../models/massages.model.js"

class MessageDao {
  async getAll() {
    return await messagesModel.find({}).lean()
  }

  async getById(id) {
    return await messagesModel.findById(id).lean()
  }

  async create(data) {
    return await messagesModel.create(data)
  }

  async update(id, messageData) {
    return await messagesModel.findByIdAndUpdate(
      id,
      {
        $push: { messages: messageData },
      },
      { new: true, runValidators: true },
    )
  }
}

export default MessageDao
