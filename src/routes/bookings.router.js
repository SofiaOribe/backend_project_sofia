import express, { urlencoded, Router } from "express"
import BookingsController from "../controllers/bookings.controller.js"
import validateBooking from "../middlewares/validateBookings.js"

const router = Router()

router
  .route("/")
  .get(BookingsController.getBookingsController)
  .post(
    validateBooking,
    express.json(),
    urlencoded({ extended: true }),
    BookingsController.createBookingController,
  )

router.get("/:bid", BookingsController.getBookingByIdController)
router.delete("/:bid", BookingsController.deleteBookingController)

router.post("/:bid/services/:sid", BookingsController.addServiceToBookingController)

export default router
