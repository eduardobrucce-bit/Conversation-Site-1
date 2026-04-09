import { Router } from "express";
import { db, productsTable } from "@workspace/db";

const productsRouter = Router();

productsRouter.get("/products", async (_req, res) => {
  try {
    const products = await db.select().from(productsTable).orderBy(productsTable.id);
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar produtos" });
  }
});

productsRouter.put("/products", async (req, res) => {
  try {
    const products = req.body as Array<{
      id: number;
      name: string;
      tag: string;
      imgs: string[];
      price: string;
      sizes: string[];
    }>;

    if (!Array.isArray(products)) {
      return res.status(400).json({ error: "Formato inválido" });
    }

    for (const p of products) {
      await db
        .insert(productsTable)
        .values({
          id: p.id,
          name: p.name,
          tag: p.tag,
          imgs: p.imgs,
          price: p.price,
          sizes: p.sizes,
        })
        .onConflictDoUpdate({
          target: productsTable.id,
          set: {
            name: p.name,
            tag: p.tag,
            imgs: p.imgs,
            price: p.price,
            sizes: p.sizes,
          },
        });
    }

    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: "Erro ao salvar produtos" });
  }
});

export default productsRouter;
