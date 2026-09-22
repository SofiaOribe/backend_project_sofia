import crypto from "crypto"
import fs from "fs/promises"

class BookingManager {
  constructor(path) {
    this.path = path
  }

  async #readBookings() {
    const data = await fs.readFile(this.path, "utf-8")
    return JSON.parse(data)
  }

  async #writeBookings(bookings) {
    await fs.writeFile(this.path, JSON.stringify(bookings, null, 2))
  }

  async getBookings() {
    return await this.#readBookings()
  }

  async getBookingById(id) {
    const bookings = await this.#readBookings()
    if (!bookings) {
      return null
    }
    return bookings.find((booking) => booking.id === id)
  }

  async createBooking(clientName, clientEmail, date, time, status) {
    const booking = await this.#readBookings()

    if (!clientName || !clientEmail || !date || !time || !status) {
      return null
    } else {
      const newBooking = {
        id: crypto.randomUUID(),
        clientName,
        clientEmail,
        date,
        time,
        status,
        services: [],
      }

      booking.push(newBooking)
      await this.#writeBookings(booking)
      return newBooking
    }
  }
  async addServiceToBooking(bookingId, serviceId) {
    const bookings = await this.#readBookings()

    const booking = bookings.find((booking) => booking.id === bookingId)

    if (!booking) {
      return null
    }

    const existingService = booking.services.find((item) => item.service === serviceId)

    if (existingService) {
      existingService.quantity++
    } else {
      booking.services.push({
        service: serviceId,
        quantity: 1,
      })
    }

    await this.#writeBookings(bookings)

    return booking
  }
}

export default BookingManager
