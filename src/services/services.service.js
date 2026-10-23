import ServicesRepository from "../repositories/services.repository.js"

class ServicesService {
  constructor(repository = new ServicesRepository()) {
    this.repository = repository
  }

  async getServices() {
    return await this.repository.getServices()
  }

  async getServicesPaginated(query) {
    return await this.repository.getServicesPaginated(query)
  }

  async getServiceById(id) {
    const service = await this.repository.getServiceById(id)
    if (!service) throw new Error(`The service with ${id} was not found`)
    return service
  }

  async createService(data) {
    const { name, description, duration, price, category, available } = data

    return await this.repository.createService({
      name,
      description,
      duration,
      price,
      category,
      available,
    })
  }

  async updateService(id, data) {
    const service = await this.repository.getServiceById(id)
    if (!service) throw new Error(`Service with ID ${id} not found`)
    const updatedService = await this.repository.updateService(id, data)
    return updatedService
  }

  async deleteService(id) {
    const service = await this.repository.getServiceById(id)
    if (!service) throw new Error(`Service with ID ${id} not found`)
    const deletedService = await this.repository.deleteService(id)
    return deletedService
  }
}

export default ServicesService
