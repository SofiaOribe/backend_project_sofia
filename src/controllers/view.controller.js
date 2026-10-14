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
      const availableServices = services.filter((service) => service.available === true)

      const bookingsWithServiceNames = bookings.map((booking) => {
        const bookingObject = booking.toObject ? booking.toObject() : { ...booking }

        const servicesWithNames = bookingObject.services.map((item) => {
          const serviceId = item.service._id ? item.service._id.toString() : item.service.toString()

          const matchedService = services.find((service) => service._id.toString() === serviceId)

          console.log(matchedService, "bookingsWithServiceNames")
          return {
            service: matchedService
              ? {
                  _id: matchedService._id,
                  name: matchedService.name,
                }
              : null,
            quantity: item.quantity,
          }
        })
        return {
          ...bookingObject,
          services: servicesWithNames,
        }
      })
      return res.render("bookings", {
        title: "Bookings",
        bookings: bookingsWithServiceNames,
        services: availableServices,
      })
    } catch (error) {
      next(error)
    }
  }
}

export default ViewController
