# Sistema Backend de turnos y reservas

API backend para gestionar servicios y reservas de turnos. El proyecto utiliza Node.js, Express, MongoDB Atlas, Handlebars, Socket.io y Zod.

## Tecnlogías

- Node.js
- Express
- MongoDB Atlas
- Mongoose
- Zod
- ESM con import/export
- ESLint
- Prettier

Se recomienda utilizar una versión reciente de Node.js compatible con el proyecto.

## Instalación

#### Clonar el repositorio

```bash
  git clone https://github.com/SofiaOribe/backend_project_sofia.git
  cd main
```

#### Instalar las dependencias

```bash
  npm install
```

## Variable de entorno

Crear un archivo `.env` en la raíy del proyecto tomando como referencia `.env.example`.

```env
PORT=8080
APP_NAME=Sistema Backend de Turnos y Reservas
APP_ENV=development
MONGO_URL=tu_url_de_mongo
```

## Ejecutar el servidor

Para ejecutar el proyecto en modo desarrollo:

```bash
  npm run dev
```

El servidor quedará disponible en:

```bash
  http://localhost:8080
```

### Arquitectura en capas

El proyecto utiliza una arquitectura en capas que separa las responsabilidades de cada parte de la aplicación.

El flujo de una petición es:

```bash
Router → Controller → Service → Repository → DAO → archivo JSON
```

Cada capa tiene una responsabilidad específica y la comunicación debe respetar este orden.

#### `Router:`

Define las rutas de la API y recibe las solicitudes HTTP.

El Router solamente define los endpoints y delega el procesamiento al Controller.

Los endpoints disponibles para `services` son:

```bash
  GET /api/services
  POST /api/services
  GET /api/services/:sid
  PUT /api/services/:sid
  DELETE /api/services/:sid
```

Los endpoints disponibles para `bookings` son:

```bash
  POST /api/bookings
  GET /api/bookings/:bid
  POST /api/bookings/:bid/services/:sid
```

#### `Controller:`

Recibe la solicitud HTTP, obtiene los datos de req y llama al Service correspondiente.

Después devuelve la respuesta HTTP mediante res.

El Controller no accede directamente a la base de datos ni contiene la lógica de negocio.

#### `Service:`

Contiene la lógica de negocio y las validaciones.

Sus funciones en `services` son:

```bash
  getServices()
  getServiceById()
  createService()
  updateService()
  deleteService()
```

Sus funciones en `bookings` son:

```bash
  getBookings()
  getBookingById()
  createBooking()
  addServiceToBooking()
```

La lógica para agregar un servicio a una reserva y aumentar su propiedad quantity se encuentra en:
`bookings.service.js`

#### `Repository:`

Actúa como intermediario entre el Service y el DAO.

Sus funciones en `services` son:

```bash
  getServices()
  getServiceById()
  createService()
  updateService()
  deleteService()
```

Sus funciones en `bookings` son:

```bash
  getBookings()
  getBookingById()
  createBooking()
  addServiceToBooking()
```

Estas delegan las operaciones al DAO.

#### `DAO:`

Se encarga directamente del acceso a los datos mediante los modelos de Mongoose.

El DAO no contiene la lógica de negocio. Su responsabilidad es realizar las operaciones de acceso a MongoDB.

Para `services`, el DAO utiliza operaciones como:

```bash
  getAll()
  getById()
  create()
  update()
  delete()
```

Para `bookings`, el DAO utiliza:

```bash
  getAll()
  getById()
  create()
  update()
```

## Recurso `services`

El recurso `services` se utiliza para gestionar los servicios disponibles.

Los servicios se almacenan como documentos en MongoDB y cada uno recibe un ID único para cada uno.

Cada servicio contiene las siguientes propiedades:

- `id`: Identificador único del servicio.

- `name`: Nombre del servicio.

- `description`: Descripción del servicio.

- `duration`: Duración del servicio.

- `price`: Precio del servicio.

- `category`: Categoría del servicio.

- `available`: Indica si el servicio está disponible.

## Métodos de Services DAO

##### `getAll()`

Devuelve todos los servicios almacenados en MongoDB.

```js
dao.getAll()
```

##### `getById(id)`

