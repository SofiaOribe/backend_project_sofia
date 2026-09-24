import crypto from "crypto"
import fs from "fs/promises"

class BookingsDao {
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

  async getAll() {
    return await this.#readBookings()
  }

  async getById(id) {
    const bookings = await this.#readBookings()
    if (!bookings) {
      return null
    }
    return bookings.find((booking) => booking.id === id)
  }

  async create(data) {
    const booking = await this.#readBookings()
    const { clientName, clientEmail, date, time, status } = data

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

  async update(bookingId, serviceId) {
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

export default BookingsDao
