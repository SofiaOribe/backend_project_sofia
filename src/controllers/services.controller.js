import ServicesService from "../services/services.service.js"

const serviceServiceInstance = new ServicesService()

class ServiceController {
  static async getServicesController(req, res, next) {
    try {
      const services = await serviceServiceInstance.getServices()
      return res.status(200).json(services)
    } catch (error) {
      return res.status(500).json({
        message: error.message || "Error al tratar de obtener los servicios",
      })
    }
  }
  static async getServicesPaginatedController(req, res, next) {
    try {
      const services = await serviceServiceInstance.getServicesPaginated(req.query)
      return res.status(200).json(services)
    } catch (error) {
      return res.status(500).json({
        message: error.message || "Error al tratar de obtener los servicios",
      })
    }
  }

  static async getServicesByIdController(req, res, next) {
    try {
      const sid = req.params.sid
      const service = await serviceServiceInstance.getServiceById(sid)
      return res.status(200).json(service)
    } catch (error) {
      return res.status(500).json({
        message:
          error.message || "Error al tratar de obtener el servicio con el ID: " + req.params.sid,
      })
    }
  }

  static async createServiceController(req, res, next) {
    try {
      const data = req.body
      const newService = await serviceServiceInstance.createService(data)

      const io = req.app.get("io")
      io?.emit("service:created", newService)

      return res.status(200).json({ message: "Nuevo servicio creado", newService })
    } catch (error) {
      return res.status(500).json({
        message: error.message || "Error al tratar de crear el servicio",
      })
    }
  }
  static async updateServiceController(req, res, next) {
    try {
      const sid = req.params.sid
      const updatedService = await serviceServiceInstance.updateService(sid, req.body)

      req.app.get("io").emit("service:updated", updatedService)

      return res.status(200).json({ message: "Servicio actualizado", updatedService })
    } catch (error) {
      return res.status(500).json({
        message:
          error.message || "Error al tratar de actualizar el servicio con el ID: " + req.params.id,
      })
    }
  }
  static async deleteServiceController(req, res, next) {
    try {
      const sid = req.params.sid
      const deletedService = await serviceServiceInstance.deleteService(sid)

      const io = req.app.get("io")
      io?.emit("service:deleted", { id: sid })

      return res.status(200).json({ message: "Servicio eliminado", deletedService })
    } catch (error) {
      return res.status(500).json({
        message:
          error.message || "Error al tratar de eliminar el servicio con el ID: " + req.params.sid,
      })
    }
  }
}

export default ServiceController
