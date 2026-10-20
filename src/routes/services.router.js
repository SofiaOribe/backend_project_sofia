import express, { urlencoded, Router } from "express"
import ServiceController from "../controllers/services.controller.js"
import validateService from "../middlewares/validateServices.js"
const router = Router()

router.use(express.json(), express.urlencoded({ extended: true }))

router.route("/").get(ServiceController.getServicesPaginatedController).post(
  validateService,

  ServiceController.createServiceController,
)

router
  .route("/:sid")
  .get(ServiceController.getServicesByIdController)
  .put(ServiceController.updateServiceController)
  .delete(ServiceController.deleteServiceController)

export default router
