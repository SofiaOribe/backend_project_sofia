# Sistema Backend de turnos y reservas

API backend para gestionar servicios y reservas de turnos. El proyecto utiliza Node.js, Express, MongoDB Atlas, Handlebars, Socket.io y Zod.

## Tecnlogías

- Node.js
- Express

<!--
 MongoDB Atlas
 Mongoose
 Handlebars
 Socket.io
 Zod -->

- ESM con import/export
- ESLint
- Prettier

## Instalación

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

### Arquitectura en capas

El proceso para gestionar los servicios sigue el siguiente flujo:

Router → Controller → Service → Repository → DAO → archivo JSON

#### `Router:`

Define las rutas de la API y recibe las solicitudes HTTP. Por ejemplo, GET /, POST /, GET /:id, PUT /:id y DELETE /:id.

#### `Controller:`

Recibe la solicitud, obtiene los datos de req y llama al Service correspondiente. Después devuelve la respuesta HTTP mediante res.

#### `Service:`

Contiene la lógica de negocio y las validaciones.
Sus funciones en services son: getServices(), getServiceById(), createService(), updateService() y deleteService().
Sus funciones en bookings son: getBookings(), getBookingById(), createBooking() y addServiceToBooking() .

#### `Repository:`

Actúa como intermediario entre el Service y el DAO.
Sus funciones en services son: (getServices(), getServiceById(), createService(), updateService() y deleteService()) y delegan las operaciones al DAO.
Sus funciones en bookings son: getBookings(), getBookingById(), createBooking() y addServiceToBooking() y delegan las operaciones al DAO.

#### `DAO:`

Se encarga directamente del acceso a los datos.
Sus funciones en services son: getAll(), getById(), create(), update() y delete() leen, buscan, crean, actualizan y eliminan servicios en el archivo JSON.
Sus funciones en bookings son: getAll(), getById(), create() y update() leen, buscan, crean bookings y actualizan servicios en el archivo JSON.

#### `Archivo JSON:`

Almacena los servicios de forma persistente.

## Recurso `services`

El recurso `services` se utiliza para gestionar los servicios disponibles. Los servicios se almacenan en un array y cada uno recibe un ID único generado mediante `crypto.randomUUID()`.

Cada servicio contiene las siguientes propiedades:

- `id`: Identificador único del servicio.

- `name`: Nombre del servicio.

- `description`: Descripción del servicio.

- `duration`: Duración del servicio.

- `price`: Precio del servicio.

- `category`: Categoría del servicio.

- `available`: Indica si el servicio está disponible.

## Métodos

##### `getAll()`

Devuelve todos los servicios almacenados.

```js
dao.getAll()
```

##### `getById()`

Busca y devuelve un servicio mediante su ID. Si no encuentra ningún servicio con ese ID, devuelve un error.

```js
dao.getById(id)
```

#### `create(data)`

Crea un nuevo servicio a partir de los datos recibidos. Verifica que todos los campos obligatorios estén presentes. Si algún campo falta, devuelve null. Si los datos son válidos, genera un ID único con crypto.randomUUID(), agrega el nuevo servicio a la lista y guarda los cambios.

`data` tiene las siguientes propiedades:

- name: nombre del servicio.
- description: descripción del servicio.
- duration: duración del servicio.
- price: precio del servicio.
- category: categoría del servicio.
- available: indica si el servicio está disponible.

```js
dao.create(
  "Consulta clínica",
  "Consulta personalizada en consultorio clínico",
  60,
  80,
  "Consultas",
  true,
)
```

#### `update(id, updatedData)`

Actualiza los datos de un servicio existente. Los campos que no se especifican mantienen su valor original.

```js
dao.update("service-id", {
  price: 90,
  available: false,
})
```

#### `delete(name)`

Busca un servicio por su nombre y lo elimina de la lista.

```js
dao.delete("Consulta")
```

## Recurso `bookings`

El recurso `bookings` se utiliza para gestionar las reservas realizadas por los clientes. Las reservas se almacenan en un array y cada una recibe un ID único generado mediante `crypto.randomUUID()`.

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

##### `getAll()`

Devuelve todas los reserva almacenadas.

```js
dao.getAll()
```

##### `getById()`

Busca y devuelve una reserva mediante su ID. Si no encuentra ningúna reserva con ese ID, devuelve un error.

```js
dao.getById(id)
```

#### `create(data)`

Crea una nueva reserva a partir de los datos recibidos. Verifica que todos los campos obligatorios estén presentes. Si falta alguno, devuelve null. Si los datos son válidos, genera un ID único con crypto.randomUUID(), crea la nueva reserva con un array services vacío, la agrega a la lista y guarda los cambios.

`data` tiene las siguientes propiedades:

- clientName: nombre del cliente.
- clientEmail: email del cliente.
- date: fecha de la reserva.
- time: tiempo de la reserva.
- status: estado del servicio.
- services: almacena los tipos de servicios.

```js
dao.create("Matias Rodriguez", "matias@hotmail.com", "2026-10-10", "10:00", "confirmed")
```

#### `update(id, updatedData)`

Actualiza una reserva agregando un servicio a la lista de servicios asociados. Primero busca la reserva mediante su bookingId. Si la reserva no existe, devuelve null.

Si la reserva existe, comprueba si el servicio indicado por serviceId ya está agregado:

- Si el servicio ya existe, aumenta su quantity en 1.
- Si el servicio no existe, lo agrega a la reserva con una cantidad inicial de 1.

```js
dao.update("booking-id", "service-id")
```

## Ejecución

Para ejecutar el proyecto en modo desarrollo:

```bash
npm run dev
```
