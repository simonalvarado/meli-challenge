import express from "express";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import cors from "cors";

const app = express();
const port = 6001;

// Define la ruta del archivo de base de datos
const file = "./db.json";

// Define los datos por defecto
const defaultData = { items: [] };

// Crea un adaptador para el archivo
const adapter = new JSONFile(file);

// Inicializa Low con el adaptador y los datos por defecto
const db = new Low(adapter, defaultData);

// Middleware para parsear JSON
app.use(express.json());
app.use(cors());

// Lee la base de datos antes de manejar cualquier solicitud
app.use(async (req, res, next) => {
  await db.read();
  next();
});

// Ruta para obtener items con paginación y búsqueda
app.get("/api/items", (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const perPage = parseInt(req.query.per_page) || 10;
  const query = req.query.query || "";

  let filteredItems = db.data.items;

  // Aplicar filtro de búsqueda si se proporciona una consulta
  if (query) {
    filteredItems = filteredItems.filter((item) =>
      item.title.toLowerCase().includes(query.toLowerCase())
    );
  }

  // Aplicar paginación
  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;
  const paginatedItems = filteredItems.slice(startIndex, endIndex);

  res.json({
    items: paginatedItems,
    total: filteredItems.length,
    page: page,
    per_page: perPage,
    total_pages: Math.ceil(filteredItems.length / perPage),
  });
});

// Ruta para agregar un nuevo item
app.post("/api/items", async (req, res) => {
  const newItem = req.body;
  db.data.items.push(newItem);
  await db.write();
  res.status(201).json(newItem);
});

// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
