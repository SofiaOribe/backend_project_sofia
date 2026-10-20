import { z } from "zod"

const serviceSchema = z.object({
  name: z
    .string({
      error: (issue) => {
        issue.input === undefined ? "El nombre es obligatorio" : "El nombre debe ser un texto"
      },
    })
    .min(1, "El nombre es obligatorio"),
  description: z
    .string({
      error: (issue) => {
        issue.input === undefined
          ? "La descripcion es obligatoria"
          : "La descripcion debe ser un texto"
      },
    })
    .min(1, "La descripcion es obligatoria"),
  duration: z
    .number({
      error: (issue) => {
        issue.input === undefined ? "La duracion es obligatoria" : "La duracion debe ser un numero"
      },
    })
    .positive(1, "La duracion debe ser mayor a 0"),
  price: z
    .number({
      error: (issue) => {
        issue.input === undefined ? "El precio es obligatorio" : "El precio debe ser un numero"
      },
    })
    .positive(1, "El precio debe ser mayor a 0"),
  category: z
    .string({
      error: (issue) => {
        issue.input === undefined ? "La categoria es obligatoria" : "La categoria debe ser un texto"
      },
    })
    .min(1, "La categoria es obligatoria"),
  available: z.boolean({
    error: (issue) => {
      issue.input === undefined
        ? "La disponibilidad es obligatoria"
        : "La disponibilidad debe ser verdadero o falso"
    },
  }),
})

const validateService = (req, res, next) => {
  const resultado = serviceSchema.safeParse(req.body)

  if (!resultado.success) {
    console.log(resultado.error)
    return res.status(404).json({
      error: "Datos invalidos",
      details: resultado.error.issues,
    })
  }

  req.body = resultado.data
}

export default validateService
