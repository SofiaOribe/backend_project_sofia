import express from "express"
import env from "./config/env.config.js"
import ServiceManager from "./managers/ServiceManager.js"
import BookingManager from "./managers/BookingManager.js"

const serviceManager = new ServiceManager("./src/data/services.json")
const bookingManager = new BookingManager("./src/data/bookings.json")
const app = express()

app.use(express.json(), express.urlencoded({ extended: true }))

// filtros: ?category=salud, ?available=true
app.get("/api/services", async (req, res, next) => {
  try {
    const services = await serviceManager.getServices()
    res.status(200).json(services)
    res.status(404).json({ message: "Error al tratar de obtener los datos" })
  } catch (error) {
    console.log(error)
  }
})

app.get("/api/services/:id", async (req, res, next) => {
  try {
    const id = req.params.id
    const service = await serviceManager.getServiceById(id)
    res.status(200).json(service)
    res.status(404).json({ message: "Error al tratar de obtener el servicio" })
  } catch (error) {
    console.log(error)
  }
})

app.post("/api/services", async (req, res, next) => {
  try {
    const { name, description, duration, price, category, available } = req.body
    const newService = await serviceManager.addService(name, description, duration, price, category, available)
    res.status(201).json({ message: "Nuevo servicio creado", newService })
    res.status(400).json({ message: "Error al tratar de crear servicio" })
  } catch (error) {
    console.log(error)
  }
})

app.put("/api/services/:id", async (req, res, next) => {
  try {
    const id = req.params.id
    const updatedService = await serviceManager.updateService(id, req.body)

    res.status(201).json({ message: "Servicio actualizado", updatedService })
    res.status(404).json({ message: "Error al tratar de actualizar los datos" })
  } catch (error) {
    console.log(error)
  }
})

app.delete("/api/services/:id", async (req, res, next) => {
  try {
    const id = req.params.id
    const deletedService = await serviceManager.deleteService(id)
    if (!deletedService) {
      res.status(404).json({ message: "Error al tratar de eliminar los datos" })
    }

    res.status(201).json({ message: "Servicio eliminado", deletedService })
  } catch (error) {
    console.log(error)
  }
})

app.listen(env.PORT, () => {
  console.log("Servidor corre en " + env.PORT)
})

// Rutas para bookings

app.post("/api/bookings", async (req, res, next) => {
  try {
    const { clientName, clientEmail, date, time, status } = req.body
    const newBooking = await bookingManager.createBooking(clientName, clientEmail, date, time, status)
    if (!newBooking) {
      res.status(400).json({ message: "Error al tratar de crear reserva" })
    }
    res.status(201).json({ message: "Nueva reserva creada", newBooking })
  } catch (error) {
    console.log(error)
  }
})

app.get("/api/bookings/:id", async (req, res, next) => {
  try {
    const id = req.params.id
    const booking = await bookingManager.getBookingById(id)
    if (!booking) {
      res.status(404).json({ message: "Reserva no encontrada" })
    }
    res.status(200).json({ message: "Nueva reserva creada", booking })
  } catch (error) {
    console.log(error)
  }
})

app.post("/api/bookings/:bookingId/services/:serviceId", async (req, res, next) => {
  try {
    const { bookingId, serviceId } = req.params
    const booking = await bookingManager.getBookingById(bookingId)
    if (!booking) {
      res.status(404).json({ message: "Reserva no encontrada" })
    }

    const service = await serviceManager.getServiceById(serviceId)
    if (!service) {
      res.status(404).json({ message: "Servicio no encontrado" })
    }

    const updatedBooking = await bookingManager.addServiceToBooking(bookingId, serviceId)
    res.status(201).json({ message: "Servicio agregado a la reserva", updatedBooking })
  } catch (error) {
    console.log(error)
  }
})
