import crypto from "crypto"
import fs from "fs/promises"

class ServiceManager {
  constructor(path) {
    this.path = path
  }

  async #readServices() {
    // Metodo privado -> #
    const data = await fs.readFile(this.path, "utf-8")
    return JSON.parse(data) // Convierte JSON a objeto
  }

  async #writeServices(services) {
    await fs.writeFile(this.path, JSON.stringify(services, null, 2))
  }

  async getServices() {
    return await this.#readServices()
  }

  async getServiceById(id) {
    const services = await this.#readServices()
    if (!services) {
      return null
    }
    return services.find((service) => service.id === id)
  }

  async addService(name, description, duration, price, category, available) {
    const services = await this.#readServices()

    if (!name || !description || !duration || !price || !category || available === undefined) {
      return null
    } else {
      const newService = {
        id: crypto.randomUUID(),
        name,
        description,
        duration,
        price,
        category,
        available,
      }

      services.push(newService)
      await this.#writeServices(services)
      console.log(
        `Se ha agregado: ${newService.name} - ${newService.description} - ${newService.duration} - ${newService.price} - ${newService.category} - ${newService.available}`,
      )
      return newService
    }
  }

  async updateService(id, updatedData) {
    const services = await this.#readServices()
    const index = services.findIndex((service) => service.id === id)
    if (index === -1) {
      return null
    }
    services[index] = { ...services[index], ...updatedData }
    await this.#writeServices(services)
    return services[index]
  }

  async deleteService(id) {
    const services = await this.#readServices()
    const index = services.findIndex((service) => service.id === id)
    if (index === -1) {
      return null
    }
    const deletedService = services.splice(index, 1)[0]
    await this.#writeServices(services)
    return deletedService
  }
}

export default ServiceManager
