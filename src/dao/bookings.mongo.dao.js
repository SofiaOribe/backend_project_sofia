import bookingModel from "../models/bookings.model.js"

class BookingsDao {
  async getBookingsPaginated(query = {}) {
    return await bookingModel.paginate(
      {},
      {
        limit: query.limit || 1,
        page: query.page || 1,
        lean: true,
      },
    )
  }
  async getAll() {
    return await bookingModel.find({}).populate("services.service").lean()
  }

  async getById(id) {
    /*   return await bookingModel.findOne({ _id: id }).lean() */
    return await bookingModel.findById(id).populate("services.service").lean()
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
