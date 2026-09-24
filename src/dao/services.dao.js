import crypto from "crypto"
import fs from "fs/promises"

class ServiceDao {
  constructor(path) {
    this.path = path
  }

  async #readServices() {
    const data = await fs.readFile(this.path, "utf-8")
    return JSON.parse(data)
  }

  async #writeServices(services) {
    await fs.writeFile(this.path, JSON.stringify(services, null, 2))
  }

  async getAll() {
    return await this.#readServices()
  }

  async getById(id) {
    const services = await this.#readServices()
    if (!services) {
      return null
    }
    return services.find((service) => service.id === id)
  }

  async create(data) {
    const services = await this.#readServices()
    const { name, description, duration, price, category, available } = data
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
      return newService
    }
  }

  async update(id, updatedData) {
    const services = await this.#readServices()
    const index = services.findIndex((service) => service.id === id)
    if (index === -1) {
      return null
    }
    services[index] = { ...services[index], ...updatedData }
    await this.#writeServices(services)
    return services[index]
  }

  async delete(id) {
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

export default ServiceDao
