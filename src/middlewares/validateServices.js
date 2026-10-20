import { z } from "zod"

const serviceSchema = z.object({
  name: z
    .string({
      error: (issue) =>
        issue.input === undefined ? "El nombre es obligatorio" : "El nombre debe ser un texto",
    })
    .min(1, "El nombre es obligatorio"),

  description: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "La descripción es obligatoria"
          : "La descripción debe ser un texto",
    })
    .min(1, "La descripción es obligatoria"),

  duration: z
    .number({
      error: (issue) =>
        issue.input === undefined ? "La duración es obligatoria" : "La duración debe ser un número",
    })
    .positive("La duración debe ser mayor a 0"),

  price: z
    .number({
      error: (issue) =>
        issue.input === undefined ? "El precio es obligatorio" : "El precio debe ser un número",
    })
    .positive("El precio debe ser mayor a 0"),

  category: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "La categoría es obligatoria"
          : "La categoría debe ser un texto",
    })
    .min(1, "La categoría es obligatoria"),

  available: z.boolean({
    error: (issue) =>
      issue.input === undefined
        ? "La disponibilidad es obligatoria"
        : "La disponibilidad debe ser verdadera o falsa",
  }),
})

const validateService = (req, res, next) => {
  const resultado = serviceSchema.safeParse(req.body)

  if (!resultado.success) {
    return res.status(400).json({
      error: "Datos inválidos",
      details: resultado.error.issues,
    })
  }

  req.body = resultado.data
  next()
}

export default validateService
