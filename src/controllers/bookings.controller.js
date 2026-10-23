import BookingsService from "../services/bookings.service.js"

const bookingsServiceInstance = new BookingsService()

class BookingsController {
  static async getBookingsController(req, res, next) {
    try {
      const bookings = await bookingsServiceInstance.getBookings()
      return res.status(200).json(bookings)
    } catch (error) {
      return res.status(500).json({
        message: error.message || "Error while attempting to obtain bookings",
      })
    }
  }

  static async getBookingByIdController(req, res, next) {
    try {
      const bid = req.params.bid
      const booking = await bookingsServiceInstance.getBookingById(bid)

      return res.status(200).json({ message: "Booking successfully confirmed", booking })
    } catch (error) {
      return res.status(500).json({
        message:
          error.message ||
          "Error while attempting to obtain the booking with the ID: " + req.params.id,
      })
    }
  }

  static async createBookingController(req, res, next) {
    try {
      const data = req.body
      const newBooking = await bookingsServiceInstance.createBooking(data)
      req.app.get("io").emit("booking:created", newBooking)
      return res.status(200).json({ message: "New booking created", newBooking })
    } catch (error) {
      return res.status(500).json({
        message: error.message || "Error while trying to create the booking",
      })
    }
  }

  static async addServiceToBookingController(req, res, next) {
    try {
      const { bid, sid } = req.params

      const updatedBooking = await bookingsServiceInstance.addServiceToBooking(bid, sid)
      req.app.get("io").emit("booking:updated", updatedBooking)
      return res.status(200).json({ message: "Service added to the booking", updatedBooking })
    } catch (error) {
      return res.status(500).json({
        message:
          error.message ||
          "Error while attempting to add the service to the booking with the ID: " + req.params.bid,
      })
    }
  }

  static async deleteBookingController(req, res, next) {
    try {
      const bid = req.params.bid
      const deletedBooking = await bookingsServiceInstance.deleteBooking(bid)
      req.app.get("io").emit("booking:deleted", {
        id: deletedBooking._id.toString(),
      })
      return res.status(200).json({ message: "Booking deleted", deletedBooking })
    } catch (error) {
      return res.status(500).json({
        message:
          error.message ||
          "Error when attempting to delete the booking with the ID: " + req.params.sid,
      })
    }
  }
}

export default BookingsController
