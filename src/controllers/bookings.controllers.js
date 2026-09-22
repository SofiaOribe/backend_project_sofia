import BookingManager from "../managers/BookingManager.js"
import ServiceManager from "../managers/ServiceManager.js"
const bookingManagerInstance = new BookingManager("./src/data/bookings.json")
const serviceManager = new ServiceManager("./src/data/services.json")
class BookingsController {
  //  static es un metodo que no necesita de una instancia para funcionar, se puede llamar directamente desde la clase

  static async getBookingsController(req, res, next) {
    try {
      const services = await bookingManagerInstance.getBookings()
      /* res.status(404).json({ message: "Error al tratar de obtener los datos" }) */
      return res.status(200).json(services)
    } catch (error) {
      return res.status(500).json({
        message: error.message || "Error al tratar de obtener los bookings",
      })
    }
  }

  static async createBookingController(req, res, next) {
    try {
      const { clientName, clientEmail, date, time, status } = req.body
      const newBooking = await bookingManagerInstance.createBooking(
        clientName,
        clientEmail,
        date,
        time,
        status,
      )
      /*   if (!newBooking) {
        res.status(400).json({ message: "Error al tratar de crear reserva" })
      } */
      return res.status(201).json({ message: "Nueva reserva creada", newBooking })
    } catch (error) {
      return res.status(500).json({
        message: error.message || "Error al tratar de crear la reserva",
      })
    }
  }

  static async getBookingByIdController(req, res, next) {
    try {
      const id = req.params.id
      const booking = await bookingManagerInstance.getBookingById(id)
      /*  if (!booking) {
        res.status(404).json({ message: "Reserva no encontrada" })
      } */
      return res.status(200).json({ message: "Nueva reserva creada", booking })
    } catch (error) {
      return res.status(500).json({
        message:
          error.message || "Error al tratar de obtener la reserva con el id: " + req.params.id,
      })
    }
  }
  static async addServiceToBookingController(req, res, next) {
    try {
      const { bookingId, serviceId } = req.params
      /*  const booking = await bookingManagerInstance.getBookingById(bookingId)
      if (!booking) {
        res.status(404).json({ message: "Reserva no encontrada" })
      }

      const service = await serviceManager.getServiceById(serviceId)
       if (!service) {
        res.status(404).json({ message: "Servicio no encontrado" })
      } */

      const updatedBooking = await bookingManagerInstance.addServiceToBooking(bookingId, serviceId)
      return res.status(201).json({ message: "Servicio agregado a la reserva", updatedBooking })
    } catch (error) {
      return res.status(500).json({
        message:
          error.message ||
          "Error al tratar de agregar el servicio a la reserva con el id: " + req.params.bookingId,
      })
    }
  }
}

export default BookingsController
