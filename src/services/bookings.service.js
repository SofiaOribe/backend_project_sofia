import BookingsRepository from "../repositories/bookings.repository.js"

class BookingsService {
  constructor(repository = new BookingsRepository()) {
    this.repository = repository
  }

  async getBookings() {
    return await this.repository.getBookings()
  }
  async getBookingById(id) {
    const booking = await this.repository.getBookingById(id)
    if (!booking) throw new Error(`El booking con ID ${id} no fue encontrado`)
    return booking
  }

  async createBooking(data) {
    const { clientName, clientEmail, date, time, status } = data
    if (!clientName || !clientEmail || !date || !time || !status) {
      throw new Error("Faltan datos obligatorios para crear el booking")
    }

    return await this.repository.createBooking(data)
  }

  async addServiceToBooking(bid, sid) {
    const booking = await this.repository.getBookingById(bid)

    const existingService = booking.services.find(
      (item) => item.service.toString() === sid.toString(),
    )
    if (existingService) {
      existingService.quantity += 1
    } else {
      booking.services.push({ service: sid, quantity: 1 })
    }
    return await this.repository.addServiceToBooking(booking)
  }
}

export default BookingsService
