import React, { useMemo } from 'react';
import { ArrowDown, Heart, Sparkles, MessageCircle, Hand, Palette } from 'lucide-react';

const PHONE_NUMBER = "584142826330";
const TILES_PER_ROW = 8;

// Fila de fotos que se desliza sola. La lista va duplicada para que el loop no tenga cortes.
function ShowcaseRow({ items, reverse, onOpenDetail, eager }) {
  return (
    <div className="overflow-hidden">
      <div className={`flex w-max ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}>
        {[...items, ...items].map((p, idx) => {
          const isCopy = idx >= items.length;
          return (
            <div key={`${p.id}-${idx}`} className="pr-3 sm:pr-4 shrink-0" aria-hidden={isCopy}>
              <button
                type="button"
                onClick={() => onOpenDetail?.(p)}
                tabIndex={isCopy ? -1 : 0}
                className="block w-24 h-32 sm:w-36 sm:h-48 rounded-2xl overflow-hidden border-2 border-white bg-[#ffccd5]/40 shadow-lg shadow-[#ff4d6d]/15 cursor-pointer group"
                title={p.name}
              >
                <img
                  src={p.image}
                  alt={isCopy ? '' : p.name}
                  loading={eager && !isCopy ? 'eager' : 'lazy'}
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => { e.target.src = '/logo.jpg'; }}
                />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Mientras cargan los productos se reserva el espacio (evita que la página "salte")
function SkeletonRow() {
  return (
    <div className="flex gap-3 sm:gap-4 overflow-hidden">
      {Array.from({ length: TILES_PER_ROW }).map((_, i) => (
        <div key={i} className="w-24 h-32 sm:w-36 sm:h-48 shrink-0 rounded-2xl bg-white/60 animate-pulse" />
      ))}
    </div>
  );
}

export default function Hero({ products = [], onOpenDetail }) {
  const scrollToCatalog = () => {
    const el = document.getElementById('catalogo');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Fotos para el carrusel: productos con foto, sin repetir
  const showcase = useMemo(() => {
    const seen = new Set();
    const list = [];
    for (const p of products) {
      const img = p.image || (p.images && p.images[0]);
      if (!img || seen.has(img)) continue;
      seen.add(img);
      list.push({ ...p, image: img });
      if (list.length === TILES_PER_ROW * 2) break;
    }
    return list;
  }, [products]);

  const rows = [showcase.slice(0, TILES_PER_ROW), showcase.slice(TILES_PER_ROW)];
  const designsLabel = products.length >= 10 ? `+${Math.floor(products.length / 10) * 10}` : `${products.length}`;

  const whatsappUrl = `https://api.whatsapp.com/send?phone=${PHONE_NUMBER}&text=${encodeURIComponent('¡Hola Zafiro Crochet! 🧶 Quiero hacer un pedido.')}`;

  return (
    <section className="relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-[#ff8fa3]/20 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute top-10 right-10 w-48 h-48 bg-[#ffccd5]/30 rounded-full blur-2xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 pt-8 pb-12 sm:pt-14 sm:pb-16 lg:py-20 grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 items-center">

        {/* Texto */}
        <div className="min-w-0 text-center lg:text-left space-y-4 sm:space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-[#ffccd5] text-[11px] sm:text-sm font-semibold text-[#800f2f] shadow-sm backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-[#ffb703]" />
            <span>Detalles únicos hechos 100% a mano en Caracas</span>
          </div>

          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black text-[#590d22] leading-[1.05] tracking-tight">
            Tejido con{' '}
            <span className="bg-gradient-to-r from-[#ff4d6d] to-[#ff8fa3] bg-clip-text text-transparent inline-flex items-center gap-1">
              amor <Heart className="w-8 h-8 sm:w-12 sm:h-12 lg:w-14 lg:h-14 fill-[#ff4d6d] text-[#ff4d6d] inline" />
            </span>
          </h2>

          <p className="text-sm sm:text-xl text-[#800f2f]/90 max-w-xl mx-auto lg:mx-0 font-medium">
            Ramos eternos, amigurumis de tus personajes favoritos, llaveros y peluches personalizados, tejidos con el corazón.
          </p>

          <div className="flex flex-row items-center justify-center lg:justify-start gap-2.5 sm:gap-3 pt-1">
            <button
              onClick={scrollToCatalog}
              className="inline-flex items-center gap-2 whitespace-nowrap px-5 py-3 sm:px-8 sm:py-4 rounded-full bg-gradient-to-r from-[#ff8fa3] to-[#ff4d6d] text-white font-bold text-sm sm:text-lg shadow-lg shadow-[#ff4d6d]/30 hover:shadow-xl hover:shadow-[#ff4d6d]/40 hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
            >
              Ver Catálogo <ArrowDown className="w-4 h-4 sm:w-5 sm:h-5 animate-bounce" />
            </button>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 whitespace-nowrap px-5 py-3 sm:px-7 sm:py-4 rounded-full bg-white border-2 border-[#ffccd5] text-[#590d22] font-bold text-sm sm:text-lg hover:border-[#ff8fa3] hover:-translate-y-0.5 active:translate-y-0 transition-all"
            >
              <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500" />
              <span><span className="hidden sm:inline">Pedir por </span>WhatsApp</span>
            </a>
          </div>

          {/* Datos de confianza */}
          <div className="flex items-center justify-center lg:justify-start gap-4 sm:gap-6 text-[11px] sm:text-sm font-semibold text-[#800f2f]/80">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#ffb703]" />
              <span><b className="text-[#590d22]">{designsLabel}</b> diseños</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Hand className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#ff4d6d]" /> Hecho a mano
            </span>
            <span className="flex items-center gap-1.5">
              <Palette className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#ff8fa3]" /> Personalizados
            </span>
          </div>
        </div>

        {/* Carrusel de creaciones */}
        <div className="min-w-0 space-y-3 sm:space-y-4 -mx-4 lg:mx-0 marquee-fade">
          {showcase.length >= TILES_PER_ROW ? (
            <>
              <ShowcaseRow items={rows[0]} onOpenDetail={onOpenDetail} eager />
              {rows[1].length >= 4 && <ShowcaseRow items={rows[1]} onOpenDetail={onOpenDetail} reverse />}
            </>
          ) : (
            <>
              <SkeletonRow />
              <SkeletonRow />
            </>
          )}
        </div>

      </div>
    </section>
  );
}
