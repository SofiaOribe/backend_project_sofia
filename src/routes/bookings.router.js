import express, { urlencoded } from "express"
import { Router } from "express"
import BookingsController from "../controllers/bookings.controllers.js"

const router = Router()

/* router.use(express.json(), express.urlencoded({ extended: true })) */

router
  .route("/")
  .get(BookingsController.getBookingsController)
  .post(express.json(), urlencoded({ extended: true }), BookingsController.createBookingController)

router.get("/:id", BookingsController.getBookingByIdController)

router.post("/:bookingId/services/:serviceId", BookingsController.addServiceToBookingController)

export default router
