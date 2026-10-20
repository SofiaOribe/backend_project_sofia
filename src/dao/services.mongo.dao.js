import serviceModel from "../models/services.model.js"

class ServiceDao {
  async getServicesPaginated(query = {}) {
    console.log("DAO EJECUTADO")
    console.log("Query recibida:", query)
    return await serviceModel.paginate(
      {
        ...(query.name ? { name: { $regex: query.name, $options: "i" } } : {}),
        ...(query.available !== undefined
          ? { available: query.available === "true" || query.available === true }
          : {}),
        ...(query.category ? { category: query.category } : {}),
      },
      {
        limit: query.limit || 10,
        page: query.page || 1,
        sort: query.sortBy ? { [query.sortBy]: query.order === "desc" ? -1 : 1 } : {},
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
