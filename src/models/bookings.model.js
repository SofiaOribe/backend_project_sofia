import { Schema, model } from "mongoose"

const bookingSchema = new Schema(
  {
    clientName: {
      type: String,
      required: true,
    },
    clientEmail: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    services: [
      {
        service: {
          type: Schema.Types.ObjectId,
          ref: "services",
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
  },
  {
    timestamps: true,
  },
)

//Heredar contexto
/* bookingSchema.pre("findOne", function () {
  return this.populate("services.service")
}) */

const bookingModel = model("bookings", bookingSchema)

export default bookingModel
