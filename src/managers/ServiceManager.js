import crypto from "crypto"

// Clase
class ServiceManager {
  //* Lista de servicios
  constructor() {
    this.services = []
  }

  /* ------ Creacion de metodos en la clase ------ */

  //* Metodo para traer todos los servicios
  getServices() {
    return this.services
  }

  //* Trae un servicio por su id
  getServicesById(id) {
    // find(): busca un servicio por su id
    const service = this.services.find((service) => service.id === id)
    if (!service) {
      throw new Error(`No es posible hallar el servicio`)
    }
    return this.services.find((service) => service.id === id)
  }

  //* Metodo para crear un nuevo servicio
  addService(name, description, duration, price, category, available) {
    if (!name || !description || !duration || !price || !category || available === undefined) {
      throw new Error("Todos los campos son obligatorios")
    } else {
      const newService = {
        id: crypto.randomUUID(), // Genera un id unico
        name,
        description,
        duration,
        price,
        category,
        available,
      }

      // Agrega el nuevo servicio al arreglo de servicios
      this.services.push(newService)
      console.log(
        `Se ha agregado: ${newService.name} - ${newService.description} - ${newService.duration} - ${newService.price} - ${newService.category} - ${newService.available}`,
      )
      return newService
    }
  }

  //* Metodo para actualizar un servicio
  updateService(id, data) {
    const service = this.getServicesById(id)
    if (!service) {
      throw new Error(`Servicio no ha sido encontrado`)
    } else {
      // Ej: si data.name es undefined, se mantiene el valor original. Sino se actualiza con el nuevo valor
      service.name = data.name ?? service.name
      service.description = data.description ?? service.description
      service.duration = data.duration ?? service.duration
      service.price = data.price ?? service.price
      service.category = data.category ?? service.category
      service.available = data.available ?? service.available
      return service
    }
  }

  //* Metodo para eliminar un servicio
  deleteService(name) {
    // findIndex(): busca el indice del servicio por su nombre
    const service = this.services.findIndex((service) => service.name === name)
    if (service === -1) {
      throw new Error(`Servicio con nombre "${name}" no encontrado`)
    } else {
      return this.services.splice(service, 1) // Elimina el servicio del arreglo y lo retorna
    }
  }
}

export default ServiceManager
