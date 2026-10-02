import BookingsService from "../services/bookings.service.js"

const bookingsServiceInstance = new BookingsService()

class BookingsController {
  static async getBookingsController(req, res, next) {
    try {
      const services = await bookingsServiceInstance.getBookings()
      return res.status(200).json(services)
    } catch (error) {
      return res.status(500).json({
        message: error.message || "Error al tratar de obtener los bookings",
      })
    }
  }

  static async getBookingByIdController(req, res, next) {
    try {
      const id = req.params.id
      const booking = await bookingsServiceInstance.getBookingById(id)

      return res.status(200).json({ message: "Nueva reserva creada", booking })
    } catch (error) {
      return res.status(500).json({
        message:
          error.message || "Error al tratar de obtener la reserva con el ID: " + req.params.id,
      })
    }
  }

  static async createBookingController(req, res, next) {
    try {
      const data = req.body
      const newBooking = await bookingsServiceInstance.createBooking(data)

      return res.status(200).json({ message: "Nueva reserva creada", newBooking })
    } catch (error) {
      return res.status(500).json({
        message: error.message || "Error al tratar de crear la reserva",
      })
    }
  }

  static async addServiceToBookingController(req, res, next) {
    try {
      const { bid, sid } = req.params

      const updatedBooking = await bookingsServiceInstance.addServiceToBooking(bid, sid)
      return res.status(200).json({ message: "Servicio agregado a la reserva", updatedBooking })
    } catch (error) {
      return res.status(500).json({
        message:
          error.message ||
          "Error al tratar de agregar el servicio a la reserva con el ID: " + req.params.bid,
      })
    }
  }
}

export default BookingsController
