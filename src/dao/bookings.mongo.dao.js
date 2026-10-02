import bookingModel from "../models/bookings.model.js"

class BookingsDao {
  async getAll() {
    return await bookingModel.find({})
  }

  async getById(id) {
    return await bookingModel.findById(id)
  }

  async create(data) {
    return await bookingModel.create(data)
  }

  async update(updatedData) {
    return await updatedData.save()
  }
}

export default BookingsDao
