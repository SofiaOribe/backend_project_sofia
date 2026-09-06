import express from "express"
import env from "./config/env.config.js"
import ServiceManager from "./managers/ServiceManager.js"

const serviceManager = new ServiceManager()
const app = express()

// Establecemos el middleware para parsear el body de las peticiones

app.use(express.json(), express.urlencoded({ extended: true }))

// mas adelante por filtros  ?category=salud, ?available=true
app.get("/api/services", async (req, res, next) => {
  try {
    const services = serviceManager.getServices()
    res.status(200).json(services)
    res.status(404).json({ message: "Error al tratar de obtener los datos" })
  } catch (error) {
    console.log(error)
  }
})

app.get("/api/services/:id", async (req, res, next) => {
  try {
    const id = req.params.id
    const service = serviceManager.getServiceById(id)
    res.status(200).json(service)
    res.status(404).json({ message: "Error al tratar de obtener el servicio" })
  } catch (error) {
    console.log(error)
  }
})

app.post("/api/services", async (req, res, next) => {
  try {
    const { name, description, duration, price, category, available } = req.body
    const newService = serviceManager.addService(name, description, duration, price, category, available)
    res.status(201).json({ message: "Nuevo servicio creado", newService })
    res.status(400).json({ message: "Error al tratar de crear servicio" })
  } catch (error) {
    console.log(error)
  }
})

app.put("/api/services/:id", async (req, res, next) => {
  try {
    const id = req.params.id
    const updatedService = serviceManager.updateService(id, req.body)

    res.status(201).json({ message: "Servicio actualizado", updatedService })
    res.status(404).json({ message: "Error al tratar de actualizar los datos" })
  } catch (error) {
    console.log(error)
  }
})

app.delete("/api/services/:id", async (req, res, next) => {
  try {
    const id = req.params.id
    const deletedService = serviceManager.delete(id)

    res.status(201).json({ message: "Servicio eliminado", deletedService })
    res.status(404).json({ message: "Error al tratar de eliminar los datos" })
  } catch (error) {
    console.log(error)
  }
})

app.listen(env.PORT, () => {
  console.log("Servidor corre en " + env.PORT)
})

/* ------------------------------------- TEORIA ------------------------------------- */

// * Definimos una ruta de prueba para el servidor

/* 
 * Metodos HTTP:
  - GET: Obtener datos del servidor. Tiende a exponer por completo la consulta, por lo que no es       recomendable para datos sensibles
  - POST: Enviar datos al servidor. Oculta parte de la información. O crea nuevos datos en el servidor
  - PUT: Actualizar datos en el servidor
  - PATCH: Actualizar parcialmente datos en el servidor
  - DELETE: Eliminar datos del servidor

 Estos son responsables de las operaciones CRUD (Create, Read, Update, Delete) que se realizan en el servidor

  
*/

// Puede recibir entre 1 hasta 3 o 4  parámetros, siendo el primero la ruta y el segundo la función callback que se ejecutará cuando se haga una petición a esa ruta. El cuarto parametro se pone primero y es opcional se llama error.

/* app.get("/", async (request, response, next) => {
  
    Funciones callback
    request (req) = lo que viene del cliente
    response = lo que enviamos al cliente
 




  console.log(request.headers)
  response.send({
    mensaje: "Bienvenido al Backend de Servicios de Turnos",
    status: "activo",
  })
  response.download("") ---> Permite descargar un archivo desde el servidor
}) */

/* 
  Middleware: es una función que se ejecuta antes de la función callback de la ruta. Se utiliza para procesar la petición antes de enviarla a la función callback. Se puede utilizar para validar datos, autenticar usuarios, etc.
  */
