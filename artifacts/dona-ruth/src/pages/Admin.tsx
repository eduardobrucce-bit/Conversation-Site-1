import { useState, useRef } from "react";
import { useLocation } from "wouter";
import { useProducts, Product } from "@/context/ProductsContext";
import { Lock, LogOut, Upload, RotateCcw, CheckCircle, Eye, X, Plus } from "lucide-react";

const ADMIN_PASSWORD = "donaruth2024";

export default function Admin() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  const [previewImg, setPreviewImg] = useState<string | null>(null);
  const [, navigate] = useLocation();
  const { products, updateProduct, resetProducts } = useProducts();
  const [drafts, setDrafts] = useState<Product[]>([]);
  const [sizesTexts, setSizesTexts] = useState<Record<number, string>>({});
  const fileRefs = useRef<(HTMLInputElement | null)[]>([]);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthed(true);
      setDrafts(products.map((p) => ({ ...p })));
      setSizesTexts(Object.fromEntries(products.map((p) => [p.id, p.sizes?.join(", ") ?? ""])));
      setError("");
    } else {
      setError("Senha incorreta. Tente novamente.");
    }
  }

  function handleNameChange(id: number, value: string) {
    setDrafts((prev) => prev.map((p) => (p.id === id ? { ...p, name: value } : p)));
  }

  function handleTagChange(id: number, value: string) {
    setDrafts((prev) => prev.map((p) => (p.id === id ? { ...p, tag: value } : p)));
  }

  function handlePriceChange(id: number, value: string) {
    setDrafts((prev) => prev.map((p) => (p.id === id ? { ...p, price: value } : p)));
  }

  function handleSizesChange(id: number, value: string) {
    setSizesTexts((prev) => ({ ...prev, [id]: value }));
    const sizes = value.split(",").map((s) => s.trim()).filter(Boolean);
    setDrafts((prev) => prev.map((p) => (p.id === id ? { ...p, sizes } : p)));
  }

  function handleImageUpload(id: number, files: FileList) {
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        setDrafts((prev) =>
          prev.map((p) => (p.id === id ? { ...p, imgs: [...p.imgs, dataUrl] } : p))
        );
      };
      reader.readAsDataURL(file);
    });
  }

  function handleRemoveImage(id: number, imgIdx: number) {
    setDrafts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, imgs: p.imgs.filter((_, i) => i !== imgIdx) } : p
      )
    );
  }

  function handleSave() {
    drafts.forEach((d) => updateProduct(d.id, d));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  function handleReset() {
    if (confirm("Isso vai restaurar todas as fotos e nomes originais. Confirmar?")) {
      resetProducts();
      setDrafts(products.map((p) => ({ ...p })));
    }
  }

  function handleLogout() {
    setAuthed(false);
    setPassword("");
    navigate("/");
  }

  if (!authed) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-2xl font-serif font-bold">Painel Admin</h1>
            <p className="text-muted-foreground mt-1">Dona Ruth Moda Feminina</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Senha</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite sua senha"
                className="w-full px-4 py-3 rounded-xl border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary/30"
                autoFocus
              />
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-full bg-primary text-white font-medium hover:bg-primary/90 transition-colors"
            >
              Entrar
            </button>
          </form>

          <button
            onClick={() => navigate("/")}
            className="mt-6 w-full text-center text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Voltar ao site
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary/10">
      {previewImg && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setPreviewImg(null)}
        >
          <button className="absolute top-4 right-4 text-white" onClick={() => setPreviewImg(null)}>
            <X className="w-8 h-8" />
          </button>
          <img src={previewImg} alt="Preview" className="max-h-[90vh] max-w-[90vw] rounded-2xl object-contain" />
        </div>
      )}

      <header className="bg-white border-b border-border px-6 py-4 flex items-center justify-between sticky top-0 z-40">
        <div>
          <h1 className="text-xl font-serif font-bold">Painel Admin</h1>
          <p className="text-xs text-muted-foreground">Gerenciar Peças</p>
        </div>
        <div className="flex items-center gap-3">
          {saved && (
            <span className="flex items-center gap-1 text-green-600 text-sm font-medium">
              <CheckCircle className="w-4 h-4" /> Salvo!
            </span>
          )}
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-border text-sm hover:bg-secondary/30 transition-colors"
          >
            <Eye className="w-4 h-4" /> Ver site
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 text-red-600 text-sm border border-red-200 hover:bg-red-100 transition-colors"
          >
            <LogOut className="w-4 h-4" /> Sair
          </button>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-serif font-bold">Nossas Peças</h2>
            <p className="text-muted-foreground text-sm mt-1">Troque fotos e nomes das coleções abaixo</p>
          </div>
          <button
            onClick={handleReset}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <RotateCcw className="w-4 h-4" /> Restaurar original
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {drafts.map((product, i) => (
            <div key={product.id} className="bg-white rounded-3xl overflow-hidden border border-border shadow-sm">

              {/* Galeria de fotos com scroll horizontal */}
              <div className="p-3 bg-secondary/10">
                <div
                  className="flex gap-2 overflow-x-auto pb-1 snap-x snap-mandatory"
                  style={{ scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}
                >
                  {product.imgs.map((img, imgIdx) => (
                    <div
                      key={imgIdx}
                      className="relative shrink-0 w-28 h-36 rounded-xl overflow-hidden snap-start border border-border"
                    >
                      <img
                        src={img}
                        alt=""
                        className="w-full h-full object-cover cursor-pointer"
                        onClick={() => setPreviewImg(img)}
                      />
                      <button
                        onClick={() => handleRemoveImage(product.id, imgIdx)}
                        className="absolute top-1 right-1 bg-black/60 text-white rounded-full w-5 h-5 flex items-center justify-center hover:bg-red-600 transition-colors"
                        title="Remover foto"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}

                  {/* Botão adicionar foto */}
                  <button
                    onClick={() => fileRefs.current[i]?.click()}
                    className="shrink-0 w-28 h-36 rounded-xl border-2 border-dashed border-border flex flex-col items-center justify-center gap-2 text-muted-foreground hover:border-primary hover:text-primary active:border-primary active:text-primary transition-colors snap-start"
                  >
                    <Plus className="w-6 h-6" />
                    <span className="text-xs font-medium text-center leading-tight">Adicionar<br />foto</span>
                  </button>
                </div>

                <input
                  ref={(el) => { fileRefs.current[i] = el; }}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files?.length) {
                      handleImageUpload(product.id, e.target.files);
                      e.target.value = "";
                    }
                  }}
                />

                <p className="text-xs text-muted-foreground mt-2">
                  Peça {product.id} · {product.imgs.length} foto{product.imgs.length !== 1 ? "s" : ""} · deslize para ver todas
                </p>
              </div>

              <div className="p-4 space-y-3">
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1">Nome da coleção</label>
                  <input
                    type="text"
                    value={product.name}
                    onChange={(e) => handleNameChange(product.id, e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1">Etiqueta</label>
                    <input
                      type="text"
                      value={product.tag}
                      onChange={(e) => handleTagChange(product.id, e.target.value)}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/30"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1">Preço</label>
                    <input
                      type="text"
                      value={product.price}
                      onChange={(e) => handlePriceChange(product.id, e.target.value)}
                      placeholder="R$ 0,00"
                      className="w-full px-3 py-2 text-sm rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/30"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1">
                    Tamanhos <span className="font-normal">(separados por vírgula)</span>
                  </label>
                  <input
                    type="text"
                    value={sizesTexts[product.id] ?? product.sizes?.join(", ") ?? ""}
                    onChange={(e) => handleSizesChange(product.id, e.target.value)}
                    placeholder="P, M, G, GG, XGG"
                    className="w-full px-3 py-2 text-sm rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                  <div className="flex flex-wrap gap-1 mt-2">
                    {product.sizes?.map((s) => (
                      <span key={s} className="text-xs bg-secondary/50 border border-border rounded px-2 py-0.5 text-muted-foreground">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="sticky bottom-6">
          <button
            onClick={handleSave}
            className="w-full md:w-auto mx-auto flex items-center justify-center gap-2 px-10 py-4 rounded-full bg-primary text-white font-semibold text-lg shadow-xl hover:bg-primary/90 transition-colors"
          >
            <CheckCircle className="w-5 h-5" /> Salvar alterações
          </button>
        </div>
      </div>
    </div>
  );
}
