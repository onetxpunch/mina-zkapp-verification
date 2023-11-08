import { Hono } from "hono";
import { execSecure } from "./sandbox";
import { Database } from "bun:sqlite";

const db = new Database(":memory:");

const app = new Hono();

app.post("/test", async (c) => {
  const { input } = await c.req.json();
  const out = await execSecure(input);
  return c.json({ out });
});

app.get("/verify/:id", async (c) => {
  const id = c.req.param("id");
  return c.json({});
});

export default app;
