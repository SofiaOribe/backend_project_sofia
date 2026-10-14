import express, { urlencoded, Router } from "express"
import MessagesController from "../controllers/messages.controller.js"

const router = Router()

router.get("/", MessagesController.getConversationsController)

router.get("/:id", MessagesController.getConversationByIdController)

router.post("/:id", MessagesController.sendMessageController)

export default router
