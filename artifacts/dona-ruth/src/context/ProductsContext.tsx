import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface Product {
  id: number;
  name: string;
  tag: string;
  imgs: string[];
  price: string;
  sizes: string[];
}

const DEFAULT_PRODUCTS: Product[] = [
  { id: 1, name: "Nova Coleção Dona Ruth", tag: "Nova Coleção", imgs: ["/peca-1.jpg"], price: "R$ 189,90", sizes: ["P", "M", "G", "GG", "XGG"] },
  { id: 2, name: "Nova Coleção Dona Ruth", tag: "Nova Coleção", imgs: ["/peca-2.jpg"], price: "R$ 219,90", sizes: ["M", "G", "GG", "XGG"] },
  { id: 3, name: "Conjunto Rosa",          tag: "Destaque",    imgs: ["/peca-3.jpg"], price: "R$ 259,90", sizes: ["P", "M", "G", "GG"] },
  { id: 4, name: "Coleção In Rio",         tag: "In Rio",      imgs: ["/peca-4.jpg"], price: "R$ 179,90", sizes: ["P", "M", "G", "GG", "XGG"] },
  { id: 5, name: "Queridinho da Dona Ruth",tag: "Queridinho",  imgs: ["/peca-5.jpg"], price: "R$ 299,90", sizes: ["G", "GG", "XGG"] },
  { id: 6, name: "Coleção In Rio",         tag: "In Rio",      imgs: ["/peca-6.jpg"],   price: "R$ 199,90", sizes: ["P", "M", "G", "GG", "XGG"] },
  { id: 7, name: "Óculos Dona Ruth",       tag: "Acessórios",  imgs: ["/oculos-1.jpg"], price: "R$ 0,00",   sizes: [] },
];

const STORAGE_KEY = "dona-ruth-products-v4";
const API_URL = "/api/products";

function normalizeProducts(raw: (Product & { img?: string })[]): Product[] {
  return raw.map((p) => ({
    ...p,
    imgs: p.imgs ?? (p.img ? [p.img] : []),
  }));
}

interface ProductsContextType {
  products: Product[];
  updateProduct: (id: number, data: Partial<Product>) => void;
  saveAllProducts: (products: Product[]) => Promise<void>;
  resetProducts: () => void;
}

const ProductsContext = createContext<ProductsContextType | null>(null);

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        const normalized = normalizeProducts(parsed);
        const storedIds = new Set(normalized.map((p) => p.id));
        const newDefaults = DEFAULT_PRODUCTS.filter((p) => !storedIds.has(p.id));
        return [...normalized, ...newDefaults];
      }
    } catch {}
    return DEFAULT_PRODUCTS;
  });

  useEffect(() => {
    fetch(API_URL)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const normalized = normalizeProducts(data);
          const serverIds = new Set(normalized.map((p) => p.id));
          const missing = DEFAULT_PRODUCTS.filter((p) => !serverIds.has(p.id));
          const merged = [...normalized, ...missing];
          setProducts(merged);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  }, [products]);

  function updateProduct(id: number, data: Partial<Product>) {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...data } : p))
    );
  }

  async function saveAllProducts(updated: Product[]) {
    setProducts(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    await fetch(API_URL, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    });
  }

  function resetProducts() {
    setProducts(DEFAULT_PRODUCTS);
    localStorage.removeItem(STORAGE_KEY);
    fetch(API_URL, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(DEFAULT_PRODUCTS),
    }).catch(() => {});
  }

  return (
    <ProductsContext.Provider value={{ products, updateProduct, saveAllProducts, resetProducts }}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const ctx = useContext(ProductsContext);
  if (!ctx) throw new Error("useProducts must be used within ProductsProvider");
  return ctx;
}
