import serviceManager from "../managers/ServiceManager.js"
const serviceManagerInstance = new serviceManager("./src/data/services.json")

class ServiceController {
  //  static es un metodo que no necesita de una instancia para funcionar, se puede llamar directamente desde la clase
  static async getServicesController(req, res, next) {
    try {
      const services = await serviceManagerInstance.getServices()
      /*   res.status(404).json({ message: "Error al tratar de obtener los datos" }) */
      return res.status(200).json(services)
    } catch (error) {
      return res.status(500).json({
        message: error.message || "Error al tratar de obtener los servicios",
      })
    }
  }

  static async getServicesByIdController(req, res, next) {
    try {
      const id = req.params.id
      const service = await serviceManagerInstance.getServiceById(id)
      return res.status(200).json(service)
      /* res.status(404).json({ message: "Error al tratar de obtener el servicio" }) */
    } catch (error) {
      return res.status(500).json({
        message:
          error.message || "Error al tratar de obtener el servicio con el id: " + req.params.id,
      })
    }
  }

  static async createServiceController(req, res, next) {
    try {
      const { name, description, duration, price, category, available } = req.body
      const newService = await serviceManagerInstance.createService(
        name,
        description,
        duration,
        price,
        category,
        available,
      )
      return res.status(201).json({ message: "Nuevo servicio creado", newService })
      /* res.status(400).json({ message: "Error al tratar de crear servicio" }) */
    } catch (error) {
      return res.status(500).json({
        message: error.message || "Error al tratar de crear el servicio",
      })
    }
  }
  static async updateServiceController(req, res, next) {
    try {
      const id = req.params.id
      const updatedService = await serviceManagerInstance.updateService(id, req.body)

      return res.status(201).json({ message: "Servicio actualizado", updatedService })
      /*  res.status(404).json({ message: "Error al tratar de actualizar los datos" }) */
    } catch (error) {
      return res.status(500).json({
        message:
          error.message || "Error al tratar de actualizar el servicio con el id: " + req.params.id,
      })
    }
  }
  static async deleteServiceController(req, res, next) {
    try {
      const id = req.params.id
      const deletedService = await serviceManagerInstance.deleteService(id)
      /*    if (!deletedService) {
        res.status(404).json({ message: "Error al tratar de eliminar los datos" })
      } */

      return res.status(201).json({ message: "Servicio eliminado", deletedService })
    } catch (error) {
      return res.status(500).json({
        message:
          error.message || "Error al tratar de eliminar el servicio con el id: " + req.params.id,
      })
    }
  }
}

export default ServiceController
