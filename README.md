# Sistema Backend de Turnos y Reservas

API backend para administrar servicios y reservas. El proyecto utiliza Node.js, Express, MongoDB con Mongoose, validaciones con Zod, vistas con Handlebars y eventos en tiempo real mediante Socket.io.

Repositorio: [backend_project_sofia](https://github.com/SofiaOribe/backend_project_sofia)

## Tecnologías

- Node.js y Express
- MongoDB Atlas y Mongoose
- `mongoose-paginate-v2` para paginación de servicios
- Zod para validar la creación de servicios
- Handlebars para las vistas
- Socket.io para notificar cambios en servicios y reservas
- ESLint y Prettier

## Requisitos

- Node.js y npm
- Una base de datos MongoDB Atlas o una instancia MongoDB accesible
- Una URI de conexión válida para MongoDB

## Instalación y ejecución

Cloná el repositorio e instalá las dependencias:

```bash
git clone https://github.com/SofiaOribe/backend_project_sofia.git
cd backend_project_sofia
npm install
```

Creá un archivo `.env` en la raíz del proyecto. Podés usar `.env.example` como referencia:

```env
PORT=8080
NODE_ENV=development
MONGO_URI=mongodb+srv://<USER>:<PASSWORD>@<CLUSTER>.mongodb.net/<DB_NAME>?retryWrites=true&w=majority
```

Reemplazá los valores de ejemplo por los de tu propia base de datos. No compartas ni subas el archivo `.env` con credenciales reales.

Para iniciar el servidor en modo desarrollo:

```bash
npm run dev
```

Para iniciar el servidor normalmente:

```bash
npm start
```

El puerto predeterminado es `8080`, salvo que se configure otro valor en `PORT`.

## Estructura del proyecto

```text
backend_project_sofia/
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
├── eslint.config.js
├── .prettierrc.json
└── src/
    ├── app.js
    ├── server.js
    ├── config/
    │   ├── db.js
    │   ├── env.config.js
    │   └── handlebars.js
    ├── controllers/
    │   ├── bookings.controller.js
    │   ├── services.controller.js
    │   └── view.controller.js
    ├── dao/
    │   ├── bookings.mongo.dao.js
    │   └── services.mongo.dao.js
    ├── middlewares/
    │   ├── errorHandler.js
    │   ├── routingDetector.js
    │   └── validateServices.js
    ├── models/
    │   ├── bookings.model.js
    │   └── services.model.js
    ├── public/
    │   ├── css/
    │   │   └── styles.css
    │   └── js/
    │       ├── bookings.js
    │       └── services.js
    ├── repositories/
    │   ├── bookings.repository.js
    │   ├── messages.repository.js
    │   └── services.repository.js
    ├── routes/
    │   ├── bookings.router.js
    │   ├── services.router.js
    │   └── view.router.js
    ├── services/
    │   ├── bookings.service.js
    │   └── services.service.js
    └── views/
        ├── layouts/
        │   └── main.handlebars
        ├── bookings.handlebars
        └── services.handlebars
```

## Arquitectura en capas

El código separa la recepción de solicitudes, la lógica de negocio y el acceso a MongoDB:

```text
Routes → Controllers → Services → Repositories → DAO → Models → MongoDB
```

- **Routes:** declaran los endpoints y asignan cada solicitud al controller correspondiente.
- **Controllers:** reciben la solicitud HTTP, llaman al servicio de aplicación y construyen la respuesta.
- **Services:** aplican reglas de negocio, por ejemplo, aumentar `quantity` cuando se agrega a una reserva un servicio que ya estaba asociado.
- **Repositories:** forman la capa intermedia entre los servicios y el DAO.
- **DAO:** realiza las consultas y modificaciones mediante Mongoose.
- **Models:** definen la estructura de los documentos de servicios y reservas.
- **Middlewares:** validan datos de entrada y gestionan solicitudes no encontradas o errores.
- **Views y public:** contienen las vistas Handlebars, estilos y JavaScript del navegador.

La conexión a MongoDB se configura en `src/config/db.js`; las variables de entorno se leen desde `src/config/env.config.js`. `src/app.js` configura Express, las rutas, Handlebars y Socket.io. `src/server.js` conecta la base de datos e inicia el servidor HTTP.

## Modelo de datos

### Servicio

Los servicios utilizan los campos siguientes:

| Campo | Tipo | Descripción |
|---|---|---|
| `name` | String | Nombre del servicio |
| `description` | String | Descripción |
| `duration` | Number | Duración |
| `price` | Number | Precio |
| `category` | String | Categoría |
| `available` | Boolean | Indica si está disponible |

### Reserva

Las reservas utilizan `clientName`, `clientEmail`, `date`, `time`, `status` y un array `services`. Cada elemento del array guarda la referencia del servicio y la cantidad, no una copia completa del servicio:

```json
{
  "service": "66a123456789abcdef123456",
  "quantity": 2
}
```

El campo `service` es una referencia `ObjectId` al modelo de servicios. Al consultar una reserva, Mongoose usa `populate("services.service")` para incluir los datos relacionados del servicio.

## API: servicios

La base de las rutas es `/api/services`.

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/api/services` | Lista servicios con filtros y paginación |
| POST | `/api/services` | Crea un servicio; pasa por el middleware Zod |
| GET | `/api/services/:sid` | Consulta un servicio por ID |
| PUT | `/api/services/:sid` | Actualiza un servicio |
| DELETE | `/api/services/:sid` | Elimina un servicio |

### Crear un servicio

Ejemplo de solicitud a `POST /api/services`:

```json
{
  "name": "Consulta inicial",
  "description": "Primera consulta con el cliente",
  "duration": 30,
  "price": 45,
  "category": "Consulta",
  "available": true
}
```

El body debe ser un objeto JSON. Los campos numéricos deben enviarse como números y `available` como booleano, no como texto.

### Filtros, paginación y ordenamiento

El endpoint `GET /api/services` acepta estos query params en la implementación actual:

| Parámetro | Ejemplo | Función |
|---|---|---|
| `name` | `?name=consulta` | Busca nombres que contengan el texto, sin distinguir mayúsculas y minúsculas |
| `category` | `?category=Consulta` | Filtra por categoría exacta |
| `available` | `?available=true` | Filtra disponibilidad con `true` o `false` |
| `page` | `?page=2` | Selecciona la página |
| `limit` | `?limit=5` | Cantidad de resultados por página |
| `sortBy` | `?sortBy=price` | Campo por el que ordenar |
| `order` | `?order=desc` | `desc` para descendente; otro valor produce ascendente cuando se usa `sortBy` |

Ejemplos:

```http
GET /api/services?name=consulta
GET /api/services?category=Consulta&available=true
GET /api/services?page=2&limit=5
GET /api/services?sortBy=price&order=asc
GET /api/services?category=Consulta&page=1&limit=10&sortBy=price&order=desc
```

La paginación utiliza `mongoose-paginate-v2`. La respuesta incluye metadatos de paginación y los documentos dentro de `docs`; las vistas Handlebars utilizan, por ejemplo, `services.docs`, `services.hasNextPage` y `services.hasPrevPage`.

**Importante:** `sortBy` se usa directamente como campo de ordenamiento en el DAO. Para un entorno de producción conviene limitarlo a una lista de campos permitidos y validar los valores de `page` y `limit`.

### Actualizar o eliminar un servicio

Para actualizar un servicio, enviá un objeto JSON a `PUT /api/services/:sid`. Por ejemplo:

```json
{
  "price": 50,
  "available": false
}
```

Para eliminarlo:

```http
DELETE /api/services/66a123456789abcdef123456
```

Usá un `sid` que exista en tu base de datos.

## API: reservas

La base de las rutas es `/api/bookings`.

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/api/bookings` | Lista reservas con los servicios asociados poblados |
| POST | `/api/bookings` | Crea una reserva |
| GET | `/api/bookings/:bid` | Consulta una reserva por ID, con datos de sus servicios |
| DELETE | `/api/bookings/:bid` | Elimina una reserva |
| POST | `/api/bookings/:bid/services/:sid` | Asocia un servicio a una reserva |

### Crear una reserva

Solicitud a `POST /api/bookings`:

```json
{
  "clientName": "Alex Example",
  "clientEmail": "alex@example.com",
  "date": "2026-11-05",
  "time": "10:30",
  "status": "pending"
}
```

En el código actual, el servicio de reservas comprueba que `clientName`, `clientEmail`, `date`, `time` y `status` estén presentes. Esta validación se realiza en la capa Service; actualmente no hay un middleware Zod equivalente para las reservas.

### Asociar un servicio a una reserva

Usá el ID de la reserva (`bid`) y el ID del servicio (`sid`):

```http
POST /api/bookings/66b123456789abcdef123456/services/66a123456789abcdef123456
```

La lógica de negocio aumenta en uno la cantidad si el servicio ya está asociado a la reserva. Si todavía no está, agrega una referencia `ObjectId` con `quantity: 1`.

### Consultar una reserva con los servicios completos

```http
GET /api/bookings/66b123456789abcdef123456
```

La capa DAO usa esta consulta de Mongoose:

```js
bookingModel
  .findById(id)
  .populate("services.service")
  .lean()
```

Así, cada elemento de `services` incluye el documento del servicio relacionado en `service`, además de `quantity`. La respuesta del controller tiene la forma general:

```json
{
  "message": "Reserva obtenida correctamente",
  "booking": {
    "_id": "66b123456789abcdef123456",
    "clientName": "Alex Example",
    "clientEmail": "alex@example.com",
    "date": "2026-11-05",
    "time": "10:30",
    "status": "pending",
    "services": [
      {
        "service": {
          "_id": "66a123456789abcdef123456",
          "name": "Consulta inicial",
          "description": "Primera consulta con el cliente",
          "duration": 30,
          "price": 45,
          "category": "Consulta",
          "available": true
        },
        "quantity": 1
      }
    ]
  }
}
```

Los IDs del ejemplo son ilustrativos; reemplazalos por IDs reales de tu base de datos.

## Validaciones aplicadas

### Servicios: Zod

El middleware `src/middlewares/validateServices.js` valida el body de creación antes de llegar a la lógica de negocio:

- `name`, `description` y `category`: deben ser strings no vacíos.
- `duration`: debe ser un número positivo.
- `price`: debe ser un número positivo.
- `available`: debe ser un booleano.

Si la validación falla, responde con estado HTTP `400`, el mensaje `Datos inválidos` y un array `details` con los problemas detectados.

Ejemplo de respuesta de validación:

```json
{
  "error": "Datos inválidos",
  "details": [
    {
      "message": "El nombre es obligatorio"
    }
  ]
}
```

La validación Zod está conectada actualmente a la ruta `POST /api/services`. Aunque el controller también permite `PUT`, esa ruta no usa este middleware en la configuración actual. Las reservas tienen comprobaciones de campos obligatorios en la capa Service, pero todavía no un esquema Zod dedicado.

## Vistas Handlebars

Además de la API JSON, el proyecto incluye vistas para gestionar los datos desde el navegador:

- `/services`: muestra los servicios, permite crear servicios, cambiar el precio, modificar disponibilidad y eliminarlos.
- `/bookings`: muestra reservas, sus servicios asociados y acciones para crear reservas, asociar servicios y eliminar reservas.

Los templates se encuentran en `src/views`, el layout principal en `src/views/layouts/main.handlebars` y los recursos estáticos en `src/public`.

## Tiempo real con Socket.io

Socket.io está configurado sobre el servidor HTTP. El backend emite eventos al crear, actualizar o eliminar servicios y al crear, actualizar o eliminar reservas:

- `service:created`
- `service:updated`
- `service:deleted`
- `booking:created`
- `booking:updated`
- `booking:deleted`

Los archivos de cliente `src/public/js/services.js` y `src/public/js/bookings.js` escuchan eventos para refrescar la vista. El refresco actual utiliza `window.location.reload()`, por lo que la página se vuelve a cargar al recibir esos eventos.

## Scripts disponibles

| Comando | Descripción |
|---|---|
| `npm run dev` | Inicia el servidor con reinicio automático mediante `node --watch` |
| `npm start` | Inicia el servidor |
| `npm run lint` | Ejecuta ESLint |
| `npm run format` | Formatea archivos con Prettier |

El script `npm test` actualmente es un placeholder y termina con un mensaje de que no hay pruebas configuradas.

## Seguridad y configuración

- Usá un archivo local `.env` para las credenciales.
- Conservá `.env.example` con valores de ejemplo, sin secretos.
- No subas `.env`, `node_modules` ni credenciales.
- No publiques URLs de conexión reales, contraseñas ni claves privadas.

## Probar la API

Podés probar las solicitudes HTTP con Postman, Insomnia o Thunder Client. Primero verificá que el servidor esté conectado a MongoDB. Para las operaciones de creación y actualización, enviá el header `Content-Type: application/json` y el body JSON que corresponda.

