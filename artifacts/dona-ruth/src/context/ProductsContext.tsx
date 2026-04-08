import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface Product {
  id: number;
  name: string;
  tag: string;
  img: string;
  price: string;
  sizes: string[];
}

const DEFAULT_PRODUCTS: Product[] = [
  { id: 1, name: "Nova Coleção Dona Ruth", tag: "Nova Coleção", img: "/peca-1.jpg", price: "R$ 189,90", sizes: ["P", "M", "G", "GG", "XGG"] },
  { id: 2, name: "Nova Coleção Dona Ruth", tag: "Nova Coleção", img: "/peca-2.jpg", price: "R$ 219,90", sizes: ["M", "G", "GG", "XGG"] },
  { id: 3, name: "Conjunto Rosa",          tag: "Destaque",    img: "/peca-3.jpg", price: "R$ 259,90", sizes: ["P", "M", "G", "GG"] },
  { id: 4, name: "Coleção In Rio",         tag: "In Rio",      img: "/peca-4.jpg", price: "R$ 179,90", sizes: ["P", "M", "G", "GG", "XGG"] },
  { id: 5, name: "Queridinho da Dona Ruth",tag: "Queridinho",  img: "/peca-5.jpg", price: "R$ 299,90", sizes: ["G", "GG", "XGG"] },
  { id: 6, name: "Coleção In Rio",         tag: "In Rio",      img: "/peca-6.jpg", price: "R$ 199,90", sizes: ["P", "M", "G", "GG", "XGG"] },
];

const STORAGE_KEY = "dona-ruth-products-v2";

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