Busca un servicio mediante su ID utilizando Mongoose. Si no existe un servicio con ese ID, devuelve null.

```js
dao.getById(id)
```

#### `create(data)`

Crea un nuevo servicio utilizando los datos recibidos. MongoDB genera automáticamente el _id del nuevo documento.

`data` tiene las siguientes propiedades:

- name: nombre del servicio.
- description: descripción del servicio.
- duration: duración del servicio.
- price: precio del servicio.
- category: categoría del servicio.
- available: indica si el servicio está disponible.

```js
dao.create(data)
```

#### `update(id, updatedData)`

Actualiza los datos de un servicio existente. Los campos que no se especifican mantienen su valor original.

```js
dao.update(id, updatedData)
```

#### `delete(id)`

Busca un servicio por su id y lo elimina de la lista.

```js
dao.delete(id)
```

## Recurso `bookings`

El recurso `bookings` se utiliza para gestionar las reservas realizadas por los clientes. Las reservas se almacenan como documentos en MongoDB y genera automáticamente el identificador _id de cada reserva. Cada servicio asociado a una reserva contiene su ID y la cantidad solicitada.

Cada reserva contiene las siguientes propiedades:

- `id`: Identificador único de la reserva.

- `clientName`: Nombre del cliente.

- `clientEmail`: Correo electrónico del cliente.

- `date`: Fecha de la reserva.

- `time`: Hora de la reserva.

- `status`: Estado actual de la reserva.

- `services`: Array que contiene los servicios asociados a la reserva. Cada servicio incluye su ID y la cantidad solicitada.

## Métodos

## Bookings DAO

El BookingsDao se encarga directamente del acceso a los datos de las reservas mediante el modelo bookingModel de Mongoose.

- El DAO no contiene la lógica de negocio. Su responsabilidad es realizar las operaciones de acceso a MongoDB.

##### `getAll()`

Devuelve todas las reservas almacenadas.

```js
dao.getAll()
```

##### `getById(id)`

Busca y devuelve una reserva mediante su ID. Si no encuentra ningúna reserva con ese ID, devuelve null.

```js
dao.getById(id)
```

#### `create(data)`

Crea una nueva reserva a partir de los datos recibidos. MongoDB genera automáticamente el _id de la nueva reserva.

`data` tiene las siguientes propiedades:

- clientName: nombre del cliente.
- clientEmail: email del cliente.
- date: fecha de la reserva.
- time: tiempo de la reserva.
- status: estado del servicio.
- services: almacena los tipos de servicios.

```js
dao.create(data)
```

#### `update(updatedData)`

Guarda los cambios realizados sobre un documento de reserva.

Recibe el documento actualizado y utiliza su método save() para persistir los cambios en MongoDB.

La lógica para agregar un servicio a una reserva y aumentar su quantity pertenece al Service. El DAO solamente recibe el documento ya modificado y lo guarda mediante save().

```js
dao.update(updatedData)
```

## Endpoints

### Services

#### GET `/api/services`

Obtiene todos los servicios almacenados.

```bash
  GET http://localhost:8080/api/services
```

Respuesta esperada:

```json
[
  {
    "id": "service-id",
    "name": "Consulta clínica",
    "description": "Consulta personalizada en consultorio clínico",
    "duration": 60,
    "price": 80,
    "category": "Consultas",
    "available": true
  }
]
```

Respuesta exitosa: `200`
Error: `500`

#### GET `/api/services/:sid`

Obtiene un servicio mediante su ID.

```bash
  GET http://localhost:8080/api/services/service-id
```

Respuesta esperada:

```json
[
  {
    "id": "service-id",
    "name": "Consulta clínica",
    "description": "Consulta personalizada en consultorio clínico",
    "duration": 60,
    "price": 80,
    "category": "Consultas",
    "available": true
  }
]
```

Respuesta exitosa: `200`
Error: `500`

#### POST `/api/services`

Crea un nuevo servicio.

```bash
  POST http://localhost:8080/api/services
```

Body:

```json
[
  {
    "name": "Consulta clínica",
    "description": "Consulta personalizada en consultorio clínico",
    "duration": 60,
    "price": 80,
    "category": "Consultas",
    "available": true
  }
]
```

