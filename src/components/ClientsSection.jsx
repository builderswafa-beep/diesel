import React, { useRef, useState } from 'react';

export default function ClientsSection() {
  const viewportRef = useRef(null);
  const [activeDot, setActiveDot] = useState(0);
  const totalDots = 5;

  const handleScroll = () => {
    if (!viewportRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = viewportRef.current;
    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll <= 0) return;
    const progress = scrollLeft / maxScroll;
    const activeIdx = Math.min(
      totalDots - 1,
      Math.max(0, Math.round(progress * (totalDots - 1)))
    );
    setActiveDot(activeIdx);
  };

  const scrollPrev = () => {
    if (viewportRef.current) {
      viewportRef.current.scrollBy({ left: -260, behavior: 'smooth' });
    }
  };

  const scrollNext = () => {
    if (viewportRef.current) {
      viewportRef.current.scrollBy({ left: 260, behavior: 'smooth' });
    }
  };

  const scrollToDot = (idx) => {
    if (!viewportRef.current) return;
    const maxScroll = Math.max(1, viewportRef.current.scrollWidth - viewportRef.current.clientWidth);
    const targetScroll = (maxScroll / Math.max(1, totalDots - 1)) * idx;
    viewportRef.current.scrollTo({ left: targetScroll, behavior: 'smooth' });
    setActiveDot(idx);
  };

  return (
    <section id="clients" className="clients-section">
      <div className="clients-arc-left" aria-hidden="true"></div>
      <div className="clients-arc-right" aria-hidden="true"></div>

      <div className="container clients-header">
        <div className="section-eyebrow center">
          <span className="eyebrow-short-red" aria-hidden="true"></span>
          <span>Our Clients</span>
        </div>
        <h2 className="section-title clients-title">
          Trusted by Leading Businesses <span className="text-red">Across the UAE</span>
        </h2>
        <p className="clients-subtitle">
          Proud to supply diesel and fuel solutions to a diverse range of reputable clients across key industries.
        </p>
      </div>

      <div className="clients-carousel-shell">
        <button
          type="button"
          className="client-arrow-btn client-arrow-prev"
          id="clients-prev-btn"
          aria-label="Previous client logos"
          onClick={scrollPrev}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" width="16" height="16" aria-hidden="true">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <div
          className="clients-viewport"
          id="clients-viewport"
          ref={viewportRef}
          onScroll={handleScroll}
        >
          <div className="clients-track">
            {/* 1. EMAAR */}
            <div className="client-card" aria-label="EMAAR">
              <svg viewBox="0 0 120 74" className="client-svg" role="img" aria-label="EMAAR">
                <path d="M44 40V22L48 19V40H44ZM51 40V14L56 10V40H51ZM59 40V8L64 4V40H59ZM67 40V14L72 18V40H67ZM75 40V22L79 25V40H75Z" fill="#0F2942" />
                <text x="60" y="61" textAnchor="middle" fill="#0F2942" fontSize="14" fontWeight="600" letterSpacing="0.16em" fontFamily="Plus Jakarta Sans, sans-serif">EMAAR</text>
              </svg>
            </div>

            {/* 2. ALEC */}
            <div className="client-card" aria-label="ALEC">
              <svg viewBox="0 0 140 74" className="client-svg" role="img" aria-label="ALEC">
                <path d="M18 48C23 31 33 20 44 17C38 26 34 36 33 48H27C28 38 31 30 35 24C29 29 24 37 22 48H18Z" fill="#0A2246" />
                <path d="M12 45C20 35 33 32 48 35C36 37 25 41 18 50L12 45Z" fill="#D51F26" />
                <text x="86" y="44" textAnchor="middle" fill="#0A2246" fontSize="22" fontWeight="800" fontStyle="italic" letterSpacing="0.03em" fontFamily="Plus Jakarta Sans, sans-serif">ALEC</text>
              </svg>
            </div>

            {/* 3. NAKHEEL */}
            <div className="client-card" aria-label="NAKHEEL">
              <svg viewBox="0 0 130 74" className="client-svg" role="img" aria-label="Nakheel">
                <text x="65" y="33" textAnchor="middle" fill="#0A2246" fontSize="20" fontWeight="800" fontFamily="Cairo, sans-serif">نخيل</text>
                <text x="65" y="55" textAnchor="middle" fill="#0A2246" fontSize="14.5" fontWeight="800" letterSpacing="0.06em" fontFamily="Plus Jakarta Sans, sans-serif">NAKHEEL</text>
              </svg>
            </div>

            {/* 4. DP WORLD */}
            <div className="client-card" aria-label="DP WORLD">
              <svg viewBox="0 0 136 74" className="client-svg" role="img" aria-label="DP World">
                <path d="M52 26C56 17 70 15 79 22C71 19 60 21 56 29C53 34 59 41 68 41C76 41 83 35 85 28C86 38 77 46 66 46C55 46 47 36 52 26Z" fill="#94A3B8" />
                <path d="M46 31C53 26 63 29 68 33C73 37 81 36 86 29C84 37 74 42 65 38C58 35 51 33 46 31Z" fill="#059669" />
                <path d="M58 20C64 17 73 19 77 25C71 23 64 23 58 26C55 24 56 21 58 20Z" fill="#D51F26" />
                <text x="68" y="61" textAnchor="middle" fill="#0A2246" fontSize="12.5" fontWeight="800" letterSpacing="0.06em" fontFamily="Plus Jakarta Sans, sans-serif">DP WORLD</text>
              </svg>
            </div>

            {/* 5. ADNOC */}
            <div className="client-card" aria-label="ADNOC">
              <svg viewBox="0 0 140 74" className="client-svg" role="img" aria-label="ADNOC">
                <rect x="74" y="14" width="38" height="44" rx="2" fill="#004494" />
                <path d="M84 48C86 38 92 31 103 28C97 25 91 25 87 28C91 22 99 19 107 22C105 26 105 32 108 37C102 36 96 39 95 48H84Z" fill="#ffffff" />
                <circle cx="96" cy="24" r="1.6" fill="#004494" />
                <text x="43" y="34" textAnchor="middle" fill="#004494" fontSize="15" fontWeight="800" fontFamily="Cairo, sans-serif">أدنوك</text>
                <text x="43" y="53" textAnchor="middle" fill="#004494" fontSize="11.5" fontWeight="800" letterSpacing="0.06em" fontFamily="Plus Jakarta Sans, sans-serif">ADNOC</text>
              </svg>
            </div>

            {/* 6. DUBAI MUNICIPALITY */}
            <div className="client-card" aria-label="Dubai Municipality">
              <svg viewBox="0 0 140 74" className="client-svg" role="img" aria-label="Dubai Municipality">
                <defs>
                  <linearGradient id="dmGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#F59E0B" />
                    <stop offset="100%" stopColor="#D51F26" />
                  </linearGradient>
                </defs>
                <path d="M58 14L75 14L86 25L71 39H56L70 25L58 14Z" fill="url(#dmGrad)" />
                <text x="70" y="53" textAnchor="middle" fill="#D51F26" fontSize="12.5" fontWeight="800" fontFamily="Cairo, sans-serif">بلدية دبي</text>
                <text x="70" y="65" textAnchor="middle" fill="#0A2246" fontSize="7.5" fontWeight="700" letterSpacing="0.04em" fontFamily="Plus Jakarta Sans, sans-serif">DUBAI MUNICIPALITY</text>
              </svg>
            </div>

            {/* 7. JAFZA (Jebel Ali Free Zone) */}
            <div className="client-card" aria-label="Jebel Ali Free Zone">
              <svg viewBox="0 0 144 74" className="client-svg" role="img" aria-label="Jebel Ali Free Zone">
                <path d="M62 12H82L94 23L79 37H61L75 23L62 12Z" fill="#FACC15" />
                <path d="M75 23L94 23L79 37H61L75 23Z" fill="#1E293B" opacity="0.88" />
                <text x="72" y="51" textAnchor="middle" fill="#1E293B" fontSize="10" fontWeight="700" fontFamily="Cairo, sans-serif">المنطقة الحرة بجبل علي</text>
                <text x="72" y="64" textAnchor="middle" fill="#475569" fontSize="8.5" fontWeight="600" fontFamily="Plus Jakarta Sans, sans-serif">Jebel Ali Free Zone</text>
              </svg>
            </div>

            {/* 8. DEWA */}
            <div className="client-card" aria-label="DEWA">
              <svg viewBox="0 0 130 74" className="client-svg" role="img" aria-label="DEWA">
                <path d="M36 28C46 18 62 18 72 28C78 34 88 34 94 28C85 40 69 40 60 30C53 23 44 23 36 28Z" fill="#059669" />
                <text x="65" y="55" textAnchor="middle" fill="#0A2246" fontSize="16" fontWeight="800" letterSpacing="0.1em" fontFamily="Plus Jakarta Sans, sans-serif">DEWA</text>
              </svg>
            </div>

            {/* 9. RTA */}
            <div className="client-card" aria-label="RTA Dubai">
              <svg viewBox="0 0 130 74" className="client-svg" role="img" aria-label="RTA Dubai">
                <path d="M24 38C40 20 82 18 106 32C84 26 48 28 32 42L24 38Z" fill="#D51F26" />
                <text x="65" y="56" textAnchor="middle" fill="#0A2246" fontSize="18" fontWeight="800" letterSpacing="0.14em" fontFamily="Plus Jakarta Sans, sans-serif">RTA</text>
              </svg>
            </div>

            {/* 10. ENOC */}
            <div className="client-card" aria-label="ENOC">
              <svg viewBox="0 0 130 74" className="client-svg" role="img" aria-label="ENOC">
                <circle cx="65" cy="28" r="11" fill="#D51F26" />
                <path d="M40 34C54 27 76 27 90 34" stroke="#0A2246" strokeWidth="3" fill="none" strokeLinecap="round" />
                <text x="65" y="57" textAnchor="middle" fill="#0A2246" fontSize="15.5" fontWeight="800" letterSpacing="0.12em" fontFamily="Plus Jakarta Sans, sans-serif">ENOC</text>
              </svg>
            </div>
          </div>
        </div>

        <button
          type="button"
          className="client-arrow-btn client-arrow-next"
          id="clients-next-btn"
          aria-label="Next client logos"
          onClick={scrollNext}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" width="16" height="16" aria-hidden="true">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      {/* Centered Pagination Bars */}
      <div className="clients-dots" id="clients-dots" role="tablist" aria-label="Client slides">
        {Array.from({ length: totalDots }).map((_, idx) => (
          <button
            key={idx}
            type="button"
            className={`svc-dot ${activeDot === idx ? 'is-active' : ''}`}
            aria-label={`Clients page ${idx + 1}`}
            onClick={() => scrollToDot(idx)}
          ></button>
        ))}
      </div>

      {/* Centered Dubai Skyline Silhouette Watermark */}
      <svg viewBox="0 0 640 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="clients-skyline-watermark" aria-hidden="true">
        <path d="M0 160V132H18V114H34V132H48V104H66V132H82V94H98V132H114V112H132V132H148V88H166V132H182V106H200V132H218V82H236V132H254V110H270V132H286V76L294 64L302 76V132H312V68L318 42L321 6L324 42L330 68V132H344V96H362V132H378V84H396V132H414V104H432V132H448V90H466V132H482V112H500V132H518V96H536V132H554V108H572V132H590V102H608V132H624V116H640V160H0Z" fill="#0A2246" />
      </svg>

      {/* Bottom Symmetrical Red & Navy Flowing Wave */}
      <svg viewBox="0 0 1440 56" preserveAspectRatio="none" className="clients-bottom-wave" aria-hidden="true">
        <path d="M0 4 C220 26 420 50 720 50 C1020 50 1220 26 1440 4 L1440 56 L0 56 Z" fill="#D51F26" />
        <path d="M0 22 C230 40 430 53 720 53 C1010 53 1210 40 1440 22 L1440 56 L0 56 Z" fill="#092248" />
      </svg>
    </section>
  );
}
