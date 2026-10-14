import express from "express"
import { notFound, routingDetector } from "./middlewares/routingDetector.js"
import { errorHandler } from "./middlewares/errorHandler.js"
import { createServer } from "http"
import { Server } from "socket.io"
import { engine } from "express-handlebars"
import env from "./config/env.config.js"

import bookingsRouter from "./routes/bookings.router.js"
import servicesRouter from "./routes/services.router.js"
import messagesRouter from "./routes/messages.router.js"
import viewRouter from "./routes/view.router.js"

import configureHandlebars from "./config/handlebars.js"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const httpServer = createServer(app)
export const socket = new Server(httpServer)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Configuración de Handlebars
app.engine("handlebars", engine())
app.set("view engine", "handlebars")
app.set("views", path.join(__dirname, "views"))

// Handlebars configuration
configureHandlebars(app, __dirname)

// Routes
app.use("/api/services", servicesRouter)
app.use("/api/bookings", bookingsRouter)
app.use("/api/messages", messagesRouter)
app.use("/", viewRouter)

// Static files
app.use(express.static(path.join(__dirname, "./public")))

app.use(routingDetector)

// Configuración de WebSockets
socket.on("connection", (socket) => {
  console.log(`Cliente conectado. ID: ${socket.id}`)

  // Escuchar mensaje del cliente
  socket.on("mensaje_cliente", (data) => {
    console.log(`Mensaje recibido: ${data}`)

    // Responder a todos los clientes conectados
    socket.emit("mensaje_servidor", `El servidor recibió: "${data}"`)
  })

  socket.on("disconnect", () => {
    console.log(`Cliente desconectado. ID: ${socket.id}`)
  })
})

httpServer.listen(env.PORT, () => {
  console.log("Servidor corre en el puerto " + env.PORT)
})

// Error handling
app.use(errorHandler)
app.use(notFound)

export default app
