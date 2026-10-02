import express, { urlencoded, Router } from "express"
import ServiceController from "../controllers/services.controller.js"

const router = Router()

router.use(express.json(), express.urlencoded({ extended: true }))

router
  .route("/")
  .get(ServiceController.getServicesController)
  .post(express.json(), urlencoded({ extended: true }), ServiceController.createServiceController)

router
  .route("/:sid")
  .get(ServiceController.getServicesByIdController)
  .put(express.json(), urlencoded({ extended: true }), ServiceController.updateServiceController)
  .delete(ServiceController.deleteServiceController)

export default router
