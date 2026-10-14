import { Schema, model } from "mongoose"

const messageSchema = new Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    user: {
      type: String,
      required: true,
    },
    admin: {
      type: String,
      default: "Admin",
    },
    messages: [
      {
        sender: {
          type: String,
          required: true,
        },
        text: {
          type: String,
          required: true,
          trim: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  },
)

const messageModel = model("massage", messageSchema)

export default messageModel
