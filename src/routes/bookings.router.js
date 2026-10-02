import express, { urlencoded, Router } from "express"
import BookingsController from "../controllers/bookings.controllers.js"

const router = Router()

router
  .route("/")
  .get(BookingsController.getBookingsController)
  .post(express.json(), urlencoded({ extended: true }), BookingsController.createBookingController)

router.get("/:bid", BookingsController.getBookingByIdController)

router.post("/:bid/services/:sid", BookingsController.addServiceToBookingController)

export default router
