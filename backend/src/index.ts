import express from "express";
import { Pool } from "pg";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

// Database connection
const pool = new Pool({
  user: "yourusername",
  host: "your-db-endpoint",
  database: "task_manager",
  password: "yourpassword",
  port: 5432,
});

app.use(bodyParser.json());

app.get("/tasks", async (req, res) => {
  const { rows } = await pool.query("SELECT * FROM tasks");
  res.json(rows);
});

app.post("/tasks", async (req, res) => {
  const { title, description, status } = req.body;
  const { rows } = await pool.query(
    "INSERT INTO tasks (title, description, status) VALUES ($1, $2, $3) RETURNING *",
    [title, description, status]
  );
  res.json(rows[0]);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
