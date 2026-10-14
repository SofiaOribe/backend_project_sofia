import app from "./app.js"
import env from "./config/env.config.js"
import connectDB from "./config/db.js"

const startServer = async () => {
  try {
    await connectDB()
      .then(() => {
        console.log("Conectado a DB")
      })
      .catch((error) => {
        console.log(error)
      })

    app.listen(env.PORT, () => {
      console.log("Servidor corre en el puerto " + env.PORT)
    })
  } catch (error) {
    console.error("Error al iniciar el servidor:", error)
  }
}

startServer()
