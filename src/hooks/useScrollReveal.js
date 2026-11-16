import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * useScrollReveal
 * Orchestrates entrance animations across all sections and pages of Dubai Diesel.
 * Uses native IntersectionObserver with fallback for 60fps hardware-accelerated transitions.
 */
export function useScrollReveal() {
  const location = useLocation();

  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) return;

    document.documentElement.classList.add('has-reveal');

    // Comprehensive list of section & card selectors across ALL pages
    const revealGroups = [
      // --- 1. HOME PAGE ---
      { selector: '#about .about-visual', direction: 'left', stagger: 0 },
      {
        selector: '#about .about-content > .section-eyebrow, #about .about-title, #about .about-lead, #about .about-actions',
        direction: 'up',
        stagger: 75,
      },
      { selector: '#about .pillar-item', direction: 'up', stagger: 70, baseDelay: 120 },
      { selector: '#services .services-header-row', direction: 'up', stagger: 0 },
      { selector: '#services .svc-card', direction: 'up', stagger: 75, baseDelay: 60 },
      { selector: '#services .services-dots', direction: 'up', stagger: 0, baseDelay: 200 },
      { selector: '#why-choose-us .why-media-panel', direction: 'left', stagger: 0 },
      {
        selector: '#why-choose-us .why-content > .section-eyebrow, #why-choose-us .why-title, #why-choose-us .why-subtitle',
        direction: 'up',
        stagger: 70,
      },
      { selector: '#why-choose-us .why-card', direction: 'up', stagger: 65, baseDelay: 90 },
      { selector: '#get-in-touch .git-cta-block', direction: 'left', stagger: 0 },
      { selector: '#get-in-touch .git-highlight-item', direction: 'right', stagger: 80, baseDelay: 80 },
      { selector: '#get-in-touch .git-media-panel', direction: 'scale', stagger: 0, baseDelay: 60 },
      { selector: '#sectors .industries-intro', direction: 'left', stagger: 0 },
      { selector: '#sectors .ind-card', direction: 'up', stagger: 70, baseDelay: 70 },
      { selector: '#clients .clients-header', direction: 'up', stagger: 0 },
      { selector: '#clients .clients-carousel-shell', direction: 'scale', stagger: 0, baseDelay: 90 },
      { selector: '#clients .clients-dots', direction: 'up', stagger: 0, baseDelay: 150 },

      // --- 2. ABOUT US PAGE ---
      { selector: '.abp-trust-card', direction: 'scale', stagger: 0 },
      { selector: '#our-company .abp-bento', direction: 'left', stagger: 0 },
      { selector: '#our-company .abp-company-copy', direction: 'up', stagger: 0, baseDelay: 70 },
      { selector: '.abp-stats-bar', direction: 'scale', stagger: 0 },
      { selector: '.abp-stat-item', direction: 'up', stagger: 65, baseDelay: 70 },
      { selector: '#why-choose .abp-why-header', direction: 'up', stagger: 0 },
      { selector: '#why-choose .abp-why-card', direction: 'up', stagger: 75, baseDelay: 70 },
      { selector: '#certifications .abp-certs-card', direction: 'up', stagger: 0 },
      { selector: '.abp-cert-item', direction: 'up', stagger: 65, baseDelay: 80 },

      // --- 3. OUR SERVICES PAGE ---
      { selector: '.srv-trust-wrap .srv-trust-card', direction: 'scale', stagger: 0 },
      { selector: '.srv-catalog-header', direction: 'up', stagger: 0 },
      { selector: '.srv-grid .srv-card', direction: 'up', stagger: 75, baseDelay: 60 },
      { selector: '.srv-why-grid .srv-why-photo-wrap', direction: 'left', stagger: 0 },
      { selector: '.srv-why-grid .srv-why-center', direction: 'up', stagger: 0, baseDelay: 70 },
      { selector: '.srv-why-features .srv-feature-row', direction: 'right', stagger: 65, baseDelay: 90 },

      // --- 4. SERVICE DETAIL & INDUSTRY DETAIL PAGES ---
      { selector: '.dtl-overview-media-col', direction: 'left', stagger: 0 },
      { selector: '.dtl-overview-content-col', direction: 'right', stagger: 0, baseDelay: 80 },
      { selector: '.dtl-why-row', direction: 'up', stagger: 0 },
      { selector: '.dtl-pillars-pill-box .dtl-pillar-item', direction: 'up', stagger: 60, baseDelay: 80 },
      { selector: '.dtl-benefits-media-col', direction: 'left', stagger: 0 },
      { selector: '.dtl-benefits-list-col', direction: 'right', stagger: 0, baseDelay: 70 },
      { selector: '.dtl-checklist .dtl-checklist-item', direction: 'up', stagger: 45, baseDelay: 90 },
      { selector: '.dtl-applications-section .dtl-section-header', direction: 'up', stagger: 0 },
      { selector: '.dtl-apps-grid .dtl-app-card', direction: 'up', stagger: 70, baseDelay: 60 },
      { selector: '.dtl-related-section .dtl-section-header', direction: 'up', stagger: 0 },
      { selector: '.dtl-related-grid .dtl-related-card', direction: 'up', stagger: 75, baseDelay: 60 },

      // --- 5. INDUSTRIES PAGE ---
      { selector: '.ind-trust-wrap .ind-trust-card', direction: 'scale', stagger: 0 },
      { selector: '.ind-catalog-header', direction: 'up', stagger: 0 },
      { selector: '.ind-grid .ind-card', direction: 'up', stagger: 75, baseDelay: 60 },
      { selector: '.ind-why-section .srv-why-photo-wrap', direction: 'left', stagger: 0 },
      { selector: '.ind-why-section .srv-why-center', direction: 'up', stagger: 0, baseDelay: 70 },
      { selector: '.ind-why-section .srv-feature-row', direction: 'right', stagger: 65, baseDelay: 90 },

      // --- 6. OUR PROJECTS PAGE ---
      { selector: '.proj-trust-wrap .proj-trust-card', direction: 'scale', stagger: 0 },
      { selector: '.proj-gallery-section .proj-filter-bar', direction: 'up', stagger: 0 },
      { selector: '.proj-grid .proj-card', direction: 'up', stagger: 75, baseDelay: 60 },

      // --- 7. GALLERY PAGE ---
      { selector: '.gallery-filter-bar', direction: 'up', stagger: 0 },
      { selector: '.gallery-grid .gallery-card', direction: 'scale', stagger: 70, baseDelay: 60 },

      // --- 8. CONTACT PAGE ---
      { selector: '.contact-cards-section .contact-card', direction: 'up', stagger: 75, baseDelay: 60 },
      { selector: '.contact-form-wrap, .contact-form-card', direction: 'left', stagger: 0, baseDelay: 80 },
      { selector: '.contact-map-wrap, .contact-map-card', direction: 'right', stagger: 0, baseDelay: 100 },

      // --- 9. BLOG PAGES ---
      { selector: '.blog-featured-card', direction: 'scale', stagger: 0 },
      { selector: '.blog-grid .blog-card', direction: 'up', stagger: 70, baseDelay: 60 },
      { selector: '.blog-detail-article', direction: 'up', stagger: 0 },
      { selector: '.blog-sidebar-card', direction: 'right', stagger: 75, baseDelay: 80 },

      // --- 10. UNIVERSAL PARTNER CTA SECTION (ALL PAGES) ---
      { selector: '.dd-cta-section .dd-cta-card', direction: 'scale', stagger: 0, baseDelay: 40 },
      { selector: '.dd-cta-text-block', direction: 'up', stagger: 0, baseDelay: 80 },
      { selector: '.dd-cta-btn', direction: 'up', stagger: 0, baseDelay: 120 },

      // --- 11. FOOTER (ALL PAGES) ---
      { selector: '#contact .footer-col-brand, #contact .footer-col', direction: 'up', stagger: 80 },
      { selector: '#contact .footer-bottom-inner', direction: 'up', stagger: 0, baseDelay: 200 },
      { selector: '.footer-tank-graphic', direction: 'right', stagger: 0, baseDelay: 160 },

      // --- 12. GENERIC HELPER CLASSES ---
      { selector: '.reveal-on-scroll', direction: 'up', stagger: 60 },
      { selector: '.reveal-up', direction: 'up', stagger: 60 },
      { selector: '.reveal-left', direction: 'left', stagger: 60 },
      { selector: '.reveal-right', direction: 'right', stagger: 60 },
      { selector: '.reveal-scale', direction: 'scale', stagger: 60 },
    ];

    let timer = null;
    let observer = null;

    const setupObserver = () => {
      const targets = [];
      const seen = new Set();

      revealGroups.forEach(({ selector, direction = 'up', stagger = 70, baseDelay = 0 }) => {
        try {
          const elements = document.querySelectorAll(selector);
          elements.forEach((el, index) => {
            if (seen.has(el)) return;
            seen.add(el);

            const delay = Math.min(baseDelay + index * stagger, 420);
            if (!el.hasAttribute('data-reveal')) {
              el.setAttribute('data-reveal', direction);
            }
            el.style.setProperty('--reveal-delay', `${delay}ms`);
            el.dataset.revealDelay = String(delay);
            targets.push(el);
          });
        } catch (e) {
          // Selector ignored if not supported
        }
      });

      const revealElement = (el) => {
        if (el.classList.contains('is-visible')) return;
        el.classList.add('is-visible');
        const delayMs = Number(el.dataset.revealDelay || 0);
        window.setTimeout(() => {
          el.classList.add('reveal-done');
        }, delayMs + 650);
      };

      if ('IntersectionObserver' in window) {
        observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting || entry.boundingClientRect.top <= window.innerHeight * 0.95) {
                revealElement(entry.target);
                observer.unobserve(entry.target);
              }
            });
          },
          { threshold: 0.05, rootMargin: '0px 0px -20px 0px' }
        );

        targets.forEach((el) => observer.observe(el));
      } else {
        targets.forEach(revealElement);
      }

      // Initial viewport check for elements already visible
      const checkViewport = () => {
        const thresholdY = window.innerHeight * 0.96;
        targets.forEach((el) => {
          if (el.classList.contains('is-visible')) return;
          const rect = el.getBoundingClientRect();
          if (rect.top <= thresholdY && rect.bottom >= 0) {
            revealElement(el);
          }
        });
      };

      checkViewport();
      window.addEventListener('scroll', checkViewport, { passive: true });
    };

    // Delay slightly to let React finish rendering components & CMS data
    timer = window.setTimeout(setupObserver, 60);

    return () => {
      if (timer) window.clearTimeout(timer);
      if (observer) observer.disconnect();
    };
  }, [location.pathname]);
}
