import express, { urlencoded } from "express"
import { Router } from "express"
import ServiceController from "../controllers/service.controller.js"

const router = Router()

router.use(express.json(), express.urlencoded({ extended: true }))

/* router.param("id", async (req, res, next, id) => {
  //validar que todos los id sean un ObjectId de mongoDB
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ message: "ID inválido" })
  }
}) */

router
  .route("/")
  .get(ServiceController.getServicesController)
  .post(express.json(), urlencoded({ extended: true }), ServiceController.createServiceController)

router
  .route("/:id")
  .put(express.json(), urlencoded({ extended: true }), ServiceController.updateServiceController)
  .get(ServiceController.getServicesByIdController)
  .delete(ServiceController.deleteServiceController)

export default router
