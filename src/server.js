import { httpServer } from "./app.js"
import env from "./config/env.config.js"
import connectDB from "./config/db.js"

const startServer = async () => {
  try {
    await connectDB()
    console.log("Conectado a DB")

    httpServer.listen(env.PORT, () => {
      console.log("Servidor corre en el puerto " + env.PORT)
    })
  } catch (error) {
    console.error("Error al iniciar el servidor:", error)
    process.exitCode = 1
  }
}

startServer()
