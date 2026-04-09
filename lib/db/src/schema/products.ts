import { pgTable, integer, text, jsonb } from "drizzle-orm/pg-core";

export const productsTable = pgTable("products", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  tag: text("tag").notNull(),
  imgs: jsonb("imgs").notNull().$type<string[]>(),
  price: text("price").notNull(),
  sizes: jsonb("sizes").notNull().$type<string[]>(),
});

export type Product = typeof productsTable.$inferSelect;
