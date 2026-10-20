import ServicesService from "../services/services.service.js"
import BookingService from "../services/bookings.service.js"

const serviceServiceInstance = new ServicesService()
const bookingServiceInstance = new BookingService()

class ViewController {
  static async getServices(req, res, next) {
    try {
      const services = await serviceServiceInstance.getServicesPaginated(req.query)
      return res.render("services", { title: "Servicios", services })
    } catch (error) {
      next(error)
    }
  }

  static async getBookings(req, res, next) {
    try {
      const bookings = await bookingServiceInstance.getBookings()
      const services = await serviceServiceInstance.getServices()

      return res.render("bookings", {
        title: "Bookings",
        bookings,
        services,
      })
    } catch (error) {
      next(error)
    }
  }
}

export default ViewController
