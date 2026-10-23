import { httpServer } from "./app.js"
import env from "./config/env.config.js"
import connectDB from "./config/db.js"

const startServer = async () => {
  try {
    await connectDB()
    console.log("Connected to DB")

    httpServer.listen(env.PORT, () => {
      console.log("Server runs on the port " + env.PORT)
    })
  } catch (error) {
    console.error("Error starting the server:", error)
    process.exitCode = 1
  }
}

startServer()
