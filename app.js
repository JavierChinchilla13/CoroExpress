require("dotenv").config();
require("express-async-errors");

const path = require("path");
const express = require("express");
const app = express();

// Seguridad y limpieza
const helmet = require("helmet");
const xss = require("xss-clean");

const cors = require("cors");

// Paquetes adicionales
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const fileUpload = require("express-fileupload");

// database
const connectDB = require("./db/connect");

//  routers
const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");
const casilleroRouter = require("./routes/casilleroRoutes");
const pedidoRouter = require("./routes/pedidoRoutes");

// middleware
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

// Configuración de seguridad
app.set("trust proxy", 1); // Para proxies como Heroku
app.use(express.json()); // Parsear JSON
app.use(cookieParser(process.env.JWT_SECRET)); // Cookies firmadas
app.use(fileUpload({ useTempFiles: true })); // Subida de archivos
app.use(morgan("tiny")); // Logger de solicitudes HTTP
app.use(cors());
app.use("/pdfs", express.static(path.join(__dirname, "public/pdfs")));

// Configuración de Helmet
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: [
          "'self'",
          "https://unpkg.com",
          "https://cdnjs.cloudflare.com",
        ],
        styleSrc: [
          "'self'",
          "'unsafe-inline'",
          "https://unpkg.com",
          "https://cdnjs.cloudflare.com",
        ],
        fontSrc: ["'self'", "https://unpkg.com"],
        imgSrc: ["'self'", "data:", "https:"],
        frameSrc: [
          "'self'",
          "https://www.google.com",
          "https://www.youtube.com",
        ],
      },
    },
  })
);
app.use(xss()); // Protección contra XSS

// Middleware para tipos MIME correctos
app.use((req, res, next) => {
  if (req.path.endsWith(".js")) {
    res.type("application/javascript");
  } else if (req.path.endsWith(".css")) {
    res.type("text/css");
  }
  next();
});

// Servir archivos estáticos
app.use(express.static(path.resolve(__dirname, "client/dist")));

// Rutas de API
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/casillero", casilleroRouter);
app.use("/api/v1/pedido", pedidoRouter);

// Ruta para SPA (Single Page Application)
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client/dist", "index.html"));
});

// Middleware de errores
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

// Inicialización del servidor
const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
