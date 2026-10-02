import { Schema, model } from "mongoose"

const messageSchema = new Schema(
  {
    user: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

const messageModel = model("massage", messageSchema)

export default messageModel
