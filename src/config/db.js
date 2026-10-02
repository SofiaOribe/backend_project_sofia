import { connect } from "mongoose"
import config from "./env.config.js"

async function connectDB() {
  return await connect(config.MONGO_URI)
}

export default connectDB
