import { motion } from "framer-motion";
import { MessageCircle, HeartHandshake, Star, MapPin, Phone, Instagram, MapPinHouse, Store, UserCheck } from "lucide-react";

export default function Home() {
  const whatsappCarol = "https://wa.me/5562992842710";
  const whatsappVend2 = "https://wa.me/556296383761";
  const whatsappGroup = "https://chat.whatsapp.com/JUAiUTinXPY7WCqHvEDYDd";
  const mapsLink = "https://maps.google.com/?q=R.+C-162,+282+Jardim+América+Goiânia+GO";

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
          src="/logo.png"
          alt="Dona Ruth Moda Plus Size"
          className="h-20 md:h-28 w-auto object-contain"
          style={{ mixBlendMode: "multiply" }}
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
            <Star className="w-4 h-4" /> Moda Plus Size em Goiânia
          </motion.div>
          
          <motion.h1 
            initial="hidden" animate="visible" variants={fadeInUp} transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold leading-[1.1] mb-6 text-foreground"
          >
            Moda Plus Size que <br className="hidden md:block"/>
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
            <span className="flex items-center gap-2"><span className="text-primary">✔</span> Moda plus size com estilo</span>
          </motion.div>
        </div>
      </section>

      {/* 2. ABOUT SECTION */}
      <section className="py-24 px-6 bg-white relative overflow-hidden">
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6">Bem-vinda à Dona Ruth</h2>
          <div className="w-24 h-1 bg-primary/30 mx-auto mb-8 rounded-full" />
          <p className="text-xl leading-relaxed text-muted-foreground">
            Somos uma loja especializada em moda feminina plus size, pensada para valorizar a autoestima e o estilo de cada mulher. Aqui você encontra roupas modernas, confortáveis e perfeitas para qualquer ocasião.
          </p>
        </motion.div>
      </section>

      {/* 3. PRODUCT GALLERY */}
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
            {[
              { name: "Vestido Floral Plus Size", color: "from-pink-100 to-rose-200" },
              { name: "Blusa Estampada Plus", color: "from-orange-100 to-amber-200" },
              { name: "Calça Social Plus Size", color: "from-rose-100 to-pink-200" },
              { name: "Conjunto Casual Plus", color: "from-stone-100 to-warm-gray-200" },
              { name: "Vestido de Festa Plus", color: "from-red-100 to-rose-300" },
              { name: "Saia Midi Plus Size", color: "from-peach-100 to-orange-200" }
            ].map((product, i) => (
              <motion.div key={i} variants={fadeInUp} className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-border flex flex-col">
                <div className={`aspect-[3/4] w-full bg-gradient-to-br ${product.color} relative overflow-hidden flex items-center justify-center`}>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
                  <HeartHandshake className="w-12 h-12 text-primary/30" />
                </div>
                <div className="p-6 flex flex-col items-center flex-1 text-center">
                  <h3 className="font-serif text-xl font-semibold mb-4">{product.name}</h3>
                  <a 
                    href={whatsappCarol} target="_blank" rel="noopener noreferrer"
                    className="mt-auto w-full py-3 rounded-full bg-secondary/50 text-foreground font-medium hover:bg-primary hover:text-white transition-colors"
                  >
                    Tenho interesse
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
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
                <div>
                  <h3 className="font-serif text-2xl font-semibold mb-1">Carol</h3>
                  <p className="text-muted-foreground">Vendedora Especialista</p>
                </div>
                <a 
                  href={whatsappCarol} target="_blank" rel="noopener noreferrer"
                  className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#25D366] text-white font-medium hover:bg-[#20bd5a] transition-colors"
                >
                  <MessageCircle className="w-5 h-5" /> Falar com Carol
                </a>
              </div>
              
              <div className="p-8 rounded-3xl bg-secondary/30 border border-border flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h3 className="font-serif text-2xl font-semibold mb-1">Vendas</h3>
                  <p className="text-muted-foreground">Atendimento Geral</p>
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
              src="/logo.png"
              alt="Dona Ruth Moda Plus Size"
              className="h-16 w-auto object-contain mb-1"
              style={{ mixBlendMode: "multiply" }}
            />
          </div>
          
          <div className="text-sm text-muted-foreground">
            <p>R. C-162, 282 - Jardim América, Goiânia - GO</p>
          </div>

          <div className="text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Dona Ruth. Todos os direitos reservados.</p>
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
