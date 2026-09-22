export const routingDetector = (req, res, next) => {
  console.log({
    method: req.method,
    url: req.url,
  })
  next()
}

export function notFound(req, res, next) {
  res.status(404).json({ error: "Ruta no encontrada" })
}
