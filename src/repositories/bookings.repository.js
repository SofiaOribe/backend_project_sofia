import BookingsDao from "../dao/bookings.mongo.dao.js"

class BookingsRepository {
  constructor(dao = new BookingsDao()) {
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
  async addServiceToBooking(id, data) {
    return await this.dao.update(id, data)
  }
  async deleteBooking(id) {
    return await this.dao.delete(id)
  }
}

export default BookingsRepository
