import { Hono } from "hono";
import { bearerAuth } from "hono/bearer-auth";
import { execSecure, execPoc } from "./sandbox.ts";
import { Database } from "bun:sqlite";
import { migrate } from "drizzle-orm/bun-sqlite/migrator";
import { drizzle } from "drizzle-orm/bun-sqlite";
import { data } from "./schema.ts";
import { nanoid } from "nanoid";
import { mkdir } from "fs/promises";
import { eq } from "drizzle-orm";

const db = drizzle(new Database(":memory:"));

await migrate(db, { migrationsFolder: "db" });

const app = new Hono();

app.post(
  "/test",
  bearerAuth({ token: process.env.ZKAPP_VERIFY_BEARER as string }),
  async (c) => {
    const { input: userCode, publicKey, compilerVersion } = await c.req.json();
    const out = await execPoc(userCode, publicKey, compilerVersion);
    await db.insert(data).values({
      id: nanoid(),
      verificationHash: out,
      input: userCode,
      o1jsVersion: compilerVersion,
      publicKey: publicKey,
    });

    return c.json({ out });
  }
);

app.get("/verify/:id", async (c) => {
  const id = c.req.param("id");
  const r = await db.select().from(data).where(eq(data.verificationHash, id));
  if (r) return c.json(r);
  else return c.json({});
});

export default app;
