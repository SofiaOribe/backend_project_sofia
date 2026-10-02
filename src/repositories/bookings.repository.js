import BookingsDao from "../dao/bookings.mongo.dao.js"

class BookingsRepository {
  constructor(dao = new BookingsDao("./src/data/bookings.json")) {
    this.dao = dao
  }

  async getBookings() {
    return await this.dao.getAll()
  }
  async getBookingById(id) {
    return await this.dao.getById(id)
  }
  async createBooking(data) {
    return await this.dao.create(data)
  }
  async addServiceToBooking(updatedData) {
    return await this.dao.update(updatedData)
  }
}

export default BookingsRepository
