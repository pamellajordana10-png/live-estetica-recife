import React, { useEffect, useRef, useState } from "react";
import { Menu, X, Star, MapPin, Phone, Sparkles, Heart, MessageCircle, ArrowRight, ArrowUpRight, Check, Clock } from "lucide-react";
import heroImg from "container:///mnt/data/src/assets/ef4c06c3852081a8-image_20261122_162609.webp";
import aboutImg from "container:///mnt/data/src/assets/4e7b1d015a5cff34-image_20261122_162614.webp";
import peleImg from "container:///mnt/data/src/assets/822a479dabef1c76-image_20261122_162609_1.webp";
import botoxImg from "container:///mnt/data/src/assets/3e1233d11b9de1cf-image_20261122_162607.webp";
import preenchImg from "container:///mnt/data/src/assets/77b3372e340148cf-image_20261122_162616.webp";
import massaImg from "container:///mnt/data/src/assets/be4824bd194994a6-image_20261122_162608_1.webp";
import avancadaImg from "container:///mnt/data/src/assets/abb671b06e8fb2ee-image_20261122_162611.webp";
import gorduraImg from "container:///mnt/data/src/assets/2d475bd47d645b5a-image_20261122_162608.webp";

const PHONE_LABEL = "(81) 99294-9242";
const ADDRESS = "Rua Viscondessa do Livramento, 233 – Derby, Recife – PE, CEP 52010-065";
const ADDRESS_SHORT = "Rua Viscondessa do Livramento, 233 – Derby, Recife – PE";
const WA_BASE = "https://wa.me/5581992949242";
const GENERAL_MSG = "Olá! Conheci a Live Estética Recife pelo site e gostaria de saber mais sobre os tratamentos e agendamentos.";
const TEAM_MSG = "Olá! Conheci a Live Estética Recife pelo site e gostaria de falar com a equipe.";
const DIRECTIONS = "https://www.google.com/maps/search/?api=1&query=Rua+Viscondessa+do+Livramento+233+Derby+Recife+PE";

function wa(text: string) {
  return `${WA_BASE}?text=${encodeURIComponent(text)}`;
}
function waTreatment(name: string) {
  return wa(`Olá! Vi no site da Live Estética Recife o tratamento ${name} e gostaria de saber mais.`);
}

function WhatsAppIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.6-6.1c-.3-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.3-.7.8-.9 1-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.4-3c-.3-.4 0-.6.1-.8l.4-.5c.1-.2.1-.3 0-.5l-.8-1.9c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.2s.9 2.5 1.1 2.7c.1.2 1.9 2.9 4.6 4 .6.3 1.1.4 1.5.6.6.2 1.2.2 1.6.1.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.2-.2-.5-.3Z" />
    </svg>
  );
}

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { el.classList.add("is-visible"); obs.disconnect(); } }),
      { threshold: 0.12, rootMargin: "0px 0px -20px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}

const treatments = [
  { name: "Cuidados com a pele", desc: "Tratamentos voltados ao cuidado e à aparência da pele.", img: peleImg, alt: "Tratamento de cuidados com a pele em ambiente de estética" },
  { name: "Botox", desc: "Conheça as opções de tratamentos estéticos faciais oferecidas pela clínica.", img: botoxImg, alt: "Tratamento facial Botox em clínica de estética" },
  { name: "Preenchimento", desc: "Procedimentos estéticos com avaliação individualizada.", img: preenchImg, alt: "Tratamento de preenchimento facial" },
  { name: "Massagens", desc: "Momentos dedicados ao relaxamento e ao bem-estar.", img: massaImg, alt: "Massagem relaxante em ambiente tranquilo" },
  { name: "Estética avançada", desc: "Conheça as opções de cuidados estéticos disponíveis.", img: avancadaImg, alt: "Tratamento de estética avançada" },
  { name: "Gordura localizada", desc: "Saiba mais sobre os tratamentos estéticos corporais oferecidos.", img: gorduraImg, alt: "Tratamento corporal para gordura localizada" },
];

const nav = [
  { label: "Início", href: "#inicio" },
  { label: "Sobre nós", href: "#sobre" },
  { label: "Tratamentos", href: "#tratamentos" },
  { label: "Avaliações", href: "#avaliacoes" },
  { label: "Localização", href: "#localizacao" },
  { label: "Contato", href: "#contato" },
];

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  // Para configurar o botão "Ver avaliações no Google", troque a constante abaixo pela URL do perfil da clínica no Google.
  // Exemplo: const GOOGLE_REVIEWS_URL = "https://g.page/r/...";
  const GOOGLE_REVIEWS_URL = "";
  const [googleNotice, setGoogleNotice] = useState(false);

  useEffect(() => {
    document.title = "Live Estética Recife — Clínica de estética no Derby, Recife/PE";
    document.documentElement.lang = "pt-BR";
    const metaDesc = document.querySelector('meta[name="description"]') || document.createElement("meta");
    metaDesc.setAttribute("name", "description");
    metaDesc.setAttribute("content", "Live Estética Recife — Clínica de estética no Derby, Recife/PE. Cuidados com a pele, botox, preenchimento, massagens, estética avançada e gordura localizada. Agende pelo WhatsApp.");
    if (!metaDesc.parentNode) document.head.appendChild(metaDesc);
    const viewport = document.querySelector('meta[name="viewport"]') || document.createElement("meta");
    viewport.setAttribute("name", "viewport");
    viewport.setAttribute("content", "width=device-width, initial-scale=1");
    if (!viewport.parentNode) document.head.appendChild(viewport);
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: "Live Estética Recife",
      address: { "@type": "PostalAddress", streetAddress: "Rua Viscondessa do Livramento, 233 – Derby", addressLocality: "Recife", addressRegion: "PE", postalCode: "52010-065", addressCountry: "BR" },
      telephone: "+55 81 99294-9242",
      aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "58" },
    });
    document.head.appendChild(script);
    return () => { script.remove(); };
  }, []);

  const openGoogleReviews = (e: React.MouseEvent) => {
    if (!GOOGLE_REVIEWS_URL) {
      e.preventDefault();
      setGoogleNotice(true);
    }
  };

  return (
    <div data-safe-area-inset-root style={{ boxSizing: "border-box", paddingTop: "var(--safe-area-inset-top)", minHeight: "100vh", background: "var(--bg)" }} className="overflow-x-clip">
      {/* Topbar */}
      <div className="bg-[var(--ink)] text-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-5 gap-y-1 px-4 py-2 text-[12px] tracking-wide sm:justify-between sm:px-6 sm:text-[13px]">
          <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-[var(--gold)]" aria-hidden="true" /> Derby • Recife – PE</span>
          <span className="flex items-center gap-1.5"><Star className="h-3.5 w-3.5 fill-[var(--gold)] text-[var(--gold)]" aria-hidden="true" /> 4,9 no Google <span className="opacity-70">(58 avaliações)</span></span>
          <a href={wa(GENERAL_MSG)} target="_blank" rel="noopener" className="flex items-center gap-1.5 hover:underline"><Phone className="h-3.5 w-3.5" aria-hidden="true" /> {PHONE_LABEL}</a>
        </div>
      </div>

      {/* Header */}
      <header data-safe-area-sticky-top style={{ top: "var(--safe-area-inset-top)" }} className="sticky z-40 border-b border-[var(--line)] bg-[var(--bg)]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 sm:py-4">
          <a href="#inicio" className="leading-none" aria-label="Live Estética Recife — Início">
            <span className="font-display text-[26px] font-semibold tracking-[0.08em] sm:text-[30px]">LIVE<span className="text-[var(--gold)]">.</span></span>
            <span className="mt-1 block text-[9px] font-semibold tracking-[0.32em] text-[var(--muted)] sm:text-[10px]">ESTÉTICA RECIFE</span>
          </a>
          <nav className="hidden items-center gap-7 lg:flex" aria-label="Navegação principal">
            {nav.map((item) => (
              <a key={item.href} href={item.href} className="link-underline text-[14px] font-medium text-[var(--ink)] hover:text-[var(--primary)]">{item.label}</a>
            ))}
          </nav>
          <div className="flex items-center gap-2 sm:gap-3">
            <a href={wa(GENERAL_MSG)} target="_blank" rel="noopener" className="hidden items-center gap-2 rounded-full bg-[var(--primary)] px-4 py-2.5 text-[13px] font-semibold text-white shadow-sm transition hover:bg-[var(--primary-dark)] sm:inline-flex sm:px-5">
              Agendar avaliação <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <button type="button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label={menuOpen ? "Fechar menu" : "Abrir menu"} className="grid h-11 w-11 place-items-center rounded-full border border-[var(--line)] bg-[var(--surface)] lg:hidden">
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav className="border-t border-[var(--line)] bg-[var(--surface)] px-4 pb-5 pt-2 lg:hidden" aria-label="Menu móvel">
            {nav.map((item) => (
              <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)} className="flex items-center justify-between border-b border-[var(--line)] py-3.5 text-[16px] font-medium last:border-0">{item.label} <ArrowUpRight className="h-4 w-4 text-[var(--gold)]" aria-hidden="true" /></a>
            ))}
            <a href={wa(GENERAL_MSG)} target="_blank" rel="noopener" className="mt-4 flex items-center justify-center gap-2 rounded-full bg-[var(--primary)] px-5 py-3.5 font-semibold text-white">Agendar avaliação <WhatsAppIcon /></a>
          </nav>
        )}
      </header>

      <main>
        {/* HERO */}
        <section id="inicio" className="overflow-x-clip">
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 pb-14 pt-8 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:pb-20 lg:pt-14">
            <Reveal>
              <p className="text-[11px] font-bold tracking-[0.28em] text-[var(--primary)]">CLÍNICA DE ESTÉTICA • DERBY — RECIFE</p>
              <h1 className="font-display mt-4 text-[clamp(2.4rem,7vw,4.4rem)] font-medium leading-[1.04] tracking-tight">Sua beleza merece <em className="italic text-[var(--primary)]">um cuidado</em> especial.</h1>
              <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-[var(--muted)] sm:text-lg">Descubra um espaço dedicado à beleza, ao autocuidado e ao seu bem-estar, no coração do Recife.</p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a href={wa(GENERAL_MSG)} target="_blank" rel="noopener" className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--primary)] px-6 py-3.5 font-semibold text-white shadow-lg shadow-[var(--primary)]/25 transition hover:bg-[var(--primary-dark)]"><WhatsAppIcon /> Agendar meu atendimento</a>
                <a href="#tratamentos" className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--ink)]/20 bg-[var(--surface)] px-6 py-3.5 font-semibold transition hover:border-[var(--primary)]">Conhecer os tratamentos <ArrowRight className="h-4 w-4" aria-hidden="true" /></a>
              </div>
              <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-[13px] font-medium text-[var(--muted)]">
                <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4 text-[var(--gold)]" /> Atendimento em Recife – PE</span>
                <span className="flex items-center gap-1.5"><Star className="h-4 w-4 fill-[var(--gold)] text-[var(--gold)]" /> Avaliação 4,9 estrelas no Google</span>
                <span className="flex items-center gap-1.5"><Check className="h-4 w-4 text-[var(--gold)]" /> Localização no bairro Derby</span>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div className="relative">
                <div className="overflow-hidden rounded-[28px] shadow-2xl shadow-[var(--primary)]/20">
                  <img src={heroImg} alt="Sala de estética sofisticada com iluminação natural suave e tons neutros" className="aspect-[4/3.4] w-full object-cover sm:aspect-[4/3.6]" />
                </div>
                <div className="float-soft absolute -bottom-5 left-4 flex items-center gap-3 rounded-2xl border border-[var(--line)] bg-[var(--surface)]/95 px-4 py-3 shadow-xl backdrop-blur sm:left-6">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-[#FFF7E8] text-[var(--gold)]"><Star className="h-6 w-6 fill-[var(--gold)]" /></span>
                  <span><strong className="font-display text-[22px] leading-none">4,9 ★</strong><span className="mt-1 block text-[12px] font-medium text-[var(--muted)]">58 avaliações no Google</span></span>
                </div>
                <div className="absolute -right-2 -top-3 hidden rounded-full bg-[var(--gold)] px-4 py-2 text-[11px] font-bold tracking-[0.18em] text-white shadow-lg sm:block">DERBY • RECIFE</div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* SOBRE */}
        <section id="sobre" className="bg-[var(--surface)]">
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:py-24">
            <Reveal>
              <div className="relative">
                <div className="overflow-hidden rounded-[28px]"><img src={aboutImg} alt="Tratamento facial em clínica de estética" loading="lazy" className="aspect-[4/4.4] w-full object-cover sm:aspect-[4/3.8]" /></div>
                <div className="absolute -bottom-4 -right-2 hidden h-28 w-28 rounded-full border-[10px] border-[var(--secondary)]/40 sm:block" aria-hidden="true" />
              </div>
            </Reveal>
            <Reveal delay={100}>
              <p className="text-[11px] font-bold tracking-[0.28em] text-[var(--primary)]">SOBRE NÓS</p>
              <h2 className="font-display mt-3 text-[clamp(1.9rem,5vw,3.2rem)] font-medium leading-[1.12]">Um espaço pensado para cuidar de você.</h2>
              <p className="mt-5 text-[16px] leading-relaxed text-[var(--muted)] sm:text-[17px]">Na Live Estética Recife, cada momento de autocuidado merece atenção especial. Um espaço dedicado a tratamentos estéticos, beleza e bem-estar, com diferentes opções para quem deseja reservar um tempo para si.</p>
              <ul className="mt-6 space-y-3">
                {["Espaço dedicado ao autocuidado", "Diversidade de tratamentos", "Atendimento em Recife"].map((t) => (
                  <li key={t} className="flex items-center gap-3 font-medium"><span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[var(--secondary)]/50 text-[var(--primary)]"><Check className="h-4 w-4" /></span> {t}</li>
                ))}
              </ul>
              <a href={wa(TEAM_MSG)} target="_blank" rel="noopener" className="mt-8 inline-flex items-center gap-2 rounded-full bg-[var(--ink)] px-6 py-3.5 font-semibold text-white transition hover:bg-[var(--primary)]"><WhatsAppIcon /> Fale com nossa equipe</a>
            </Reveal>
          </div>
        </section>

        {/* TRATAMENTOS */}
        <section id="tratamentos" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="text-[11px] font-bold tracking-[0.28em] text-[var(--primary)]">TRATAMENTOS</p>
            <h2 className="font-display mt-3 text-[clamp(1.9rem,5vw,3.2rem)] font-medium leading-[1.12]">Tratamentos para valorizar sua beleza.</h2>
            <p className="mt-4 text-[var(--muted)]">Conheça algumas das opções de cuidados disponíveis na Live Estética Recife.</p>
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {treatments.map((t, i) => (
              <Reveal key={t.name} delay={i * 60}>
                <article className="card-hover group flex h-full flex-col overflow-hidden rounded-[24px] border border-[var(--line)] bg-[var(--surface)] shadow-sm">
                  <div className="overflow-hidden"><img src={t.img} alt={t.alt} loading="lazy" className="aspect-[16/10] w-full object-cover transition duration-500 group-hover:scale-105" /></div>
                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <h3 className="font-display text-[22px] font-semibold">{t.name}</h3>
                    <p className="mt-2 flex-1 text-[14px] leading-relaxed text-[var(--muted)] [overflow-wrap:anywhere]">{t.desc}</p>
                    <a href={waTreatment(t.name)} target="_blank" rel="noopener" className="mt-5 inline-flex items-center justify-center gap-2 rounded-full border border-[var(--primary)] px-4 py-3 text-[14px] font-semibold text-[var(--primary)] transition hover:bg-[var(--primary)] hover:text-white"><WhatsAppIcon className="h-4 w-4" /> Consultar pelo WhatsApp</a>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* DIFERENCIAIS */}
        <section className="bg-[var(--surface)]">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
            <Reveal className="mx-auto max-w-2xl text-center">
              <p className="text-[11px] font-bold tracking-[0.28em] text-[var(--primary)]">DIFERENCIAIS</p>
              <h2 className="font-display mt-3 text-[clamp(1.9rem,5vw,3.2rem)] font-medium leading-[1.12]">Seu momento de cuidado começa aqui.</h2>
            </Reveal>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { icon: Sparkles, title: "Diversidade de tratamentos", desc: "Diferentes opções de cuidados para o seu momento." },
                { icon: Heart, title: "Espaço dedicado ao autocuidado", desc: "Um ambiente pensado para reservar um tempo para si." },
                { icon: MapPin, title: "Atendimento em Recife", desc: "Localização no bairro Derby, em Recife – PE." },
                { icon: MessageCircle, title: "Contato direto pelo WhatsApp", desc: "Converse com a equipe e consulte os horários." },
              ].map((d, i) => (
                <Reveal key={d.title} delay={i * 70}>
                  <div className="h-full rounded-[22px] border border-[var(--line)] bg-[var(--bg)] p-6 text-center">
                    <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[var(--secondary)]/50 text-[var(--primary)]"><d.icon className="h-6 w-6" aria-hidden="true" /></span>
                    <h3 className="mt-4 font-display text-[19px] font-semibold leading-snug">{d.title}</h3>
                    <p className="mt-2 text-[14px] leading-relaxed text-[var(--muted)] [overflow-wrap:anywhere]">{d.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* AVALIAÇÕES */}
        <section id="avaliacoes" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
          <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
            <Reveal>
              <p className="text-[11px] font-bold tracking-[0.28em] text-[var(--primary)]">AVALIAÇÕES</p>
              <h2 className="font-display mt-3 text-[clamp(1.9rem,5vw,3.2rem)] font-medium leading-[1.12]">A confiança de quem já nos visitou.</h2>
              <div className="mt-7 flex items-end gap-3">
                <span className="font-display text-[64px] font-semibold leading-none">4,9<span className="text-[28px] text-[var(--muted)]">/5</span></span>
                <span className="pb-2"><span className="flex gap-1 text-[var(--gold)]" aria-label="Avaliação 4,9 de 5 estrelas">{[1,2,3,4,5].map((s) => <Star key={s} className="h-5 w-5 fill-[var(--gold)]" />)}</span><span className="mt-1 block text-[14px] font-medium text-[var(--muted)]">no Google • 58 avaliações</span></span>
              </div>
              <p className="mt-4 max-w-md text-[15px] leading-relaxed text-[var(--muted)]">Trechos de avaliações publicadas no Google, apresentados como referência.</p>
              {/* Para configurar o botão "Ver avaliações no Google", troque GOOGLE_REVIEWS_URL no código pela URL do perfil da clínica no Google. */}
              <a href={GOOGLE_REVIEWS_URL || "#"} data-config="URL_DO_GOOGLE" onClick={openGoogleReviews} target={GOOGLE_REVIEWS_URL ? "_blank" : undefined} rel="noopener" className="mt-6 inline-flex items-center gap-2 rounded-full bg-[var(--ink)] px-6 py-3.5 font-semibold text-white transition hover:bg-[var(--primary)]">Ver avaliações no Google <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></a>
              {googleNotice && <p role="status" className="mt-3 rounded-xl border border-[var(--gold)]/50 bg-[#FFF7E8] px-4 py-3 text-[14px] font-medium text-[var(--ink)]">Configure aqui o link do perfil no Google</p>}
            </Reveal>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {["Super recomendo, ótima clínica de estética!", "Além do atendimento diferenciado, a clínica tem um ambiente muito agradável."].map((quote, i) => (
                <Reveal key={quote} delay={i * 90}>
                  <figure className="flex h-full flex-col rounded-[24px] border border-[var(--line)] bg-[var(--surface)] p-6 shadow-sm">
                    <span className="text-[var(--gold)]" aria-hidden="true">★★★★★</span>
                    <blockquote className="font-display mt-4 flex-1 text-[20px] leading-snug [overflow-wrap:anywhere]">“{quote}”</blockquote>
                    <figcaption className="mt-5 text-[13px] font-semibold tracking-wide text-[var(--muted)]">Avaliação no Google</figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[var(--primary)] text-white">
          <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:py-20">
            <Reveal>
              <h2 className="font-display text-[clamp(1.9rem,5vw,3.2rem)] font-medium leading-[1.15]">Seu próximo momento de autocuidado está a uma mensagem de distância.</h2>
              <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-white/85">Entre em contato com a Live Estética Recife, conheça os tratamentos e consulte os horários disponíveis.</p>
              <a href={wa(GENERAL_MSG)} target="_blank" rel="noopener" className="pulse-white mt-8 inline-flex items-center gap-3 rounded-full bg-white px-7 py-4 text-[16px] font-bold text-[var(--primary-dark)] shadow-xl transition hover:scale-[1.02]"><WhatsAppIcon className="h-6 w-6 text-[#25D366]" /> Quero agendar pelo WhatsApp</a>
            </Reveal>
          </div>
        </section>

        {/* LOCALIZAÇÃO / CONTATO */}
        <section id="localizacao" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
            <Reveal>
              <p className="text-[11px] font-bold tracking-[0.28em] text-[var(--primary)]">LOCALIZAÇÃO • CONTATO</p>
              <h2 id="contato" className="font-display mt-3 text-[clamp(1.9rem,5vw,3.2rem)] font-medium leading-[1.12]">Venha conhecer nosso espaço.</h2>
              <div className="mt-7 space-y-5">
                <div className="flex gap-3"><MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[var(--primary)]" /><div><strong>Live Estética Recife</strong><p className="mt-1 leading-relaxed text-[var(--muted)] [overflow-wrap:anywhere]">{ADDRESS}</p></div></div>
                <div className="flex gap-3"><Phone className="mt-0.5 h-5 w-5 shrink-0 text-[var(--primary)]" /><div><strong>Telefone / WhatsApp</strong><p className="mt-1 text-[var(--muted)]">{PHONE_LABEL}</p></div></div>
                <div className="flex gap-3"><Clock className="mt-0.5 h-5 w-5 shrink-0 text-[var(--primary)]" /><div><strong>Horários</strong><p className="mt-1 text-[var(--muted)]">Consulte os horários disponíveis pelo WhatsApp.</p></div></div>
              </div>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href={DIRECTIONS} target="_blank" rel="noopener" className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--primary)] px-6 py-3.5 font-semibold text-white transition hover:bg-[var(--primary-dark)]"><MapPin className="h-4 w-4" /> Como chegar</a>
                <a href={wa(GENERAL_MSG)} target="_blank" rel="noopener" className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--ink)]/20 bg-[var(--surface)] px-6 py-3.5 font-semibold transition hover:border-[var(--primary)]"><WhatsAppIcon /> Conversar no WhatsApp</a>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="flex h-full min-h-[320px] flex-col justify-between overflow-hidden rounded-[28px] border border-[var(--line)] bg-[var(--surface)]">
                <div className="relative flex-1 overflow-hidden"><img src={heroImg} alt="Ambiente da Live Estética Recife no bairro Derby" loading="lazy" className="h-full min-h-[260px] w-full object-cover" /><span className="absolute left-4 top-4 rounded-full bg-white/95 px-3.5 py-1.5 text-[12px] font-bold tracking-wide text-[var(--ink)] shadow">DERBY • RECIFE – PE</span></div>
                <div className="flex flex-wrap items-center justify-between gap-3 p-5">
                  <div><p className="font-display text-[19px] font-semibold">Live Estética Recife</p><p className="text-[13px] text-[var(--muted)] [overflow-wrap:anywhere]">{ADDRESS_SHORT}</p></div>
                  <span className="text-[13px] font-medium text-[var(--muted)]">Mapa não disponível.</span>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="bg-[var(--ink)] text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3 lg:py-16">
          <div><p className="font-display text-[26px] font-semibold tracking-[0.08em]">LIVE<span className="text-[var(--gold)]">.</span></p><p className="mt-1 text-[10px] font-semibold tracking-[0.32em] text-white/60">ESTÉTICA RECIFE</p><p className="mt-4 max-w-xs leading-relaxed text-white/70">Um espaço dedicado à beleza, ao autocuidado e ao seu bem-estar, no coração do Recife.</p></div>
          <nav aria-label="Links rápidos"><h3 className="text-[12px] font-bold tracking-[0.22em] text-[var(--gold)]">LINKS RÁPIDOS</h3><ul className="mt-4 space-y-2.5">{nav.map((n) => <li key={n.href}><a href={n.href} className="text-white/80 hover:text-white hover:underline">{n.label}</a></li>)}</ul></nav>
          <div><h3 className="text-[12px] font-bold tracking-[0.22em] text-[var(--gold)]">CONTATO</h3><address className="mt-4 space-y-3 not-italic leading-relaxed text-white/80 [overflow-wrap:anywhere]">{ADDRESS}<br /><a href={wa(GENERAL_MSG)} target="_blank" rel="noopener" className="hover:text-white hover:underline">{PHONE_LABEL} • WhatsApp</a></address><a href={wa(GENERAL_MSG)} target="_blank" rel="noopener" className="mt-5 inline-flex items-center gap-2 rounded-full bg-[var(--primary)] px-5 py-2.5 text-[14px] font-semibold text-white hover:bg-white hover:text-[var(--ink)]"><WhatsAppIcon className="h-4 w-4" /> Agendar avaliação</a></div>
        </div>
        <div className="border-t border-white/10"><div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-center text-[13px] text-white/60 sm:flex-row sm:px-6 sm:text-left"><span>© 2026 Live Estética Recife — Todos os direitos reservados.</span><span>Imagens ilustrativas.</span></div></div>
      </footer>

      {/* WhatsApp flutuante */}
      <a href={wa(GENERAL_MSG)} target="_blank" rel="noopener" aria-label="Conversar no WhatsApp da Live Estética Recife" className="pulse-soft fixed bottom-5 right-5 z-50 grid h-[60px] w-[60px] place-items-center rounded-full bg-[#25D366] text-white shadow-2xl transition hover:scale-105 sm:bottom-6 sm:right-6"><WhatsAppIcon className="h-8 w-8" /></a>
    </div>
  );
}
