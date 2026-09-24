import BookingsRepository from "../repositories/bookings.repository.js"

class BookingsService {
  constructor(repository = new BookingsRepository()) {
    this.repository = repository
  }

  async getBookings() {
    return await this.repository.getBookings()
  }
  async getBookingById(id) {
    const service = await this.repository.getBookingById(id)
    if (!service) throw new Error(`El booking con ID ${id} no fue encontrado`)
    return service
  }

  async createBooking(data) {
    const { clientName, clientEmail, date, time, status } = data
    if (!clientName || !clientEmail || !date || !time || !status) {
      throw new Error("Faltan datos obligatorios para crear el booking")
    }

    return await this.repository.createBooking(data)
  }

  async addServiceToBooking(bookingId, serviceId) {
    const updatedBooking = await this.repository.addServiceToBooking(bookingId, serviceId)

    if (!updatedBooking) {
      throw new Error(`El booking con ID ${bookingId} no fue encontrado`)
    }

    return updatedBooking
  }
}

export default BookingsService
