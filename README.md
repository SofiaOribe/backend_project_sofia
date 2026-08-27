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

### Métodos

#### `getServices()`

Devuelve todos los servicios almacenados.

```js
serviceManager.getServices()
```

#### `getServicesById()`

Busca y devuelve un servicio mediante su ID. Si no encuentra ningún servicio con ese ID, devuelve un error.

```js
serviceManager.getServicesById(id)
```

#### `addService(name, description, duration, price, category, available)`

Crea un nuevo servicio y lo agrega a la lista. Todos los campos son obligatorios.

```js
serviceManager.addService(
  "Consulta clínica",
  "Consulta personalizada en consultorio clínico",
  60,
  80,
  "Consultas",
  true,
)
```

#### `updateService(id, data)`

Actualiza los datos de un servicio existente. Los campos que no se especifican mantienen su valor original.

```js
serviceManager.updateService("service-id", {
  price: 90,
  available: false,
})
```

#### `deleteService(name)`

Busca un servicio por su nombre y lo elimina de la lista.

```js
serviceManager.deleteService("Consulta")
```

## Ejecución

Para ejecutar el proyecto en modo desarrollo:

```bash
npm run dev
```

<!-- ----------------------------- -->

# ~ Deutsch

# Backend-System für Termine und Reservierungen

Backend-API zur Verwaltung von Dienstleistungen und Terminreservierungen. Das Projekt verwendet Node.js und Express.

## Technologien

- Node.js
- Express

<!-- - MongoDB Atlas
- Mongoose
- Handlebars
- Socket.io
- Zod -->

- ESM mit `import/export`
- ESLint
- Prettier

## Installation

```bash
npm install
```

## Umgebungsvariablen

Erstelle eine `.env`-Datei im Stammverzeichnis des Projekts und verwende dabei `.env.example` als Vorlage.

```env
PORT=8080

APP_NAME=Backend-System für Termine und Reservierungen

APP_ENV=development

MONGO_URL=deine_MongoDB_URL
```

## Ressource `services`

### Methoden

#### `getServices()`

Gibt alle gespeicherten Services zurück.

```js
serviceManager.getServices()
```

#### `getServicesById()`

Sucht einen Service anhand seiner ID und gibt ihn zurück. Wenn kein Service mit dieser ID gefunden wird, wird ein Fehler ausgegeben.

```js
serviceManager.getServicesById(id)
```

#### `addService(name, description, duration, price, category, available)`

Erstellt einen neuen Service und fügt ihn zur Liste hinzu. Alle Felder sind erforderlich.

```js
serviceManager.addService(
  "Klinische Beratung",
  "Persönliche Beratung in einer klinischen Praxis",
  60,
  80,
  "Beratungen",
  true,
)
```

#### `updateService(id, data)`

Aktualisiert die Daten eines bestehenden Services. Die Felder, die nicht angegeben werden, behalten ihren ursprünglichen Wert.

```js
serviceManager.updateService("service-id", {
  price: 90,

  available: false,
})
```

**#### `deleteService(name)`**

Sucht einen Service anhand seines Namens und entfernt ihn aus der Liste.

```js
serviceManager.deleteService("Beratung")
```

## Ausführung

Um das Projekt im Entwicklungsmodus auszuführen:

```bash
npm run dev
```
