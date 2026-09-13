import React, { useState, useEffect, useRef } from "react";

// =============================================================
//  SITE DARK-LUXURY + PAINEL ADMIN
//  - Visual: preto + dourado, tipografia serifada com enfase em italico
//  - Admin: catalogo editavel, upload de imagens, textos, cor de destaque
//  - Persistencia: window.storage (prototipo). Fase 2 = Supabase.
//  Abrir o admin: botao de engrenagem no canto inferior esquerdo.
//  Senha padrao do admin: "admin"
// =============================================================

const STORE_KEY = "luxo_site_v1";
const MAX_BYTES = 4_700_000; // guarda de seguranca (limite ~5MB por chave)

const DEFAULT = {
  brand: { name: "SUA MARCA", tagline: "Curadoria exclusiva", location: "Sua cidade" },
  hero: {
    kicker: "Coleção exclusiva",
    line1: "Peças selecionadas",
    line2: "para quem exige",
    emphasis: "o mais alto padrão.",
    subtitle:
      "Curadoria pessoal, conferência antes do envio e entrega para todo o Brasil. Você aprova cada detalhe antes de pagar.",
    priceFrom: "A partir de R$ 0.000",
    ctaText: "Ver o catálogo",
    note: "Envio para todo o Brasil · Atendimento pessoal",
    heroImg: null,
  },
  stats: [
    { num: "800+", label: "Clientes atendidos" },
    { num: "9 anos", label: "No mercado" },
    { num: "48h", label: "Entrega média" },
    { num: "100%", label: "Aprovação" },
  ],
  catalog: {
    kicker: "Catálogo atual",
    title: "As peças",
    titleEmphasis: "mais procuradas",
    subtitle:
      "Cada item abaixo é selecionado a dedo. Disponibilidade limitada por lote — fale comigo para ver o que está disponível hoje.",
  },
  products: [
    { id: 1, name: "Peça Signature 01", tag: "Linha Signature · Disponível", price: "A partir de R$ 0.000", img: null },
    { id: 2, name: "Peça Signature 02", tag: "Linha Signature · Disponível", price: "A partir de R$ 0.000", img: null },
    { id: 3, name: "Peça Signature 03", tag: "Edição limitada · Disponível", price: "A partir de R$ 0.000", img: null },
  ],
  value: {
    kicker: "Transparência",
    title: "O que você está",
    titleEmphasis: "realmente levando",
    blocks: [
      {
        label: "A diferença que você vê",
        head: "Você aprova antes de pagar",
        body: "Nada é enviado sem você ver e aprovar. Esse processo garante que o que chega até você é exatamente o que foi escolhido.",
        bullets: ["Conferência completa antes do envio", "Detalhes, acabamento e qualidade validados", "Só depois da sua aprovação o envio acontece"],
      },
      {
        label: "A diferença que você sente",
        head: "Padrão que se percebe no uso",
        body: "Trabalho apenas com o que tem qualidade real. São peças que se destacam no dia a dia. Quem compra uma vez, volta.",
        bullets: ["Materiais e acabamento de alto nível", "Atenção a cada detalhe da peça", "Clientes que voltam e indicam"],
      },
    ],
  },
  testimonials: {
    kicker: "Resultados reais",
    title: "Clientes reais.",
    titleEmphasis: "Sem filtro.",
    items: [
      { id: 1, name: "Cliente Exemplo", detail: "Produto · Cidade", text: "Depoimento de exemplo. Edite ou remova este texto no painel admin.", img: null },
      { id: 2, name: "Cliente Exemplo", detail: "Produto · Cidade", text: "Depoimento de exemplo. Edite ou remova este texto no painel admin.", img: null },
      { id: 3, name: "Cliente Exemplo", detail: "Produto · Cidade", text: "Depoimento de exemplo. Edite ou remova este texto no painel admin.", img: null },
    ],
  },
  about: {
    kicker: "Quem atende você",
    name: "SEU NOME",
    role: "Especialista · Sua cidade",
    bio: "Escreva aqui sua apresentação. Fale da sua experiência, do seu diferencial e de por que o atendimento é pessoal e direto com você.",
    bullets: ["Atendimento 100% pessoal", "Curadoria de qualidade", "Envio para todo o Brasil", "Pós-venda direto com você"],
    img: null,
  },
  process: {
    kicker: "Processo",
    title: "Do primeiro contato",
    titleEmphasis: "à entrega final",
    steps: [
      "Você me conta o que procura. A curadoria começa aqui.",
      "Envio os detalhes e as fotos/vídeo da peça antes de qualquer pagamento.",
      "Após sua aprovação, envio rastreado e discreto para todo o Brasil.",
      "Pós-venda direto comigo. Suporte real, sem robô.",
    ],
  },
  faq: {
    kicker: "Dúvidas frequentes",
    title: "Perguntas que",
    titleEmphasis: "todo cliente faz",
    items: [
      { id: 1, q: "Pergunta de exemplo 1?", a: "Resposta de exemplo. Edite este conteúdo no painel admin." },
      { id: 2, q: "Pergunta de exemplo 2?", a: "Resposta de exemplo. Edite este conteúdo no painel admin." },
      { id: 3, q: "Pergunta de exemplo 3?", a: "Resposta de exemplo. Edite este conteúdo no painel admin." },
      { id: 4, q: "Pergunta de exemplo 4?", a: "Resposta de exemplo. Edite este conteúdo no painel admin." },
    ],
  },
  finalCta: {
    kicker: "Próximo passo",
    title: "Pronto para escolher",
    titleEmphasis: "a peça certa?",
    subtitle: "Atendimento direto, sem pressa e sem pressão. Você vê antes de pagar.",
    ctaText: "Falar agora",
    scarcity: "Lote atual: peças disponíveis",
  },
  config: {
    accent: "#c8a45c",
    whatsapp: "5511999999999",
    waMessage: "Olá! Vim pelo site e quero ver o catálogo.",
    adminPass: "admin",
  },
};

