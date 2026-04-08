import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface Product {
  id: number;
  name: string;
  tag: string;
  img: string;
}

const DEFAULT_PRODUCTS: Product[] = [
  { id: 1, name: "Nova Coleção Dona Ruth", tag: "Nova Coleção", img: "/peca-1.jpg" },
  { id: 2, name: "Nova Coleção Dona Ruth", tag: "Nova Coleção", img: "/peca-2.jpg" },
  { id: 3, name: "Conjunto Rosa", tag: "Destaque", img: "/peca-3.jpg" },
  { id: 4, name: "Coleção In Rio", tag: "In Rio", img: "/peca-4.jpg" },
  { id: 5, name: "Queridinho da Dona Ruth", tag: "Queridinho", img: "/peca-5.jpg" },
  { id: 6, name: "Coleção In Rio", tag: "In Rio", img: "/peca-6.jpg" },
];

const STORAGE_KEY = "dona-ruth-products";

interface ProductsContextType {
  products: Product[];
  updateProduct: (id: number, data: Partial<Product>) => void;
  resetProducts: () => void;
}

const ProductsContext = createContext<ProductsContextType | null>(null);

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : DEFAULT_PRODUCTS;
    } catch {
      return DEFAULT_PRODUCTS;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  }, [products]);

  function updateProduct(id: number, data: Partial<Product>) {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...data } : p))
    );
  }

  function resetProducts() {
    setProducts(DEFAULT_PRODUCTS);
    localStorage.removeItem(STORAGE_KEY);
  }

  return (
    <ProductsContext.Provider value={{ products, updateProduct, resetProducts }}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const ctx = useContext(ProductsContext);
  if (!ctx) throw new Error("useProducts must be used within ProductsProvider");
  return ctx;
}
