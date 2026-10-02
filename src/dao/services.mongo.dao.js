import serviceModel from "../models/services.model.js"

class ServiceDao {
  async getAll() {
    return await serviceModel.find({})
  }

  async getById(id) {
    return await serviceModel.findById(id)
  }

  async create(data) {
    return await serviceModel.create(data)
  }

  async update(id, updatedData) {
    return await serviceModel.findByIdAndUpdate(id, updatedData)
  }

  async delete(id) {
    return await serviceModel.findByIdAndDelete(id)
  }
}

export default ServiceDao
