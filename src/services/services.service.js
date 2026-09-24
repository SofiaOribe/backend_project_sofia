import ServicesRepository from "../repositories/services.repository.js"

class ServicesService {
  constructor(repository = new ServicesRepository()) {
    this.repository = repository
  }

  async getServices() {
    return await this.repository.getServices()
  }
  async getServiceById(id) {
    const service = await this.repository.getServiceById(id)
    if (!service) throw new Error(`El servicio con ${id} no fue encontrado`)
    return service
  }

  async createService(data) {
    const { name, description, duration, price, category, available } = data
    if (!name || !description || !duration || !price || !category || available === undefined) {
      throw new Error("Faltan datos obligatorios para crear el servicio")
    }
    if (price < 0) {
      throw new Error("El precio no puede ser negativo")
    }
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
    if (!service) throw new Error(`Servicio con ID ${id} no encontrado`)
    const updatedService = await this.repository.updateService(id, data)
    return updatedService
  }

  async deleteService(id) {
    const service = await this.repository.getServiceById(id)
    if (!service) throw new Error(`Servicio con ID ${id} no encontrado`)
    const deletedService = await this.repository.deleteService(id)
    return deletedService
  }
}

export default ServicesService
