(() => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#site-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') !== 'true';
      toggle.setAttribute('aria-expanded', String(open));
      nav.classList.toggle('is-open', open);
      const label = toggle.querySelector('span');
      if (label) label.textContent = open ? '−' : '＋';
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      toggle.setAttribute('aria-expanded', 'false');
      nav.classList.remove('is-open');
      const label = toggle.querySelector('span');
      if (label) label.textContent = '＋';
    }));
  }

  const year = document.querySelector('#year');
  if (year) year.textContent = new Date().getFullYear();

  // Reveal sections only as they enter the viewport; no continuous scroll handler.
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduceMotion && 'IntersectionObserver' in window) {
    const revealTargets = document.querySelectorAll(
      '.section-head, .work-card, .manifesto h2, .service-item, .package-card, .process-grid article, .contact-bottom'
    );
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });

    revealTargets.forEach((el, index) => {
      el.classList.add('motion-reveal');
      el.style.transitionDelay = `${Math.min(index % 4, 3) * 65}ms`;
      observer.observe(el);
    });
  }

  // Subtle cursor-driven depth on the hero sculpture (desktop pointers only).
  const hero = document.querySelector('.hero-visual');
  if (hero && !reduceMotion && window.matchMedia('(hover:hover) and (pointer:fine)').matches) {
    let frame = 0;
    hero.addEventListener('pointermove', event => {
      const rect = hero.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        hero.style.setProperty('--pointer-x', `${x * 10}px`);
        hero.style.setProperty('--pointer-y', `${y * 8}px`);
        hero.style.setProperty('--pointer-rotate', `${x * 9}deg`);
        hero.classList.add('pointer-active');
      });
    });
    hero.addEventListener('pointerleave', () => {
      hero.classList.remove('pointer-active');
      hero.style.removeProperty('--pointer-x');
      hero.style.removeProperty('--pointer-y');
      hero.style.removeProperty('--pointer-rotate');
    });
  }
})();
