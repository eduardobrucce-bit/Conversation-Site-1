import type { Handler } from "@netlify/functions";
import { drizzle } from "drizzle-orm/node-postgres";
import { pgTable, integer, text, jsonb } from "drizzle-orm/pg-core";
import pg from "pg";

const { Pool } = pg;

const productsTable = pgTable("products", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  tag: text("tag").notNull(),
  imgs: jsonb("imgs").notNull().$type<string[]>(),
  price: text("price").notNull(),
  sizes: jsonb("sizes").notNull().$type<string[]>(),
});

let pool: pg.Pool | null = null;

function getDb() {
  if (!pool) {
    pool = new Pool({ connectionString: process.env.DATABASE_URL });
  }
  return drizzle(pool);
}

export const handler: Handler = async (event) => {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, PUT, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers, body: "" };
  }

  const db = getDb();

  if (event.httpMethod === "GET") {
    try {
      const products = await db.select().from(productsTable).orderBy(productsTable.id);
      return { statusCode: 200, headers, body: JSON.stringify(products) };
    } catch {
      return { statusCode: 500, headers, body: JSON.stringify({ error: "Erro ao buscar produtos" }) };
    }
  }

  if (event.httpMethod === "PUT") {
    try {
      const products = JSON.parse(event.body || "[]");

      if (!Array.isArray(products)) {
        return { statusCode: 400, headers, body: JSON.stringify({ error: "Formato inválido" }) };
      }

      for (const p of products) {
        await db
          .insert(productsTable)
          .values({ id: p.id, name: p.name, tag: p.tag, imgs: p.imgs, price: p.price, sizes: p.sizes })
          .onConflictDoUpdate({
            target: productsTable.id,
            set: { name: p.name, tag: p.tag, imgs: p.imgs, price: p.price, sizes: p.sizes },
          });
      }

      return { statusCode: 200, headers, body: JSON.stringify({ ok: true }) };
    } catch {
      return { statusCode: 500, headers, body: JSON.stringify({ error: "Erro ao salvar produtos" }) };
    }
  }

  return { statusCode: 405, headers, body: JSON.stringify({ error: "Method Not Allowed" }) };
};
