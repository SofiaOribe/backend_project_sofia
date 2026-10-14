import path from "path"
import { engine } from "express-handlebars"

const configureHandlebars = (app, __dirname) => {
  app.engine(
    "handlebars",
    engine({
      defaultLayout: "main",
      extname: ".handlebars",

      /*       layoutsDir: path.join(__dirname, "views/layouts"), */
    }),
  )

  app.set("view engine", "handlebars")
  app.set("views", path.join(__dirname, "views"))
}

export default configureHandlebars
