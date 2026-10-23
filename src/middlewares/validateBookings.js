import { z } from "zod"

const bookingSchema = z.object({
  clientName: z
    .string({
      error: (issue) =>
        issue.input === undefined ? "Client name is required." : "The client name must be text.",
    })
    .min(3, "Client name is required."),

  clientEmail: z.email({
    error: (issue) =>
      issue.input === undefined
        ? "Email is required."
        : issue.input === null
          ? "Email is required."
          : "The email is not valid.",
  }),

  date: z.iso.date({
    error: (issue) =>
      issue.input === undefined
        ? "The date is required."
        : "The date must be in YYYY-MM-DD format.",
  }),

  time: z
    .string({
      error: (issue) => (issue.input === undefined ? "Time is required" : "Time must be text."),
    })
    .regex(/^([01]\d|2[0-3]):[0-5]\d$/, "La hora debe tener formato HH:mm"),

  status: z
    .string({
      error: (issue) =>
        issue.input === undefined ? "Status is required." : "Status must be text.",
    })
    .min(1, "Status is required."),
})

const validateBooking = (req, res, next) => {
  const response = bookingSchema.safeParse(req.body)

  if (!response.success) {
    return res.status(400).json({
      error: "Invalid data",
      details: response.error.issues,
    })
  }

  req.body = response.data
  next()
}

export default validateBooking
