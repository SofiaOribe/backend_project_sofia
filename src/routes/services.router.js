import express, { urlencoded, Router } from "express"
import ServiceController from "../controllers/services.controller.js"
import validateService from "../middlewares/validateServices.js"
const router = Router()

router.use(express.json(), express.urlencoded({ extended: true }))

router
  .route("/")
  .get(ServiceController.getServicesPaginatedController)
  .post(
    validateService,
    express.json(),
    urlencoded({ extended: true }),
    ServiceController.createServiceController,
  )

router
  .route("/:sid")
  .get(ServiceController.getServicesByIdController)
  .put(express.json(), urlencoded({ extended: true }), ServiceController.updateServiceController)
  .delete(ServiceController.deleteServiceController)

export default router