// ---------- helpers ----------
function hexToRgba(hex, a) {
  const h = (hex || "#c8a45c").replace("#", "");
  const n = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  const r = parseInt(n.slice(0, 2), 16), g = parseInt(n.slice(2, 4), 16), b = parseInt(n.slice(4, 6), 16);
  return `rgba(${r},${g},${b},${a})`;
}

function downscaleImage(file, maxDim = 1000, quality = 0.82) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        let { width, height } = img;
        if (width > height && width > maxDim) { height = Math.round((height * maxDim) / width); width = maxDim; }
        else if (height > maxDim) { width = Math.round((width * maxDim) / height); height = maxDim; }
        const canvas = document.createElement("canvas");
        canvas.width = width; canvas.height = height;
        canvas.getContext("2d").drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.onerror = reject;
      img.src = reader.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function App() {
  const [data, setData] = useState(DEFAULT);
  const [loaded, setLoaded] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [authed, setAuthed] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  // carregar
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,700;1,500;1,700&family=Inter:wght@300;400;500;600&display=swap";
    document.head.appendChild(link);

    (async () => {
      try {
        const res = await window.storage.get(STORE_KEY);
        if (res && res.value) setData({ ...DEFAULT, ...JSON.parse(res.value) });
        else await window.storage.set(STORE_KEY, JSON.stringify(DEFAULT));
      } catch (e) {
        // primeira execucao / sem storage: segue com defaults
      }
      setLoaded(true);
    })();
  }, []);

  async function persist(next) {
    const payload = JSON.stringify(next);
    if (payload.length > MAX_BYTES) {
      alert("Limite de armazenamento do protótipo atingido (~5MB). Reduza o número/tamanho das imagens. Na versão publicada (Supabase) isso não é problema.");
      return false;
    }
    try { await window.storage.set(STORE_KEY, payload); return true; }
    catch (e) { alert("Não foi possível salvar."); return false; }
  }

  const update = (next) => setData(next);
  const saveAll = async () => { const ok = await persist(data); if (ok) alert("Alterações salvas."); };

  const T = {
    bg: "#0b0b0d", panel: "#141417", panel2: "#1c1c21",
    gold: data.config.accent, text: "#f4efe6", muted: "#9d978c",
    line: "rgba(255,255,255,0.08)", goldSoft: hexToRgba(data.config.accent, 0.22), goldFaint: hexToRgba(data.config.accent, 0.08),
    serif: "'Playfair Display', Georgia, 'Times New Roman', serif",
    sans: "'Inter', system-ui, -apple-system, sans-serif",
  };
  const wa = `https://wa.me/${data.config.whatsapp}?text=${encodeURIComponent(data.config.waMessage)}`;
  const waFor = (name) => `https://wa.me/${data.config.whatsapp}?text=${encodeURIComponent("Olá! Tenho interesse em: " + name)}`;

  if (!loaded) return <div style={{ background: "#0b0b0d", color: "#c8a45c", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "serif" }}>Carregando…</div>;

  // ---------- estilos reutilizaveis ----------
  const S = {
    kicker: { fontFamily: T.sans, textTransform: "uppercase", letterSpacing: "3px", fontSize: 11, color: T.gold, fontWeight: 600, marginBottom: 14 },
    h2: { fontFamily: T.serif, fontWeight: 700, fontSize: "clamp(28px,7vw,44px)", lineHeight: 1.12, color: T.text, margin: 0 },
    em: { fontStyle: "italic", color: T.gold, fontWeight: 500 },
    p: { fontFamily: T.sans, fontSize: 15, lineHeight: 1.7, color: T.muted, fontWeight: 300 },
    section: { padding: "clamp(52px,10vw,88px) 20px", maxWidth: 1120, margin: "0 auto" },
    cta: { display: "inline-block", background: T.gold, color: "#0b0b0d", fontFamily: T.sans, fontWeight: 600, fontSize: 13, letterSpacing: "1.5px", textTransform: "uppercase", padding: "16px 30px", borderRadius: 2, textDecoration: "none", cursor: "pointer", border: "none" },
    ghost: { display: "inline-block", background: "transparent", color: T.gold, fontFamily: T.sans, fontWeight: 600, fontSize: 13, letterSpacing: "1.5px", textTransform: "uppercase", padding: "15px 28px", borderRadius: 2, textDecoration: "none", cursor: "pointer", border: `1px solid ${T.goldSoft}` },
    imgPh: { background: `linear-gradient(135deg, ${T.panel2}, ${T.panel})`, display: "flex", alignItems: "center", justifyContent: "center", color: hexToRgba(T.gold, 0.5), fontFamily: T.sans, fontSize: 12, letterSpacing: "1px", textTransform: "uppercase" },
  };

  const Kicker = ({ children }) => <div style={S.kicker}>{children}</div>;
  const Title = ({ t, em }) => (<h2 style={S.h2}>{t} {em && <span style={S.em}>{em}</span>}</h2>);

  return (
    <div style={{ background: T.bg, minHeight: "100vh", fontFamily: T.sans, overflowX: "hidden" }}>
      {/* HEADER */}
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 20px", borderBottom: `1px solid ${T.line}`, position: "sticky", top: 0, background: hexToRgba("#0b0b0d", 0.85), backdropFilter: "blur(8px)", zIndex: 40 }}>
        <div style={{ fontFamily: T.serif, color: T.text, fontSize: 18, letterSpacing: "1px" }}>{data.brand.name}</div>
        <div style={{ fontFamily: T.sans, fontSize: 11, color: T.muted, letterSpacing: "1px", textTransform: "uppercase" }}>{data.brand.tagline}</div>
      </header>

      {/* HERO */}
      <section style={{ position: "relative", padding: "clamp(60px,14vw,120px) 20px", textAlign: "center", overflow: "hidden" }}>
        {data.hero.heroImg && <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${data.hero.heroImg})`, backgroundSize: "cover", backgroundPosition: "center", opacity: 0.28 }} />}
        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at 50% 0%, ${T.goldFaint}, transparent 60%)` }} />
        <div style={{ position: "relative", maxWidth: 780, margin: "0 auto" }}>
          <Kicker>{data.hero.kicker} · {data.brand.location}</Kicker>
          <h1 style={{ fontFamily: T.serif, fontWeight: 700, fontSize: "clamp(34px,9vw,64px)", lineHeight: 1.08, color: T.text, margin: "0 0 24px" }}>
            {data.hero.line1}<br />{data.hero.line2} <span style={S.em}>{data.hero.emphasis}</span>
          </h1>
          <p style={{ ...S.p, fontSize: 16, maxWidth: 560, margin: "0 auto 32px" }}>{data.hero.subtitle}</p>
          <a href={wa} target="_blank" rel="noreferrer" style={S.cta}>{data.hero.ctaText}</a>
          <div style={{ marginTop: 20, fontFamily: T.sans, fontSize: 12, color: T.muted, letterSpacing: "0.5px" }}>{data.hero.priceFrom} · {data.hero.note}</div>
        </div>
      </section>

      {/* STATS */}
      <section style={{ borderTop: `1px solid ${T.line}`, borderBottom: `1px solid ${T.line}` }}>
        <div style={{ maxWidth: 1120, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))" }}>
          {data.stats.map((s, i) => (
            <div key={i} style={{ padding: "32px 16px", textAlign: "center", borderLeft: i > 0 ? `1px solid ${T.line}` : "none" }}>
              <div style={{ fontFamily: T.serif, fontSize: 30, color: T.gold, fontWeight: 700 }}>{s.num}</div>
              <div style={{ fontFamily: T.sans, fontSize: 12, color: T.muted, marginTop: 6, letterSpacing: "0.5px" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CATALOGO */}
      <section style={S.section}>
        <div style={{ textAlign: "center", maxWidth: 620, margin: "0 auto 44px" }}>
          <Kicker>{data.catalog.kicker}</Kicker>
          <Title t={data.catalog.title} em={data.catalog.titleEmphasis} />
          <p style={{ ...S.p, marginTop: 16 }}>{data.catalog.subtitle}</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 20 }}>
          {data.products.map((p) => (
            <a key={p.id} href={waFor(p.name)} target="_blank" rel="noreferrer" style={{ textDecoration: "none", border: `1px solid ${T.line}`, borderRadius: 4, overflow: "hidden", background: T.panel, transition: "border-color .2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = T.goldSoft)} onMouseLeave={(e) => (e.currentTarget.style.borderColor = T.line)}>
              <div style={{ aspectRatio: "1/1", ...(!p.img ? S.imgPh : {}) }}>
                {p.img ? <img src={p.img} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} /> : "Imagem"}
              </div>
              <div style={{ padding: "16px 16px 18px" }}>
                <div style={{ fontFamily: T.serif, color: T.text, fontSize: 17, marginBottom: 4 }}>{p.name}</div>
                <div style={{ fontFamily: T.sans, fontSize: 12, color: T.muted, marginBottom: 10 }}>{p.tag}</div>
                <div style={{ fontFamily: T.sans, fontSize: 13, color: T.gold, fontWeight: 500 }}>{p.price}</div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* VALUE / TRANSPARENCIA */}
      <section style={{ background: T.panel, borderTop: `1px solid ${T.line}`, borderBottom: `1px solid ${T.line}` }}>
        <div style={S.section}>
          <div style={{ textAlign: "center", marginBottom: 44 }}>
            <Kicker>{data.value.kicker}</Kicker>
            <Title t={data.value.title} em={data.value.titleEmphasis} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 28 }}>
            {data.value.blocks.map((b, i) => (
              <div key={i} style={{ border: `1px solid ${T.line}`, borderRadius: 4, padding: "28px 24px", background: T.bg }}>
                <div style={{ fontFamily: T.sans, fontSize: 11, letterSpacing: "2px", textTransform: "uppercase", color: T.gold, marginBottom: 14 }}>{b.label}</div>
                <h3 style={{ fontFamily: T.serif, fontSize: 22, color: T.text, margin: "0 0 12px" }}>{b.head}</h3>
                <p style={{ ...S.p, marginBottom: 18 }}>{b.body}</p>
                {b.bullets.map((x, j) => (
                  <div key={j} style={{ display: "flex", gap: 10, marginBottom: 9, fontFamily: T.sans, fontSize: 14, color: T.text }}>
                    <span style={{ color: T.gold }}>—</span><span>{x}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DEPOIMENTOS */}
      <section style={S.section}>
        <div style={{ textAlign: "center", marginBottom: 44 }}>
          <Kicker>{data.testimonials.kicker}</Kicker>
          <Title t={data.testimonials.title} em={data.testimonials.titleEmphasis} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 22 }}>
          {data.testimonials.items.map((t) => (
            <div key={t.id} style={{ border: `1px solid ${T.line}`, borderRadius: 4, padding: 24, background: T.panel }}>
              <div style={{ color: T.gold, fontSize: 14, letterSpacing: 2, marginBottom: 14 }}>★★★★★</div>
              <p style={{ fontFamily: T.serif, fontStyle: "italic", fontSize: 16, lineHeight: 1.6, color: T.text, margin: "0 0 18px" }}>"{t.text}"</p>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 42, height: 42, borderRadius: "50%", overflow: "hidden", flexShrink: 0, ...(!t.img ? { ...S.imgPh, fontSize: 9 } : {}) }}>
                  {t.img ? <img src={t.img} alt={t.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : "Foto"}
                </div>
                <div>
                  <div style={{ fontFamily: T.sans, fontSize: 14, color: T.text, fontWeight: 500 }}>{t.name}</div>
                  <div style={{ fontFamily: T.sans, fontSize: 12, color: T.muted }}>{t.detail}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SOBRE */}
      <section style={{ background: T.panel, borderTop: `1px solid ${T.line}`, borderBottom: `1px solid ${T.line}` }}>
        <div style={{ ...S.section, display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 40, alignItems: "center" }}>
          <div style={{ aspectRatio: "4/5", borderRadius: 4, overflow: "hidden", maxWidth: 360, ...(!data.about.img ? S.imgPh : {}) }}>
            {data.about.img ? <img src={data.about.img} alt={data.about.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : "Foto do especialista"}
          </div>
          <div>
            <Kicker>{data.about.kicker}</Kicker>
            <h2 style={{ fontFamily: T.serif, fontSize: 32, color: T.text, margin: "0 0 6px" }}>{data.about.name}</h2>
            <div style={{ fontFamily: T.sans, fontSize: 13, color: T.gold, marginBottom: 18, letterSpacing: "0.5px" }}>{data.about.role}</div>
            <p style={{ ...S.p, marginBottom: 20 }}>{data.about.bio}</p>
            {data.about.bullets.map((x, i) => (
              <div key={i} style={{ display: "flex", gap: 10, marginBottom: 9, fontFamily: T.sans, fontSize: 14, color: T.text }}>
                <span style={{ color: T.gold }}>—</span><span>{x}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESSO */}
      <section style={S.section}>
        <div style={{ textAlign: "center", marginBottom: 44 }}>
          <Kicker>{data.process.kicker}</Kicker>
          <Title t={data.process.title} em={data.process.titleEmphasis} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 24 }}>
          {data.process.steps.map((s, i) => (
            <div key={i} style={{ borderTop: `2px solid ${T.goldSoft}`, paddingTop: 18 }}>
              <div style={{ fontFamily: T.serif, fontSize: 30, color: T.gold, fontWeight: 700, marginBottom: 8 }}>{String(i + 1).padStart(2, "0")}</div>
              <p style={{ ...S.p, color: T.text, fontSize: 14 }}>{s}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section style={{ background: T.panel, borderTop: `1px solid ${T.line}`, borderBottom: `1px solid ${T.line}` }}>
        <div style={{ ...S.section, maxWidth: 760 }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <Kicker>{data.faq.kicker}</Kicker>
            <Title t={data.faq.title} em={data.faq.titleEmphasis} />
          </div>
          {data.faq.items.map((f, i) => (
            <div key={f.id} style={{ borderBottom: `1px solid ${T.line}` }}>
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, background: "none", border: "none", padding: "20px 0", cursor: "pointer", textAlign: "left", fontFamily: T.serif, fontSize: 17, color: T.text }}>
                <span>{f.q}</span>
                <span style={{ color: T.gold, fontSize: 22, lineHeight: 1, flexShrink: 0 }}>{openFaq === i ? "−" : "+"}</span>
              </button>
              {openFaq === i && <p style={{ ...S.p, padding: "0 0 20px" }}>{f.a}</p>}
            </div>
          ))}
        </div>
      </section>

      {/* CTA FINAL */}
      <section style={{ ...S.section, textAlign: "center" }}>
        <Kicker>{data.finalCta.kicker}</Kicker>
        <Title t={data.finalCta.title} em={data.finalCta.titleEmphasis} />
        <p style={{ ...S.p, maxWidth: 480, margin: "16px auto 28px" }}>{data.finalCta.subtitle}</p>
        <a href={wa} target="_blank" rel="noreferrer" style={S.cta}>{data.finalCta.ctaText}</a>
        <div style={{ marginTop: 18, fontFamily: T.sans, fontSize: 12, color: T.muted }}>{data.finalCta.scarcity}</div>
      </section>

      <footer style={{ borderTop: `1px solid ${T.line}`, padding: "28px 20px", textAlign: "center", fontFamily: T.sans, fontSize: 12, color: T.muted }}>
        {data.brand.name} · {data.brand.location} — © {new Date().getFullYear()}
      </footer>

      {/* WHATSAPP FLUTUANTE */}
      <a href={wa} target="_blank" rel="noreferrer" style={{ position: "fixed", bottom: 22, right: 22, width: 54, height: 54, borderRadius: "50%", background: "#25D366", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 6px 20px rgba(0,0,0,.4)", zIndex: 45, textDecoration: "none", fontSize: 26 }}>💬</a>

      {/* BOTAO ADMIN */}
      <button onClick={() => setAdminOpen(true)} title="Painel admin" style={{ position: "fixed", bottom: 22, left: 22, width: 46, height: 46, borderRadius: "50%", background: T.panel2, border: `1px solid ${T.goldSoft}`, color: T.gold, cursor: "pointer", zIndex: 45, fontSize: 20 }}>⚙</button>

      {adminOpen && (
        <AdminPanel T={T} S={S} data={data} setData={update} saveAll={saveAll} authed={authed} setAuthed={setAuthed} close={() => setAdminOpen(false)} downscaleImage={downscaleImage} persist={persist} />
      )}
    </div>
  );
}

// =============================================================
//  PAINEL ADMIN
// =============================================================
function AdminPanel({ T, S, data, setData, saveAll, authed, setAuthed, close, downscaleImage, persist }) {
  const [tab, setTab] = useState("marca");
  const [pass, setPass] = useState("");
  const tabs = [
    ["marca", "Marca / Hero"], ["catalogo", "Catálogo"], ["stats", "Números"],
    ["depo", "Depoimentos"], ["sobre", "Sobre"], ["faq", "FAQ"], ["aparencia", "Aparência"],
  ];

  const wrap = { position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", zIndex: 60, display: "flex", justifyContent: "center", alignItems: "flex-start", overflowY: "auto", padding: "0" };
  const sheet = { background: T.bg, width: "100%", maxWidth: 620, minHeight: "100vh", borderLeft: `1px solid ${T.line}`, borderRight: `1px solid ${T.line}` };
  const lbl = { fontFamily: T.sans, fontSize: 11, color: T.muted, textTransform: "uppercase", letterSpacing: "1px", display: "block", margin: "14px 0 5px" };
  const inp = { width: "100%", boxSizing: "border-box", background: T.panel, border: `1px solid ${T.line}`, color: T.text, fontFamily: T.sans, fontSize: 14, padding: "10px 12px", borderRadius: 3, outline: "none" };
  const btn = { ...S.cta, fontSize: 12, padding: "12px 20px" };
  const btnSm = { background: T.panel2, border: `1px solid ${T.line}`, color: T.text, fontFamily: T.sans, fontSize: 12, padding: "7px 12px", borderRadius: 3, cursor: "pointer" };
  const card = { border: `1px solid ${T.line}`, borderRadius: 4, padding: 14, marginBottom: 14, background: T.panel };

  const set = (patch) => setData({ ...data, ...patch });

  async function pickImage(cb) {
    const input = document.createElement("input");
    input.type = "file"; input.accept = "image/*";
    input.onchange = async (e) => {
      const file = e.target.files?.[0]; if (!file) return;
      try { const b64 = await downscaleImage(file); cb(b64); } catch { alert("Falha ao processar imagem."); }
    };
    input.click();
  }

  const ImgField = ({ value, onChange, label }) => (
    <div>
      <span style={lbl}>{label}</span>
      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        <div style={{ width: 60, height: 60, borderRadius: 4, overflow: "hidden", flexShrink: 0, ...(!value ? { ...S.imgPh, fontSize: 8 } : {}) }}>
          {value ? <img src={value} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : "—"}
        </div>
        <button style={btnSm} onClick={() => pickImage(onChange)}>Enviar imagem</button>
        {value && <button style={{ ...btnSm, color: "#e08a8a" }} onClick={() => onChange(null)}>Remover</button>}
      </div>
    </div>
  );

  // ---- gate de senha ----
  if (!authed) {
    return (
      <div style={wrap} onClick={close}>
        <div style={{ ...sheet, maxWidth: 380, minHeight: "auto", margin: "80px 16px", borderRadius: 6, border: `1px solid ${T.line}`, padding: 28 }} onClick={(e) => e.stopPropagation()}>
          <h3 style={{ fontFamily: T.serif, color: T.text, fontSize: 22, margin: "0 0 6px" }}>Painel admin</h3>
          <p style={{ fontFamily: T.sans, fontSize: 13, color: T.muted, margin: "0 0 18px" }}>Digite a senha para editar o site.</p>
          <input type="password" value={pass} onChange={(e) => setPass(e.target.value)} placeholder="Senha" style={inp}
            onKeyDown={(e) => { if (e.key === "Enter") { if (pass === data.config.adminPass) setAuthed(true); else alert("Senha incorreta."); } }} />
          <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
            <button style={btn} onClick={() => { if (pass === data.config.adminPass) setAuthed(true); else alert("Senha incorreta."); }}>Entrar</button>
            <button style={btnSm} onClick={close}>Fechar</button>
          </div>
          <p style={{ fontFamily: T.sans, fontSize: 11, color: T.muted, marginTop: 16 }}>Senha padrão: <b style={{ color: T.gold }}>admin</b> — troque em "Aparência".</p>
        </div>
      </div>
    );
  }

  return (
    <div style={wrap}>
      <div style={sheet}>
        {/* topo */}
        <div style={{ position: "sticky", top: 0, background: T.bg, borderBottom: `1px solid ${T.line}`, padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", zIndex: 5 }}>
          <div style={{ fontFamily: T.serif, color: T.text, fontSize: 18 }}>Painel admin</div>
          <div style={{ display: "flex", gap: 8 }}>
            <button style={btn} onClick={saveAll}>Salvar alterações</button>
            <button style={btnSm} onClick={close}>Ver site</button>
          </div>
        </div>
        {/* abas */}
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", padding: "14px 20px", borderBottom: `1px solid ${T.line}` }}>
          {tabs.map(([k, label]) => (
            <button key={k} onClick={() => setTab(k)} style={{ ...btnSm, background: tab === k ? T.gold : T.panel2, color: tab === k ? "#0b0b0d" : T.text, fontWeight: tab === k ? 600 : 400 }}>{label}</button>
          ))}
        </div>

        <div style={{ padding: 20 }}>
          {/* MARCA / HERO */}
          {tab === "marca" && (
            <div>
              <span style={lbl}>Nome da marca</span>
              <input style={inp} value={data.brand.name} onChange={(e) => set({ brand: { ...data.brand, name: e.target.value } })} />
              <span style={lbl}>Slogan (topo)</span>
              <input style={inp} value={data.brand.tagline} onChange={(e) => set({ brand: { ...data.brand, tagline: e.target.value } })} />
              <span style={lbl}>Cidade / localização</span>
              <input style={inp} value={data.brand.location} onChange={(e) => set({ brand: { ...data.brand, location: e.target.value } })} />
              <div style={{ height: 1, background: T.line, margin: "22px 0" }} />
              <span style={lbl}>Kicker do hero</span>
              <input style={inp} value={data.hero.kicker} onChange={(e) => set({ hero: { ...data.hero, kicker: e.target.value } })} />
              <span style={lbl}>Título — linha 1</span>
              <input style={inp} value={data.hero.line1} onChange={(e) => set({ hero: { ...data.hero, line1: e.target.value } })} />
              <span style={lbl}>Título — linha 2</span>
              <input style={inp} value={data.hero.line2} onChange={(e) => set({ hero: { ...data.hero, line2: e.target.value } })} />
              <span style={lbl}>Ênfase (itálico dourado)</span>
              <input style={inp} value={data.hero.emphasis} onChange={(e) => set({ hero: { ...data.hero, emphasis: e.target.value } })} />
              <span style={lbl}>Subtítulo</span>
              <textarea style={{ ...inp, minHeight: 70 }} value={data.hero.subtitle} onChange={(e) => set({ hero: { ...data.hero, subtitle: e.target.value } })} />
              <span style={lbl}>Texto do botão</span>
              <input style={inp} value={data.hero.ctaText} onChange={(e) => set({ hero: { ...data.hero, ctaText: e.target.value } })} />
              <span style={lbl}>Preço / nota abaixo do botão</span>
              <input style={inp} value={data.hero.priceFrom} onChange={(e) => set({ hero: { ...data.hero, priceFrom: e.target.value } })} />
              <input style={{ ...inp, marginTop: 8 }} value={data.hero.note} onChange={(e) => set({ hero: { ...data.hero, note: e.target.value } })} />
              <div style={{ marginTop: 14 }}>
                <ImgField label="Imagem de fundo do hero (opcional)" value={data.hero.heroImg} onChange={(v) => set({ hero: { ...data.hero, heroImg: v } })} />
              </div>
            </div>
          )}

          {/* CATALOGO */}
          {tab === "catalogo" && (
            <div>
              <span style={lbl}>Kicker</span>
              <input style={inp} value={data.catalog.kicker} onChange={(e) => set({ catalog: { ...data.catalog, kicker: e.target.value } })} />
              <div style={{ display: "flex", gap: 8 }}>
                <div style={{ flex: 1 }}><span style={lbl}>Título</span><input style={inp} value={data.catalog.title} onChange={(e) => set({ catalog: { ...data.catalog, title: e.target.value } })} /></div>
                <div style={{ flex: 1 }}><span style={lbl}>Ênfase</span><input style={inp} value={data.catalog.titleEmphasis} onChange={(e) => set({ catalog: { ...data.catalog, titleEmphasis: e.target.value } })} /></div>
              </div>
              <span style={lbl}>Subtítulo</span>
              <textarea style={{ ...inp, minHeight: 60 }} value={data.catalog.subtitle} onChange={(e) => set({ catalog: { ...data.catalog, subtitle: e.target.value } })} />
              <div style={{ height: 1, background: T.line, margin: "20px 0 14px" }} />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <b style={{ fontFamily: T.sans, color: T.text, fontSize: 14 }}>Produtos ({data.products.length})</b>
                <button style={btnSm} onClick={() => set({ products: [...data.products, { id: Date.now(), name: "Novo produto", tag: "Disponível", price: "A partir de R$ 0.000", img: null }] })}>+ Adicionar produto</button>
              </div>
              {data.products.map((p, idx) => (
                <div key={p.id} style={card}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                    <span style={{ fontFamily: T.sans, fontSize: 11, color: T.gold }}>#{idx + 1}</span>
                    <button style={{ ...btnSm, color: "#e08a8a", padding: "3px 8px" }} onClick={() => set({ products: data.products.filter((x) => x.id !== p.id) })}>Excluir</button>
                  </div>
                  <input style={inp} value={p.name} placeholder="Nome" onChange={(e) => set({ products: data.products.map((x) => x.id === p.id ? { ...x, name: e.target.value } : x) })} />
                  <input style={{ ...inp, marginTop: 8 }} value={p.tag} placeholder="Tag / status" onChange={(e) => set({ products: data.products.map((x) => x.id === p.id ? { ...x, tag: e.target.value } : x) })} />
                  <input style={{ ...inp, marginTop: 8 }} value={p.price} placeholder="Preço" onChange={(e) => set({ products: data.products.map((x) => x.id === p.id ? { ...x, price: e.target.value } : x) })} />
                  <div style={{ marginTop: 10 }}>
                    <ImgField label="Foto do produto" value={p.img} onChange={(v) => set({ products: data.products.map((x) => x.id === p.id ? { ...x, img: v } : x) })} />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* STATS */}
          {tab === "stats" && (
            <div>
              <p style={{ fontFamily: T.sans, fontSize: 13, color: T.muted, marginBottom: 8 }}>Os 4 números da faixa de destaque.</p>
              {data.stats.map((s, i) => (
                <div key={i} style={{ ...card, display: "flex", gap: 8 }}>
                  <div style={{ width: 110 }}><span style={lbl}>Número</span><input style={inp} value={s.num} onChange={(e) => set({ stats: data.stats.map((x, j) => j === i ? { ...x, num: e.target.value } : x) })} /></div>
                  <div style={{ flex: 1 }}><span style={lbl}>Rótulo</span><input style={inp} value={s.label} onChange={(e) => set({ stats: data.stats.map((x, j) => j === i ? { ...x, label: e.target.value } : x) })} /></div>
                </div>
              ))}
            </div>
          )}

          {/* DEPOIMENTOS */}
          {tab === "depo" && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <b style={{ fontFamily: T.sans, color: T.text, fontSize: 14 }}>Depoimentos ({data.testimonials.items.length})</b>
                <button style={btnSm} onClick={() => set({ testimonials: { ...data.testimonials, items: [...data.testimonials.items, { id: Date.now(), name: "Cliente", detail: "Produto · Cidade", text: "Novo depoimento.", img: null }] } })}>+ Adicionar</button>
              </div>
              {data.testimonials.items.map((t) => (
                <div key={t.id} style={card}>
                  <div style={{ textAlign: "right" }}><button style={{ ...btnSm, color: "#e08a8a", padding: "3px 8px" }} onClick={() => set({ testimonials: { ...data.testimonials, items: data.testimonials.items.filter((x) => x.id !== t.id) } })}>Excluir</button></div>
                  <textarea style={{ ...inp, minHeight: 60 }} value={t.text} onChange={(e) => set({ testimonials: { ...data.testimonials, items: data.testimonials.items.map((x) => x.id === t.id ? { ...x, text: e.target.value } : x) } })} />
                  <input style={{ ...inp, marginTop: 8 }} value={t.name} placeholder="Nome" onChange={(e) => set({ testimonials: { ...data.testimonials, items: data.testimonials.items.map((x) => x.id === t.id ? { ...x, name: e.target.value } : x) } })} />
                  <input style={{ ...inp, marginTop: 8 }} value={t.detail} placeholder="Produto · Cidade" onChange={(e) => set({ testimonials: { ...data.testimonials, items: data.testimonials.items.map((x) => x.id === t.id ? { ...x, detail: e.target.value } : x) } })} />
                  <div style={{ marginTop: 10 }}><ImgField label="Foto do cliente" value={t.img} onChange={(v) => set({ testimonials: { ...data.testimonials, items: data.testimonials.items.map((x) => x.id === t.id ? { ...x, img: v } : x) } })} /></div>
                </div>
              ))}
            </div>
          )}

          {/* SOBRE */}
          {tab === "sobre" && (
            <div>
              <ImgField label="Foto do especialista" value={data.about.img} onChange={(v) => set({ about: { ...data.about, img: v } })} />
              <span style={lbl}>Nome</span>
              <input style={inp} value={data.about.name} onChange={(e) => set({ about: { ...data.about, name: e.target.value } })} />
              <span style={lbl}>Cargo / localização</span>
              <input style={inp} value={data.about.role} onChange={(e) => set({ about: { ...data.about, role: e.target.value } })} />
              <span style={lbl}>Apresentação</span>
              <textarea style={{ ...inp, minHeight: 90 }} value={data.about.bio} onChange={(e) => set({ about: { ...data.about, bio: e.target.value } })} />
              <span style={lbl}>Diferenciais (um por linha)</span>
              <textarea style={{ ...inp, minHeight: 90 }} value={data.about.bullets.join("\n")} onChange={(e) => set({ about: { ...data.about, bullets: e.target.value.split("\n") } })} />
            </div>
          )}

          {/* FAQ */}
          {tab === "faq" && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <b style={{ fontFamily: T.sans, color: T.text, fontSize: 14 }}>Perguntas ({data.faq.items.length})</b>
                <button style={btnSm} onClick={() => set({ faq: { ...data.faq, items: [...data.faq.items, { id: Date.now(), q: "Nova pergunta?", a: "Resposta." }] } })}>+ Adicionar</button>
              </div>
              {data.faq.items.map((f) => (
                <div key={f.id} style={card}>
                  <div style={{ textAlign: "right" }}><button style={{ ...btnSm, color: "#e08a8a", padding: "3px 8px" }} onClick={() => set({ faq: { ...data.faq, items: data.faq.items.filter((x) => x.id !== f.id) } })}>Excluir</button></div>
                  <input style={inp} value={f.q} placeholder="Pergunta" onChange={(e) => set({ faq: { ...data.faq, items: data.faq.items.map((x) => x.id === f.id ? { ...x, q: e.target.value } : x) } })} />
                  <textarea style={{ ...inp, marginTop: 8, minHeight: 60 }} value={f.a} placeholder="Resposta" onChange={(e) => set({ faq: { ...data.faq, items: data.faq.items.map((x) => x.id === f.id ? { ...x, a: e.target.value } : x) } })} />
                </div>
              ))}
            </div>
          )}

          {/* APARENCIA */}
          {tab === "aparencia" && (
            <div>
              <span style={lbl}>Cor de destaque (dourado)</span>
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <input type="color" value={data.config.accent} onChange={(e) => set({ config: { ...data.config, accent: e.target.value } })} style={{ width: 48, height: 40, background: "none", border: `1px solid ${T.line}`, borderRadius: 4, cursor: "pointer" }} />
                <input style={inp} value={data.config.accent} onChange={(e) => set({ config: { ...data.config, accent: e.target.value } })} />
              </div>
              <span style={lbl}>WhatsApp (só números, com DDI+DDD)</span>
              <input style={inp} value={data.config.whatsapp} placeholder="5511999999999" onChange={(e) => set({ config: { ...data.config, whatsapp: e.target.value.replace(/\D/g, "") } })} />
              <span style={lbl}>Mensagem automática do WhatsApp</span>
              <textarea style={{ ...inp, minHeight: 60 }} value={data.config.waMessage} onChange={(e) => set({ config: { ...data.config, waMessage: e.target.value } })} />
              <span style={lbl}>Senha do painel admin</span>
              <input style={inp} value={data.config.adminPass} onChange={(e) => set({ config: { ...data.config, adminPass: e.target.value } })} />
              <div style={{ marginTop: 20, padding: 14, border: `1px dashed ${T.goldSoft}`, borderRadius: 4 }}>
                <p style={{ fontFamily: T.sans, fontSize: 12, color: T.muted, margin: 0 }}>Este é um protótipo: os dados ficam salvos neste navegador. Para virar seu site publicado (domínio próprio, fotos hospedadas e login real), migramos para Supabase.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
