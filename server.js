import express from "express";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import cors from "cors";

const app = express();
const port = 6001;

const file = "./db.json";

const defaultData = { items: [] };

const adapter = new JSONFile(file);

const db = new Low(adapter, defaultData);

app.use(express.json());
app.use(cors());

app.use(async (req, res, next) => {
  await db.read();
  next();
});

app.get("/api/items", (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const perPage = parseInt(req.query.per_page) || 10;
  const query = req.query.query || "";

  let filteredItems = db.data.items;

  if (query) {
    filteredItems = filteredItems.filter((item) =>
      item.title.toLowerCase().includes(query.toLowerCase())
    );
  }

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

app.post("/api/items", async (req, res) => {
  const newItem = req.body;
  db.data.items.push(newItem);
  await db.write();
  res.status(201).json(newItem);
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
