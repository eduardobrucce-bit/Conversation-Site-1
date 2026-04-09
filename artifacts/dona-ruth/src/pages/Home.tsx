import { motion } from "framer-motion";
import { MessageCircle, HeartHandshake, Star, MapPin, Phone, Instagram, MapPinHouse, Store, UserCheck, ChevronLeft, ChevronRight } from "lucide-react";
import { useProducts } from "@/context/ProductsContext";
import { useLocation } from "wouter";
import { useRef, useState } from "react";

export default function Home() {
  const whatsappCarol = "https://wa.me/5562992842710";
  const whatsappVend2 = "https://wa.me/556296383761";
  const { products } = useProducts();
  const [, navigate] = useLocation();
  const whatsappGroup = "https://chat.whatsapp.com/JUAiUTinXPY7WCqHvEDYDd";
  const mapsLink = "https://maps.google.com/?q=R.+C-162,+282+Jardim+América+Goiânia+GO";

  const scrollRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [currentImgs, setCurrentImgs] = useState<Record<number, number>>({});

  function getIdx(productIndex: number) {
    return currentImgs[productIndex] ?? 0;
  }

  function scrollToImg(productIndex: number, imgIndex: number, totalImgs: number) {
    const el = scrollRefs.current[productIndex];
    if (!el) return;
    const clamped = Math.max(0, Math.min(imgIndex, totalImgs - 1));
    el.scrollTo({ left: clamped * el.offsetWidth, behavior: "smooth" });
    setCurrentImgs((prev) => ({ ...prev, [productIndex]: clamped }));
  }

  function handleWheel(e: React.WheelEvent, productIndex: number, totalImgs: number) {
    if (totalImgs <= 1) return;
    e.preventDefault();
    const current = getIdx(productIndex);
    if (e.deltaY > 0 || e.deltaX > 0) {
      scrollToImg(productIndex, current + 1, totalImgs);
    } else {
      scrollToImg(productIndex, current - 1, totalImgs);
    }
  }

  function handleScroll(e: React.UIEvent<HTMLDivElement>, productIndex: number) {
    const el = e.currentTarget;
    if (el.offsetWidth === 0) return;
    const idx = Math.round(el.scrollLeft / el.offsetWidth);
    setCurrentImgs((prev) => ({ ...prev, [productIndex]: idx }));
  }

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  return (
    <div className="min-h-screen bg-background font-sans text-foreground overflow-hidden">
      {/* HEADER / LOGO AREA */}
      <header className="absolute top-0 w-full z-50 py-4 px-6 md:px-12 flex justify-center items-center">
        <img
          src="/logo.png?v=10"
          alt="Dona Ruth Moda Feminina"
          className="h-20 md:h-28 w-auto object-contain"
        />
      </header>

      {/* 1. HERO SECTION */}
      <section className="relative min-h-[100dvh] flex items-center justify-center pt-24 pb-12 px-6 overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/40 via-background to-primary/10 -z-10" />
        <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-primary/20 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-accent/20 rounded-full blur-3xl -z-10" />

        <div className="max-w-4xl mx-auto text-center z-10 flex flex-col items-center">
          <motion.div 
            initial="hidden" animate="visible" variants={fadeInUp}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-md border border-primary/20 text-primary font-medium text-sm mb-8 shadow-sm"
          >
            <Star className="w-4 h-4" /> Moda Feminina em Goiânia
          </motion.div>
          
          <motion.h1 
            initial="hidden" animate="visible" variants={fadeInUp} transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold leading-[1.1] mb-6 text-foreground"
          >
            Moda Feminina que <br className="hidden md:block"/>
            <span className="text-primary italic">valoriza</span> sua beleza 💖
          </motion.h1>
          
          <motion.p 
            initial="hidden" animate="visible" variants={fadeInUp} transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl leading-relaxed"
          >
            Looks incríveis, confortáveis e cheios de estilo esperando por você em Goiânia. Sinta-se poderosa em cada peça.
          </motion.p>
          
          <motion.div 
            initial="hidden" animate="visible" variants={fadeInUp} transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <a 
              href={whatsappCarol} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold text-lg hover:bg-primary/90 transition-all hover:-translate-y-1 shadow-lg shadow-primary/30"
            >
              <MessageCircle className="w-5 h-5" />
              Falar com a Vendedora
            </a>
            <a 
              href={whatsappGroup} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white text-foreground border border-border font-semibold text-lg hover:bg-secondary/50 transition-all hover:-translate-y-1 shadow-sm"
            >
              <HeartHandshake className="w-5 h-5" />
              Grupo de Novidades
            </a>
          </motion.div>

          <motion.div 
            initial="hidden" animate="visible" variants={fadeInUp} transition={{ delay: 0.5 }}
            className="mt-16 flex flex-col md:flex-row items-center gap-6 text-sm font-medium text-muted-foreground"
          >
            <span className="flex items-center gap-2"><span className="text-primary">✔</span> Atendimento personalizado</span>
            <span className="flex items-center gap-2"><span className="text-primary">✔</span> Novidades toda semana</span>
            <span className="flex items-center gap-2"><span className="text-primary">✔</span> Moda feminina com estilo</span>
          </motion.div>
        </div>
      </section>

      {/* 2. PRODUCT GALLERY */}
      <section className="py-24 px-6 bg-secondary/20">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">Nossas Peças</h2>
            <p className="text-lg text-muted-foreground">Estilo e conforto do tamanho da sua beleza</p>
          </motion.div>

          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {products.map((product, i) => (
              <motion.div key={i} variants={fadeInUp} className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-border flex flex-col">
                <div className="aspect-[3/4] w-full relative overflow-hidden">
                  <div
                    ref={(el) => { scrollRefs.current[i] = el; }}
                    className="flex h-full overflow-x-auto snap-x snap-mandatory touch-pan-x"
                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}
                    onScroll={(e) => handleScroll(e, i)}
                    onWheel={(e) => handleWheel(e, i, product.imgs.length)}
                  >
                    {product.imgs.map((img, idx) => (
                      <div key={idx} className="shrink-0 w-full h-full snap-start">
                        <img
                          src={img}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 pointer-events-none" />
                  <span className="absolute top-4 left-4 bg-primary/90 text-white text-xs font-semibold px-3 py-1 rounded-full pointer-events-none">
                    {product.tag}
                  </span>
                  {product.imgs.length > 1 && (
                    <>
                      <button
                        onClick={() => scrollToImg(i, getIdx(i) - 1, product.imgs.length)}
                        className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/60 hidden md:flex"
                        aria-label="Foto anterior"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => scrollToImg(i, getIdx(i) + 1, product.imgs.length)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/60 hidden md:flex"
                        aria-label="Próxima foto"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                      <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 pointer-events-none">
                        {product.imgs.map((_, idx) => (
                          <div
                            key={idx}
                            className={`h-1.5 rounded-full bg-white shadow-sm transition-all duration-300 ${getIdx(i) === idx ? "w-4 opacity-100" : "w-1.5 opacity-60"}`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-serif text-lg font-semibold mb-1">{product.name}</h3>
                  <p className="text-primary font-bold text-xl mb-3">{product.price}</p>
                  {product.sizes && product.sizes.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {product.sizes.map((size) => (
                        <span
                          key={size}
                          className="text-xs border border-border rounded-md px-2 py-0.5 text-muted-foreground font-medium"
                        >
                          {size}
                        </span>
                      ))}
                    </div>
                  )}
                  <a
                    href={`https://wa.me/5562992842710?text=${encodeURIComponent(`Me interessei por esse produto ${product.name}, está disponivel?`)}`}
                    target="_blank" rel="noopener noreferrer"
                    className="mt-auto w-full py-3 rounded-full bg-secondary/50 text-foreground font-medium hover:bg-primary hover:text-white transition-colors text-center text-sm"
                  >
                    Ver Mais Detalhes
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
            className="mt-14 flex justify-center"
          >
            <a
              href="https://drive.google.com/drive/folders/1OaoeiA4y8CJ939jJHzhV8WZhwO8jV10p"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-10 py-4 rounded-full bg-primary text-white font-semibold text-lg shadow-lg shadow-primary/30 hover:bg-primary/90 transition-all hover:-translate-y-1"
            >
              Acesse o Catálogo Completo
            </a>
          </motion.div>
        </div>
      </section>

      {/* 3. ABOUT SECTION */}
      <section className="py-24 px-6 bg-white relative overflow-hidden">
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6">Bem-vinda à Dona Ruth</h2>
          <div className="w-24 h-1 bg-primary/30 mx-auto mb-8 rounded-full" />
          <p className="text-xl leading-relaxed text-muted-foreground">
            Somos uma loja especializada em moda feminina, pensada para valorizar a autoestima e o estilo de cada mulher. Aqui você encontra roupas modernas, confortáveis e perfeitas para qualquer ocasião.
          </p>
        </motion.div>
      </section>

      {/* 4. DIFERENCIAIS */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {[
              { title: "Atendimento humanizado", icon: UserCheck },
              { title: "Peças selecionadas", icon: Star },
              { title: "Modelos que valorizam o corpo", icon: HeartHandshake },
              { title: "Loja física em Goiânia", icon: Store }
            ].map((item, i) => (
              <motion.div key={i} variants={fadeInUp} className="text-center flex flex-col items-center p-6 bg-background rounded-3xl border border-border/50">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 text-primary">
                  <item.icon className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-xl font-semibold">{item.title}</h3>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 5. TESTIMONIALS */}
      <section className="py-24 px-6 bg-accent/10">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">Quem compra, ama 💕</h2>
          </motion.div>

          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              { text: "Atendimento maravilhoso, roupas lindas! Me sinto especial toda vez que vou lá!", author: "Ana Paula, Goiânia" },
              { text: "Finalmente encontrei roupas que vestem bem no meu corpo. Recomendo muito!", author: "Carla Mendes, Goiânia" },
              { text: "A Carol me ajudou a montar o look perfeito para o casamento da minha irmã. Amei!", author: "Fernanda Costa, Goiânia" }
            ].map((t, i) => (
              <motion.div key={i} variants={fadeInUp} className="bg-white p-8 rounded-3xl shadow-sm border border-border relative">
                <div className="text-primary text-4xl font-serif absolute top-4 left-6 opacity-20">"</div>
                <p className="text-lg mb-6 relative z-10 italic">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center font-serif text-primary font-bold">
                    {t.author.charAt(0)}
                  </div>
                  <span className="font-semibold text-sm">{t.author}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 6. VIP GROUP */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-90" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay opacity-30" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <h2 className="text-4xl md:text-6xl font-serif font-bold mb-6 text-white leading-tight">
              Entre no nosso grupo e receba novidades primeiro 🔥
            </h2>
            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
              Seja a primeira a ver as novas peças, promoções e lançamentos exclusivos.
            </p>
            <a 
              href={whatsappGroup} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-10 py-5 rounded-full bg-white text-primary font-bold text-xl hover:bg-background transition-all hover:scale-105 shadow-xl"
            >
              <MessageCircle className="w-6 h-6" />
              Entrar no Grupo de WhatsApp
            </a>
          </motion.div>
        </div>
      </section>

      {/* 7 & 8. LOCATION AND CONTACT */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <h2 className="text-4xl font-serif font-bold mb-8">Venha nos visitar</h2>
            <div className="flex items-start gap-4 mb-6">
              <MapPinHouse className="w-6 h-6 text-primary shrink-0 mt-1" />
              <div>
                <p className="text-lg mb-4">R. C-162, 282 - Quadra 263 Lote 17<br/>Jardim América, Goiânia - GO<br/>CEP: 74255-110</p>
                <a 
                  href={mapsLink} target="_blank" rel="noopener noreferrer"
                  className="text-primary font-semibold hover:underline inline-flex items-center gap-1"
                >
                  <MapPin className="w-4 h-4" /> Abrir no Google Maps
                </a>
              </div>
            </div>
            <div className="rounded-3xl overflow-hidden border border-border shadow-sm h-[300px] w-full bg-muted">
              <iframe
                src="https://www.openstreetmap.org/export/embed.html?bbox=-49.2884%2C-16.7077%2C-49.2684%2C-16.6877&layer=mapnik&marker=-16.6977%2C-49.2784"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                title="Mapa da Loja Dona Ruth"
              />
            </div>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <h2 className="text-4xl font-serif font-bold mb-8">Fale com a gente</h2>
            <div className="grid gap-6">
              <div className="p-8 rounded-3xl bg-secondary/30 border border-border flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-5">
                  <img
                    src="/vendedora-carol.jpg"
                    alt="Carol"
                    className="w-20 h-20 rounded-full object-cover border-4 border-primary/30 shadow-md flex-shrink-0"
                  />
                  <div>
                    <h3 className="font-serif text-2xl font-semibold mb-1">Carol</h3>
                    <p className="text-muted-foreground">Vendedora Especialista</p>
                  </div>
                </div>
                <a 
                  href={whatsappCarol} target="_blank" rel="noopener noreferrer"
                  className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#25D366] text-white font-medium hover:bg-[#20bd5a] transition-colors"
                >
                  <MessageCircle className="w-5 h-5" /> Falar com Carol
                </a>
              </div>
              
              <div className="p-8 rounded-3xl bg-secondary/30 border border-border flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-5">
                  <img
                    src="/vendedora-vendas.png"
                    alt="Vendas"
                    className="w-20 h-20 rounded-full object-cover border-4 border-primary/30 shadow-md flex-shrink-0"
                  />
                  <div>
                    <h3 className="font-serif text-2xl font-semibold mb-1">Vendas</h3>
                    <p className="text-muted-foreground">Atendimento Geral</p>
                  </div>
                </div>
                <a 
                  href={whatsappVend2} target="_blank" rel="noopener noreferrer"
                  className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#25D366] text-white font-medium hover:bg-[#20bd5a] transition-colors"
                >
                  <MessageCircle className="w-5 h-5" /> Falar no WhatsApp
                </a>
              </div>

              <div className="p-8 rounded-3xl border border-border bg-white flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-accent/20 text-accent flex items-center justify-center">
                  <Store className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Horário de Funcionamento</h3>
                  <p className="text-muted-foreground">Segunda a Sexta - 08h às 18h</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 9. FINAL CTA */}
      <section className="py-32 px-6 bg-background relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-3xl -z-10" />
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-5xl md:text-7xl font-serif font-bold mb-10">Seu look perfeito está aqui 💖</h2>
          <a 
            href={whatsappCarol} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 px-12 py-6 rounded-full bg-primary text-primary-foreground font-bold text-2xl hover:bg-primary/90 transition-all hover:scale-105 shadow-xl shadow-primary/30"
          >
            <MessageCircle className="w-7 h-7" />
            Falar no WhatsApp agora
          </a>
        </motion.div>
      </section>

      {/* 10. FOOTER */}
      <footer className="py-12 px-6 border-t border-border bg-white text-center md:text-left">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <img
              src="/logo.png?v=10"
              alt="Dona Ruth Moda Feminina"
              className="h-16 w-auto object-contain mb-1"
            />
          </div>
          
          <div className="text-sm text-muted-foreground">
            <p>R. C-162, 282 - Jardim América, Goiânia - GO</p>
          </div>

          <div className="text-sm text-muted-foreground flex flex-col items-center md:items-end gap-1">
            <p>&copy; {new Date().getFullYear()} Dona Ruth. Todos os direitos reservados.</p>
            <button
              onClick={() => navigate("/admin")}
              className="text-xs text-muted-foreground/40 hover:text-muted-foreground transition-colors"
            >
              Admin
            </button>
          </div>
        </div>
      </footer>

      {/* FLOATING WHATSAPP BUTTON */}
      <a
        href={whatsappCarol}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-[#25D366] text-white shadow-lg hover:scale-110 transition-transform duration-300 hover:shadow-xl focus:outline-none flex items-center justify-center group"
        aria-label="Falar no WhatsApp"
      >
        <MessageCircle className="w-8 h-8" />
        {/* Pulse ring effect */}
        <span className="absolute inset-0 rounded-full border-2 border-[#25D366] animate-ping opacity-75 group-hover:opacity-0" style={{ animationDuration: '2s' }} />
      </a>
    </div>
  );
}
