import express, { urlencoded, Router } from "express"
import ServiceController from "../controllers/services.controller.js"
import validators from "../middlewares/validateServices.js"
const router = Router()

router.use(express.json(), express.urlencoded({ extended: true }))

router
  .route("/")
  .get(ServiceController.getServicesPaginatedController)
  .post(validators.validateService, ServiceController.createServiceController)

router
  .route("/:sid")
  .get(ServiceController.getServicesByIdController)
  .put(validators.validateServiceUpdate, ServiceController.updateServiceController)
  .delete(ServiceController.deleteServiceController)

export default router
