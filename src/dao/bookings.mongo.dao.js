import bookingModel from "../models/bookings.model.js"

class BookingsDao {
  async getAll() {
    return await bookingModel.find({}).lean()
  }

  async getById(id) {
    return await bookingModel.findById(id).lean()
  }

  async create(data) {
    return await bookingModel.create(data)
  }

  async update(id, data) {
    return await bookingModel.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    })
  }

  async delete(id) {
    return await bookingModel.findByIdAndDelete(id)
  }
}

export default BookingsDao