El ID se genera automáticamente mediante crypto.randomUUID().

Respuesta esperada:

```json
[
  {
    "id": "service-id",
    "name": "Consulta clínica",
    "description": "Consulta personalizada en consultorio clínico",
    "duration": 60,
    "price": 80,
    "category": "Consultas",
    "available": true
  }
]
```

Respuesta exitosa: `200`
Error: `500`

#### PUT `/api/services/:sid`

Actualiza los datos de un servicio existente.

```bash
  PUT http://localhost:8080/api/services/service-id
```

Body:

```json
[
  {
    "price": 90,
    "available": false
  }
]
```

Los campos que no se especifican mantienen su valor original.

Respuesta esperada:

```json
[
  {
    "id": "service-id",
    "name": "Consulta clínica",
    "description": "Consulta personalizada en consultorio clínico",
    "duration": 60,
    "price": 90,
    "category": "Consultas",
    "available": false
  }
]
```

Respuesta exitosa: `200`
Error: `500`

#### PUT `/api/services/:sid`

Actualiza los datos de un servicio existente.

```bash
  PUT http://localhost:8080/api/services/service-id
```

Body:

```json
[
  {
    "price": 90,
    "available": false
  }
]
```

Los campos que no se especifican mantienen su valor original.

Respuesta esperada:

```json
[
  {
    "id": "service-id",
    "name": "Consulta clínica",
    "description": "Consulta personalizada en consultorio clínico",
    "duration": 60,
    "price": 90,
    "category": "Consultas",
    "available": false
  }
]
```

Respuesta exitosa: `200`
Error: `500`

#### DELETE `/api/services/:sid`

Elimina un servicio mediante su ID.

```bash
  DELETE http://localhost:8080/api/services/service-id
```

Respuesta exitosa: `200`
Error: `500`

### Bookings

#### POST `/api/bookings`

Crea una nueva reserva.

```bash
  POST http://localhost:8080/api/bookings
```

Body:

```json
[
  {
    "clientName": "Matias Rodriguez",
    "clientEmail": "matias@hotmail.com",
    "date": "2026-10-10",
    "time": "10:00",
    "status": "confirmed"
  }
]
```

La reserva se crea inicialmente con un array services vacío.

Respuesta esperada:

```json
[
  {
    "id": "booking-id",
    "clientName": "Matias Rodriguez",
    "clientEmail": "matias@hotmail.com",
    "date": "2026-10-10",
    "time": "10:00",
    "status": "confirmed",
    "services": []
  }
]
```

Respuesta exitosa: `200`
Error: `500`

#### GET `/api/bookings/bid`

Obtiene una reserva mediante su ID.

```bash
  GET  http://localhost:8080/api/bookings/booking-id
```

La reserva se crea inicialmente con un array services vacío.

Respuesta esperada:

```json
[
  {
    "id": "booking-id",
    "clientName": "Matias Rodriguez",
    "clientEmail": "matias@hotmail.com",
    "date": "2026-10-10",
    "time": "10:00",
    "status": "confirmed",
    "services": []
  }
]
```

Respuesta exitosa: `200`
Error: `500`

#### POST `/api/bookings/:bid/services/:sid`

Agrega un servicio existente a una reserva.

```bash
POST http://localhost:8080/api/bookings/booking-id/services/service-id
```

El Service busca la reserva y comprueba si el servicio ya está asociado.

Si el servicio no existe en la reserva, se agrega con:

```json
{
  "id": "service-id",
  "quantity": 1
}
```

Si el servicio ya existe, se incrementa su quantity en 1.

```json
[
  {
    "id": "booking-id",
    "clientName": "Matias Rodriguez",
    "clientEmail": "matias@hotmail.com",
    "date": "2026-10-10",
    "time": "10:00",
    "status": "confirmed",
    "services": [
      {
        "id": "service-id",
        "quantity": 1
      }
    ]
  }
]
```

Respuesta exitosa: `200`
Error: `500`

##### Cómo probar los endpoints

Los endpoints pueden probarse utilizando herramientas como `Postman`, `Insomnia` o `Thunder Client`.

## Ejecución

Para ejecutar el proyecto en modo desarrollo:

```bash
npm run dev
```
