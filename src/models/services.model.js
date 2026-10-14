import { Schema, model } from "mongoose"
import paginate from "mongoose-paginate-v2"

const serviceSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      index: true,
    },
    description: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
      index: true,
    },
    available: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  { timestamps: true },
)

serviceSchema.plugin(paginate)

const serviceModel = model("services", serviceSchema)

export default serviceModel
