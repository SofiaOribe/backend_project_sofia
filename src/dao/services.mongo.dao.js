import serviceModel from "../models/services.model.js"

class ServiceDao {
  async getServicesPaginated(query = {}) {
    const page = Math.max(1, Number.parseInt(query?.page, 10) || 1)

    return await serviceModel.paginate(
      {},
      {
        limit: 10,
        page,
        lean: true,
      },
    )
  }
  async getAll() {
    return await serviceModel.find().lean()
  }

  async getById(id) {
    return await serviceModel.findById(id).lean()
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
