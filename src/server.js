import express from "express"
import env from "./config/env.config.js"
import { notFound, routingDetector } from "./middlewares/routingDetector.js"
import { errorHandler } from "./middlewares/errorHandler.js"
import bookingsRouter from "./routes/bookings.router.js"
import servicesRouter from "./routes/services.router.js"
import connectDB from "./config/db.js"

const app = express()

app.use(routingDetector)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api/services", servicesRouter)
app.use("/api/bookings", bookingsRouter)

app.get("/", async (req, res, next) => {
  try {
    throw new Error("Error de prueba")
  } catch (error) {
    next(error)
  }
})

app.use(async (err, req, res, next) => {
  res.status(500).json({ error: err.message })
})

app.use(errorHandler)
app.use(notFound)

app.listen(env.PORT, () => {
  console.log("Servidor corre en " + env.PORT)
  connectDB()
    .then(() => {
      console.log("Conectado a DB")
    })
    .catch((error) => {
      console.log(error)
    })
})
