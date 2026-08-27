import dotenv from "dotenv"

dotenv.config()

// process: nos permite leer variables de entorno (como claves secretas de bases de datos) mediante process.env. Es el puente entre tu código y el sistema operativo que lo aloja.

const config = {
  PORT: process.env.PORT || 8080,
  /*   
    mongoUri: process.env.MONGO_URI,
    nodeEnv: process.env.NODE_ENV || 'development',
   */
}

export default config
