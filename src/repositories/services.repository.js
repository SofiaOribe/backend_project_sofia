import ServiceDao from "../dao/services.mongo.dao.js"

class ServicesRepository {
  constructor(dao = new ServiceDao()) {
    this.dao = dao
  }

  async getServices() {
    return await this.dao.getAll()
  }

  async getServiceById(id) {
    return await this.dao.getById(id)
  }

  async createService(data) {
    return await this.dao.create(data)
  }

  async updateService(id, data) {
    return await this.dao.update(id, data)
  }

  async deleteService(id) {
    return await this.dao.delete(id)
  }
}

export default ServicesRepository
