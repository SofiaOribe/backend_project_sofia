import { z } from "zod"

const serviceSchema = z.object({
  name: z
    .string({
      error: (issue) => (issue.input === undefined ? "Name is required." : "Name must be text."),
    })
    .min(3, "Name is required."),

  description: z
    .string({
      error: (issue) =>
        issue.input === undefined ? "Description is required." : "Description must be text",
    })
    .min(5, "Description is required."),

  duration: z
    .number({
      error: (issue) =>
        issue.input === undefined ? "Duration is required." : "Duration must be a number.",
    })
    .positive("Duration must be greater than 0."),

  price: z
    .number({
      error: (issue) =>
        issue.input === undefined ? "Price is required." : "Price must be a number.",
    })
    .positive("Price must be greater than 0."),

  category: z
    .string({
      error: (issue) =>
        issue.input === undefined ? "Category is required." : "Category must be text.",
    })
    .min(3, "Category is required."),

  available: z.boolean({
    error: (issue) =>
      issue.input === undefined
        ? "Availability is required."
        : "Availability must be true or false.",
  }),
})

const validateService = (req, res, next) => {
  const resultado = serviceSchema.safeParse(req.body)

  if (!resultado.success) {
    return res.status(400).json({
      error: "Invalid data",
      details: resultado.error.issues,
    })
  }

  req.body = resultado.data
  next()
}

const validateServiceUpdate = (req, res, next) => {
  const result = serviceSchema.partial().safeParse(req.body)

  if (!result.success) {
    return res.status(400).json({
      error: "Invalid data",
      details: result.error.issues,
    })
  }

  req.body = result.data
  next()
}

export default { validateService, validateServiceUpdate }
